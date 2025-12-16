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

            if (isset($data['brokers'])) {
                $this->syncBrokers($property, $data['brokers']);
            }
            $images = $data['images'] ?? [];

            if (empty($images) && isset($data['thumbnailUrl'])) {
                $images[] = [
                    'url' => $data['thumbnailUrl'],
                    'isThumbnail' => true,
                ];
            }

            if (!empty($images)) {
                $this->syncImages($property, $images);
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
                'number_of_images' => $data['numberOfImages'] ?? $data['numberOfGalleryItems'] ?? 0,
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
        $lotSizeRaw = $detailAttributes['Lot Size (acres)'] ?? ($data['lotSizeAcres'] ?? null);

        $zoning = $detailAttributes['Zoning'] ?? ($data['zoning'] ?? null);
        $subtypes = $detailsData['subtypes'] ?? ($data['subtypes'] ?? []);

        $property->details()->updateOrCreate(
            ['property_id' => $property->id],
            [
                'zoning' => $zoning,
                'lot_size_acres' => $this->normalizeDecimalValue($lotSizeRaw),
                'price_per_acre' => $detailsData['pricePerAcre'] ?? null,
                'investment_highlights' => $detailsData['investmentHighlights'] ?? null,
                'summary_details' => $detailAttributes ?: [],
                'subtypes' => $subtypes,
            ]
        );
    }

    protected function syncBrokers(Property $property, array $brokersData): void
    {
        $brokerIds = [];

        foreach ($brokersData as $brokerData) {
            // Ensure brokerage exists
            $brokerage = null;
            if (isset($brokerData['brokerage'])) {
                $brokerage = Brokerage::firstOrCreate(
                    ['name' => $brokerData['brokerage']['name']],
                    [
                        'logo_url' => $brokerData['brokerage']['logoUrl'] ?? null,
                        'website' => $brokerData['brokerage']['website'] ?? null,
                        // Add other fields if available
                    ]
                );
            }

            // Create or update broker
            $broker = Broker::updateOrCreate(
                ['external_id' => $brokerData['id']], // Assuming 'id' is the external ID
                [
                    'brokerage_id' => $brokerage ? $brokerage->id : null,
                    'global_id' => $brokerData['globalId'] ?? $brokerData['id'], // Fallback if globalId missing
                    'first_name' => $brokerData['firstName'],
                    'last_name' => $brokerData['lastName'],
                    'phone' => $brokerData['phone'] ?? null,
                    'email' => $brokerData['email'],
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
}
