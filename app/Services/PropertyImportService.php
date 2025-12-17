<?php

namespace App\Services;

use App\Models\Broker;
use App\Models\Brokerage;
use App\Models\Property;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Str;

class PropertyImportService
{
    public function importFromJson(array $data): Property
    {
        return DB::transaction(function () use ($data) {
            $property = $this->updateOrCreateProperty($data);

            if (isset($data['locations']) && !empty($data['locations'])) {
                $this->syncLocation($property, $data['locations'][0]);
            }

            if (!empty($data)) {
                $this->syncDetails($property, $data);
            }

            // Handle brokers - support both old format (brokerageName at top level) and new format (brokers array)
            if (isset($data['brokers']) && !empty($data['brokers'])) {
                $this->syncBrokers($property, $data['brokers'], $data);
            } elseif (isset($data['brokerageName']) && !empty($data['brokerageName'])) {
                // Fallback: create a broker entry from top-level brokerageName if brokers array is missing
                $this->syncBrokersFromLegacyFormat($property, $data);
            }

            // Handle both 'images' and 'media' array formats
            $images = $data['images'] ?? [];

            // If 'media' array exists (new format), convert it to images format
            if (empty($images) && isset($data['media']) && is_array($data['media'])) {
                $images = $this->convertMediaToImages($data['media'], $data['thumbnailUrl'] ?? null);
            }

            // For old format: if we only have thumbnailUrl but no images array, 
            // only store the thumbnail (don't create placeholders)
            if (empty($images) && isset($data['thumbnailUrl'])) {
                $images[] = [
                    'url' => $data['thumbnailUrl'],
                    'isThumbnail' => true,
                ];
            }

            if (!empty($images)) {
                $this->syncImages($property, $images);
                // Update number_of_images to match actual stored images (not the reported count)
                // This prevents showing placeholders for images we don't have
                $property->number_of_images = count($images);
                $property->save();
            }

            return $property;
        });
    }

    protected function updateOrCreateProperty(array $data): Property
    {
        $name = $this->resolvePropertyName($data);
        $slug = $data['urlSlug'] ?? Str::slug($name);

        return Property::updateOrCreate(
            ['external_id' => $data['id']],
            [
                'name' => $name,
                'description' => $data['description'] ?? null,
                'marketing_description' => $data['marketingDescription'] ?? ($data['details']['marketingDescription'] ?? null),
                'asking_price' => $data['askingPrice'] ?? 0,
                'status' => $data['status'] ?? 'Unknown',
                'types' => $data['types'] ?? [],
                'subtypes' => $data['subtypes'] ?? [],
                'url_slug' => $slug,
                'external_url' => $data['url'] ?? null,
                'thumbnail_url' => $data['thumbnailUrl'] ?? null,
                'number_of_images' => $this->countImages($data),
                'has_flyer' => $data['hasFlyer'] ?? false,
                'has_video' => $data['hasVideo'] ?? false,
                'has_virtual_tour' => $data['hasVirtualTour'] ?? false,
                'is_in_opportunity_zone' => $data['isInOpportunityZone'] ?? false,
                'activated_on' => $this->toCarbon($data['activatedOn'] ?? null),
                'external_updated_on' => $this->toCarbon($data['updatedOn'] ?? ($data['lastUpdated'] ?? null)),
            ]
        );
    }

    protected function syncLocation(Property $property, array $locationData): void
    {
        $state = $locationData['state'] ?? $locationData['stateVerified'] ?? [
            'code' => $locationData['stateCode'] ?? '',
            'name' => $locationData['stateName'] ?? '',
        ];

        $property->location()->updateOrCreate(
            ['property_id' => $property->id],
            [
                'address' => $locationData['address'] ?? ($locationData['fullAddress'] ?? 'Unknown Address'),
                'city' => $locationData['city'] ?? $locationData['cityVerified'] ?? 'Unknown City',
                'county' => $locationData['county'] ?? null,
                'state_code' => $state['code'] ?? '',
                'state_name' => $state['name'] ?? '',
                'zip' => $locationData['zip'] ?? $locationData['postalCode'] ?? '',
                'latitude' => $locationData['latitude'] ?? null,
                'longitude' => $locationData['longitude'] ?? null,
                'full_address' => $locationData['fullAddress'] ?? null,
            ]
        );
    }

    protected function syncDetails(Property $property, array $data): void
    {
        $detailsData = $data['details'] ?? [];
        $detailAttributes = $detailsData['details'] ?? [];

        // Handle summaryDetails array format (new dataset format)
        if (empty($detailAttributes) && isset($data['summaryDetails']) && is_array($data['summaryDetails'])) {
            $detailAttributes = $this->convertSummaryDetailsToDetails($data['summaryDetails']);
        }

        $lotSizeRaw = $detailAttributes['Lot Size (acres)'] ?? ($data['lotSizeAcres'] ?? null);

        $zoning = $detailAttributes['Zoning'] ?? ($detailAttributes['Permitted Zoning'] ?? ($data['zoning'] ?? null));
        $subtypes = $detailsData['subtypes'] ?? ($data['subtypes'] ?? []);

        // Handle investmentHighlights at top level (new dataset format)
        $investmentHighlights = $data['investmentHighlights']
            ?? ($detailsData['investmentHighlights'] ?? null);

        // Extract new fields from detailAttributes
        $netRentableSqft = $this->extractNumericValue($detailAttributes['Net Rentable (SqFt)'] ?? $detailAttributes['Net Rentable Area'] ?? null);
        $capRate = $this->extractPercentageValue($detailAttributes['Cap Rate'] ?? null);
        $proFormaNoi = $this->extractMoneyValue($detailAttributes['Pro-Forma NOI'] ?? $detailAttributes['NOI'] ?? null);
        $parkingSpaces = $this->extractNumericValue($detailAttributes['Parking (spaces)'] ?? $detailAttributes['Parking'] ?? null);
        $ceilingHeight = $detailAttributes['Ceiling Height'] ?? null;
        $ownership = $detailAttributes['Ownership'] ?? null;
        $saleCondition = $detailAttributes['Sale Condition'] ?? null;
        $investmentType = $detailAttributes['Investment Type'] ?? null;
        $investmentSubType = $detailAttributes['Investment Sub Type'] ?? null;
        $class = $detailAttributes['Class'] ?? null;
        $leaseType = $detailAttributes['Lease Type'] ?? null;
        $tenancy = $detailAttributes['Tenancy'] ?? null;
        $leaseExpiration = $this->extractDate($detailAttributes['Lease Expiration'] ?? null);
        $groundLease = $this->extractBoolean($detailAttributes['Ground Lease'] ?? null);
        $occupancyDate = $this->extractDate($detailAttributes['Occupancy Date'] ?? null);

        // Calculate price per unit if units and asking price are available
        $pricePerUnit = null;
        if ($property->asking_price > 0) {
            $units = $this->extractNumericValue($detailAttributes['Units'] ?? null);
            if ($units && $units > 0) {
                $pricePerUnit = $property->asking_price / $units;
            }
        }

        $property->details()->updateOrCreate(
            ['property_id' => $property->id],
            [
                'zoning' => $zoning,
                'lot_size_acres' => $this->normalizeDecimalValue($lotSizeRaw),
                'price_per_acre' => $detailsData['pricePerAcre'] ?? null,
                'investment_highlights' => $investmentHighlights,
                'summary_details' => $detailAttributes ?: [],
                'subtypes' => $subtypes,
                'investment_type' => $investmentType,
                'investment_sub_type' => $investmentSubType,
                'class' => $class,
                'lease_type' => $leaseType,
                'tenancy' => $tenancy,
                'lease_expiration' => $leaseExpiration,
                'ground_lease' => $groundLease,
                'net_rentable_sqft' => $netRentableSqft,
                'cap_rate' => $capRate,
                'pro_forma_noi' => $proFormaNoi,
                'price_per_unit' => $pricePerUnit,
                'occupancy_date' => $occupancyDate,
                'parking_spaces' => $parkingSpaces,
                'ceiling_height' => $ceilingHeight,
                'ownership' => $ownership,
                'sale_condition' => $saleCondition,
            ]
        );
    }

    protected function syncBrokers(Property $property, array $brokersData, array $propertyData = []): void
    {
        $brokerIds = [];

        foreach ($brokersData as $brokerData) {
            // Ensure brokerage exists
            $brokerage = null;
            if (isset($brokerData['brokerage']) && isset($brokerData['brokerage']['name'])) {
                $brokerageData = $brokerData['brokerage'];
                $location = $brokerageData['location'] ?? [];

                $brokerage = Brokerage::firstOrCreate(
                    ['name' => $brokerageData['name']],
                    [
                        'logo_url' => $brokerageData['logoUrl'] ?? null,
                        'website' => $brokerageData['website'] ?? null,
                        'address' => $location['address'] ?? null,
                        'city' => $location['city'] ?? null,
                        'state_code' => $location['state']['code'] ?? null,
                        'zip' => $location['zip'] ?? null,
                    ]
                );
            } elseif (isset($propertyData['brokerageName'])) {
                // Fallback to top-level brokerageName if brokerage object is missing
                $brokerage = Brokerage::firstOrCreate(
                    ['name' => $propertyData['brokerageName']],
                    [
                        'logo_url' => $propertyData['brokerTeamLogoUrl'] ?? null,
                        'website' => null,
                        'address' => null,
                        'city' => null,
                        'state_code' => null,
                        'zip' => null,
                    ]
                );
            }

            // Create or update broker
            $broker = Broker::updateOrCreate(
                ['external_id' => $brokerData['id']], // Assuming 'id' is the external ID
                [
                    'brokerage_id' => $brokerage ? $brokerage->id : null,
                    'global_id' => $brokerData['globalId'] ?? $brokerData['id'], // Fallback if globalId missing
                    'first_name' => $brokerData['firstName'] ?? '',
                    'last_name' => $brokerData['lastName'] ?? '',
                    'phone' => $brokerData['phone'] ?? null,
                    'email' => $brokerData['email'] ?? null,
                    'thumbnail_url' => $brokerData['thumbnailUrl'] ?? null,
                    'public_profile_id' => $brokerData['publicProfileId'] ?? null,
                    'licenses' => $brokerData['licenses'] ?? [],
                    'badges' => $brokerData['badges'] ?? [],
                    'number_of_assets' => $brokerData['numberOfAssets'] ?? 0,
                    'is_platinum' => $brokerData['isPlatinum'] ?? false,
                ]
            );

            $brokerIds[] = $broker->id;
        }

        $property->brokers()->sync($brokerIds);
    }

    /**
     * Handle legacy format where brokerageName is at top level but no brokers array
     */
    protected function syncBrokersFromLegacyFormat(Property $property, array $data): void
    {
        $brokerageName = $data['brokerageName'] ?? null;
        if (!$brokerageName) {
            return;
        }

        // Create or get brokerage
        $brokerage = Brokerage::firstOrCreate(
            ['name' => $brokerageName],
            [
                'logo_url' => $data['brokerTeamLogoUrl'] ?? null,
                'website' => null,
                'address' => null,
                'city' => null,
                'state_code' => null,
                'zip' => null,
            ]
        );

        // Try to find broker info from licenseDetails in brokers array if it exists
        $brokerInfo = null;
        if (isset($data['brokers']) && is_array($data['brokers']) && !empty($data['brokers'])) {
            // If brokers array exists, use the first broker's licenseDetails
            $firstBroker = $data['brokers'][0];
            if (isset($firstBroker['licenseDetails']) && is_array($firstBroker['licenseDetails'])) {
                foreach ($firstBroker['licenseDetails'] as $license) {
                    if (isset($license['brokerageName']) && $license['brokerageName'] === $brokerageName) {
                        $brokerInfo = $license;
                        break;
                    }
                }
            }
        }

        // Create a minimal broker entry
        // Use a placeholder ID based on property ID + brokerage ID
        $externalBrokerId = 'legacy_' . $property->external_id . '_' . $brokerage->id;

        $broker = Broker::updateOrCreate(
            ['external_id' => $externalBrokerId],
            [
                'brokerage_id' => $brokerage->id,
                'global_id' => $externalBrokerId,
                'first_name' => $brokerInfo['brokerFirstName'] ?? ($data['brokers'][0]['firstName'] ?? 'Unknown'),
                'last_name' => $brokerInfo['brokerLastName'] ?? ($data['brokers'][0]['lastName'] ?? 'Broker'),
                'phone' => $brokerInfo['brokerPhone'] ?? ($data['brokers'][0]['phone'] ?? null),
                'email' => $data['brokers'][0]['email'] ?? null,
                'thumbnail_url' => $data['brokers'][0]['thumbnailUrl'] ?? null,
                'public_profile_id' => $data['brokers'][0]['publicProfileId'] ?? null,
                'licenses' => isset($brokerInfo['number']) ? [$brokerInfo['number']] : ($data['brokers'][0]['licenses'] ?? []),
                'badges' => $data['brokers'][0]['badges'] ?? [],
                'number_of_assets' => $data['brokers'][0]['numberOfAssets'] ?? 0,
                'is_platinum' => $data['brokers'][0]['isPlatinum'] ?? false,
            ]
        );

        $property->brokers()->sync([$broker->id]);
    }

    protected function syncImages(Property $property, array $imagesData): void
    {
        // For simplicity, we might delete existing and recreate, or update.
        // Let's delete and recreate to ensure order and correctness.
        $property->images()->delete();

        foreach ($imagesData as $index => $imageData) {
            $property->images()->create([
                'url' => $imageData['url'],
                'position' => $index,
                'is_thumbnail' => $imageData['isThumbnail'] ?? false,
            ]);
        }
    }

    protected function resolvePropertyName(array $data): string
    {
        $candidate = $data['name']
            ?? ($data['details']['name'] ?? null)
            ?? ($data['description'] ?? null)
            ?? ($data['urlSlug'] ?? null);

        if (empty($candidate)) {
            $candidate = 'Property ' . ($data['id'] ?? Str::random(6));
        }

        return $candidate;
    }

    protected function normalizeDecimalValue($value): ?float
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (is_numeric($value)) {
            return (float) $value;
        }

        if (is_string($value)) {
            $normalized = trim($value);

            if (preg_match('/\d+\s*[-–]\s*\d+/', $normalized)) {
                return null; // ranges cannot be represented as a single decimal
            }

            $normalized = str_replace(',', '', $normalized);

            if (preg_match('/-?\d+(?:\.\d+)?/', $normalized, $matches)) {
                return (float) $matches[0];
            }
        }

        return null;
    }

    protected function toCarbon(?string $value): ?Carbon
    {
        return $value ? Carbon::parse($value) : null;
    }

    /**
     * Convert media array (with Image/Video types) to images format
     */
    protected function convertMediaToImages(array $media, ?string $thumbnailUrl = null): array
    {
        $images = [];
        $hasThumbnail = false;

        foreach ($media as $index => $mediaItem) {
            if (isset($mediaItem['type']) && $mediaItem['type'] === 'Image' && isset($mediaItem['imageUrl'])) {
                $isThumbnail = false;

                // Check if this is the thumbnail
                if (!$hasThumbnail && $thumbnailUrl && $mediaItem['imageUrl'] === $thumbnailUrl) {
                    $isThumbnail = true;
                    $hasThumbnail = true;
                } elseif (!$hasThumbnail && $index === 0) {
                    // First image is thumbnail if no explicit match
                    $isThumbnail = true;
                    $hasThumbnail = true;
                }

                $images[] = [
                    'url' => $mediaItem['imageUrl'],
                    'isThumbnail' => $isThumbnail,
                ];
            }
        }

        return $images;
    }

    /**
     * Convert summaryDetails array to details format
     */
    protected function convertSummaryDetailsToDetails(array $summaryDetails): array
    {
        $details = [];

        foreach ($summaryDetails as $item) {
            if (isset($item['key']) && isset($item['display'])) {
                $key = $item['key'];
                $display = $item['display'];

                // Map common keys to expected format
                $mappedKey = match ($key) {
                    'PermittedZoning' => 'Zoning',
                    'LotSize' => 'Lot Size (acres)',
                    default => $item['label'] ?? $key,
                };

                $details[$mappedKey] = $display;
            }
        }

        return $details;
    }

    /**
     * Count images from various data formats
     */
    protected function countImages(array $data): int
    {
        // Check explicit count fields first
        if (isset($data['numberOfImages'])) {
            return (int) $data['numberOfImages'];
        }

        if (isset($data['numberOfGalleryItems'])) {
            return (int) $data['numberOfGalleryItems'];
        }

        // Count from media array
        if (isset($data['media']) && is_array($data['media'])) {
            $imageCount = 0;
            foreach ($data['media'] as $mediaItem) {
                if (isset($mediaItem['type']) && $mediaItem['type'] === 'Image') {
                    $imageCount++;
                }
            }
            if ($imageCount > 0) {
                return $imageCount;
            }
        }

        // Count from images array
        if (isset($data['images']) && is_array($data['images'])) {
            return count($data['images']);
        }

        return 0;
    }

    /**
     * Extract numeric value from string (removes commas, currency symbols, etc.)
     */
    protected function extractNumericValue($value): ?float
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (is_numeric($value)) {
            return (float) $value;
        }

        if (is_string($value)) {
            // Remove commas and other formatting
            $cleaned = str_replace([',', '$', ' ', '%'], '', $value);
            if (is_numeric($cleaned)) {
                return (float) $cleaned;
            }
        }

        return null;
    }

    /**
     * Extract percentage value (e.g., "6.20%" -> 6.20)
     */
    protected function extractPercentageValue($value): ?float
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (is_numeric($value)) {
            return (float) $value;
        }

        if (is_string($value)) {
            $cleaned = str_replace(['%', ' ', ','], '', $value);
            if (is_numeric($cleaned)) {
                return (float) $cleaned;
            }
        }

        return null;
    }

    /**
     * Extract money value (e.g., "$3,100" -> 3100.00)
     */
    protected function extractMoneyValue($value): ?float
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (is_numeric($value)) {
            return (float) $value;
        }

        if (is_string($value)) {
            // Remove currency symbols, commas, spaces
            $cleaned = preg_replace('/[^0-9.]/', '', $value);
            if (is_numeric($cleaned)) {
                return (float) $cleaned;
            }
        }

        return null;
    }

    /**
     * Extract date from string
     */
    protected function extractDate($value): ?\Carbon\Carbon
    {
        if ($value === null || $value === '') {
            return null;
        }

        try {
            return $this->toCarbon($value);
        } catch (\Exception $e) {
            return null;
        }
    }

    /**
     * Extract boolean from string (Yes/No, true/false, etc.)
     */
    protected function extractBoolean($value): ?bool
    {
        if ($value === null || $value === '') {
            return null;
        }

        if (is_bool($value)) {
            return $value;
        }

        if (is_string($value)) {
            $lower = strtolower(trim($value));
            if (in_array($lower, ['yes', 'true', '1', 'y'])) {
                return true;
            }
            if (in_array($lower, ['no', 'false', '0', 'n'])) {
                return false;
            }
        }

        return null;
    }
}
