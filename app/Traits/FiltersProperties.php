<?php

namespace App\Traits;

use Illuminate\Database\Eloquent\Builder;
use Illuminate\Http\Request;

trait FiltersProperties
{
    /**
     * Check if request has any filter parameters
     */
    protected function hasFilterParameters(Request $request): bool
    {
        $filterParams = [
            'location', 'keywords', 'property_types', 
            'min_rate', 'max_rate', 'min_yearly_rate', 'max_yearly_rate',
            'min_monthly_rate', 'max_monthly_rate', 'min_price', 'max_price',
            'min_sqft', 'max_sqft', 'min_acres', 'max_acres',
            'broker_agent', 'brokerage_shop', 'tenancy',
            'property_class', 'timeline_type', 'from_date', 'to_date', 'time_period'
        ];

        foreach ($filterParams as $param) {
            if ($request->has($param) && $request->input($param)) {
                return true;
            }
        }

        return false;
    }

    /**
     * Apply filters to the property query
     */
    protected function applyFilters(Builder $query, Request $request): Builder
    {
        $query = $this->applyLocationFilter($query, $request);
        $query = $this->applyKeywordsFilter($query, $request);
        $query = $this->applyPropertyTypesFilter($query, $request);
        $query = $this->applyPriceFilter($query, $request);
        $query = $this->applyBrokerAgentFilter($query, $request);
        $query = $this->applyBrokerageShopFilter($query, $request);
        $query = $this->applySizeFilter($query, $request);
        $query = $this->applyPropertyClassFilter($query, $request);
        $query = $this->applyTimelineFilter($query, $request);
        $query = $this->applyTenancyFilter($query, $request);

        return $query;
    }

    /**
     * Apply location filter (supports multiple locations)
     */
    protected function applyLocationFilter(Builder $query, Request $request): Builder
    {
        if (!$request->has('location') || !$request->input('location')) {
            return $query;
        }

        $locations = is_array($request->input('location'))
            ? $request->input('location')
            : explode(',', $request->input('location'));

        $locations = array_filter(array_map('trim', $locations), function ($loc) {
            return !empty($loc);
        });

        if (empty($locations)) {
            return $query;
        }

        return $query->whereHas('location', function ($locQuery) use ($locations) {
            $locQuery->where(function ($subQuery) use ($locations) {
                foreach ($locations as $location) {
                    $subQuery->orWhere(function ($locSubQuery) use ($location) {
                        $locSubQuery->where('city', 'like', "%{$location}%")
                            ->orWhere('state_name', 'like', "%{$location}%")
                            ->orWhere('state_code', 'like', "%{$location}%")
                            ->orWhere('zip', 'like', "%{$location}%")
                            ->orWhere('full_address', 'like', "%{$location}%")
                            ->orWhere('county', 'like', "%{$location}%");
                    });
                }
            });
        });
    }

    /**
     * Apply keywords filter
     */
    protected function applyKeywordsFilter(Builder $query, Request $request): Builder
    {
        if (!$request->has('keywords') || !$request->input('keywords')) {
            return $query;
        }

        $keywords = trim($request->input('keywords'));
        if (!$keywords) {
            return $query;
        }

        return $query->where(function ($q) use ($keywords) {
            $q->where('name', 'like', "%{$keywords}%")
                ->orWhere('description', 'like', "%{$keywords}%")
                ->orWhere('marketing_description', 'like', "%{$keywords}%")
                ->orWhereHas('details', function ($detailQuery) use ($keywords) {
                    $detailQuery->where('investment_highlights', 'like', "%{$keywords}%");
                });
        });
    }

    /**
     * Apply property types filter
     */
    protected function applyPropertyTypesFilter(Builder $query, Request $request): Builder
    {
        if (!$request->has('property_types') || !$request->input('property_types')) {
            return $query;
        }

        $propertyTypes = is_array($request->input('property_types'))
            ? $request->input('property_types')
            : explode(',', $request->input('property_types'));

        $propertyTypes = array_filter($propertyTypes, function ($type) {
            return trim($type) !== 'All' && trim($type) !== '';
        });

        if (empty($propertyTypes)) {
            return $query;
        }

        return $query->where(function ($q) use ($propertyTypes) {
            foreach ($propertyTypes as $type) {
                $type = trim($type);
                
                // Check if it's a subtype (format: "Type - Subtype")
                if (strpos($type, ' - ') !== false) {
                    [$mainType, $subtype] = explode(' - ', $type, 2);
                    $mainType = trim($mainType);
                    $subtype = trim($subtype);
                    
                    $q->orWhere(function ($subQuery) use ($mainType, $subtype) {
                        $subQuery->whereJsonContains('types', $mainType)
                            ->where(function ($typeQuery) use ($subtype) {
                                $typeQuery->whereJsonContains('subtypes', $subtype)
                                    ->orWhereHas('details', function ($detailQuery) use ($subtype) {
                                        $detailQuery->whereJsonContains('subtypes', $subtype);
                                    });
                            });
                    });
                } else {
                    $q->orWhereJsonContains('types', $type);
                }
            }
        });
    }

    /**
     * Apply price/rate filter (handles multiple formats)
     */
    protected function applyPriceFilter(Builder $query, Request $request): Builder
    {
        // Check for min price
        $minPriceValue = null;
        foreach (['min_rate', 'min_yearly_rate', 'min_monthly_rate', 'min_price'] as $key) {
            if ($request->has($key) && $request->input($key)) {
                $minPriceValue = $request->input($key);
                break;
            }
        }

        if ($minPriceValue) {
            $minPrice = preg_replace('/[^0-9.]/', '', $minPriceValue);
            if (is_numeric($minPrice) && $minPrice > 0) {
                $query->where('asking_price', '>=', $minPrice);
            }
        }

        // Check for max price
        $maxPriceValue = null;
        foreach (['max_rate', 'max_yearly_rate', 'max_monthly_rate', 'max_price'] as $key) {
            if ($request->has($key) && $request->input($key)) {
                $maxPriceValue = $request->input($key);
                break;
            }
        }

        if ($maxPriceValue && !str_ends_with($maxPriceValue, '+')) {
            $maxPrice = preg_replace('/[^0-9.]/', '', $maxPriceValue);
            if (is_numeric($maxPrice) && $maxPrice > 0) {
                $query->where('asking_price', '<=', $maxPrice);
            }
        }

        return $query;
    }

    /**
     * Apply broker agent filter
     */
    protected function applyBrokerAgentFilter(Builder $query, Request $request): Builder
    {
        if (!$request->has('broker_agent') || !$request->input('broker_agent')) {
            return $query;
        }

        $brokerName = trim($request->input('broker_agent'));
        if (!$brokerName) {
            return $query;
        }

        return $query->whereHas('brokers', function ($q) use ($brokerName) {
            $q->where(function ($subQuery) use ($brokerName) {
                $searchTerm = "%{$brokerName}%";
                $subQuery->where('first_name', 'like', $searchTerm)
                    ->orWhere('last_name', 'like', $searchTerm)
                    ->orWhereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", [$searchTerm]);
            });
        });
    }

    /**
     * Apply brokerage shop filter
     */
    protected function applyBrokerageShopFilter(Builder $query, Request $request): Builder
    {
        if (!$request->has('brokerage_shop') || !$request->input('brokerage_shop')) {
            return $query;
        }

        $brokerageName = trim($request->input('brokerage_shop'));
        if (!$brokerageName) {
            return $query;
        }

        return $query->whereHas('brokers', function ($q) use ($brokerageName) {
            $q->whereHas('brokerage', function ($brokerageQuery) use ($brokerageName) {
                $brokerageQuery->where('name', 'like', "%{$brokerageName}%");
            });
        });
    }

    /**
     * Apply size filter (Square Feet and Acreage)
     */
    protected function applySizeFilter(Builder $query, Request $request): Builder
    {
        // Square Feet filter
        if ($request->has('min_sqft') || $request->has('max_sqft')) {
            $minSqft = $request->input('min_sqft');
            $maxSqft = $request->input('max_sqft');

            if (($minSqft && is_numeric($minSqft)) || ($maxSqft && !str_ends_with($maxSqft, '+') && is_numeric($maxSqft))) {
                $query->whereHas('details', function ($q) use ($minSqft, $maxSqft) {
                    if ($minSqft && is_numeric($minSqft)) {
                        $q->where(function ($sizeQuery) use ($minSqft) {
                            $sizeQuery->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Feet') AS UNSIGNED) >= ?", [$minSqft])
                                ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Sqft') AS UNSIGNED) >= ?", [$minSqft])
                                ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Footage') AS UNSIGNED) >= ?", [$minSqft])
                                ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.SF') AS UNSIGNED) >= ?", [$minSqft]);
                        });
                    }
                    if ($maxSqft && !str_ends_with($maxSqft, '+') && is_numeric($maxSqft)) {
                        $q->where(function ($sizeQuery) use ($maxSqft) {
                            $sizeQuery->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Feet') AS UNSIGNED) <= ?", [$maxSqft])
                                ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Sqft') AS UNSIGNED) <= ?", [$maxSqft])
                                ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Footage') AS UNSIGNED) <= ?", [$maxSqft])
                                ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.SF') AS UNSIGNED) <= ?", [$maxSqft]);
                        });
                    }
                });
            }
        }

        // Acreage filter
        if ($request->has('min_acres') || $request->has('max_acres')) {
            $minAcres = $request->input('min_acres');
            $maxAcres = $request->input('max_acres');

            if ($minAcres && is_numeric($minAcres)) {
                $query->whereHas('details', function ($q) use ($minAcres) {
                    $q->where('lot_size_acres', '>=', $minAcres);
                });
            }
            if ($maxAcres && !str_ends_with($maxAcres, '+') && is_numeric($maxAcres)) {
                $query->whereHas('details', function ($q) use ($maxAcres) {
                    $q->where('lot_size_acres', '<=', $maxAcres);
                });
            }
        }

        return $query;
    }

    /**
     * Apply property class filter
     */
    protected function applyPropertyClassFilter(Builder $query, Request $request): Builder
    {
        if (!$request->has('property_class') || !$request->input('property_class')) {
            return $query;
        }

        $propertyClasses = is_array($request->input('property_class'))
            ? $request->input('property_class')
            : explode(',', $request->input('property_class'));

        if (empty($propertyClasses)) {
            return $query;
        }

        return $query->whereHas('details', function ($q) use ($propertyClasses) {
            $q->where(function ($subQuery) use ($propertyClasses) {
                foreach ($propertyClasses as $class) {
                    $class = trim($class);
                    $searchTerm = "%{$class}%";
                    $subQuery->orWhere(function ($classQuery) use ($searchTerm) {
                        $classQuery->whereRaw("JSON_EXTRACT(summary_details, '$.Class') LIKE ?", [$searchTerm])
                            ->orWhereRaw("JSON_EXTRACT(summary_details, '$.Property Class') LIKE ?", [$searchTerm])
                            ->orWhereRaw("JSON_EXTRACT(summary_details, '$.PropertyClass') LIKE ?", [$searchTerm]);
                    });
                }
            });
        });
    }

    /**
     * Apply timeline filter
     */
    protected function applyTimelineFilter(Builder $query, Request $request): Builder
    {
        if (!$request->has('timeline_type')) {
            return $query;
        }

        $timelineType = $request->input('timeline_type');

        if ($timelineType === 'custom') {
            $fromDate = $request->input('from_date');
            $toDate = $request->input('to_date');

            if ($fromDate) {
                $query->where('created_at', '>=', $fromDate);
            }
            if ($toDate) {
                $query->where('created_at', '<=', $toDate . ' 23:59:59');
            }
        } elseif ($timelineType === 'timePeriod' && $request->has('time_period')) {
            $timePeriod = $request->input('time_period');
            $now = now();

            switch ($timePeriod) {
                case 'Last 7 days':
                    $query->where('created_at', '>=', $now->copy()->subDays(7));
                    break;
                case 'Last 30 days':
                    $query->where('created_at', '>=', $now->copy()->subDays(30));
                    break;
                case 'Last 90 days':
                    $query->where('created_at', '>=', $now->copy()->subDays(90));
                    break;
                case 'Last 6 months':
                    $query->where('created_at', '>=', $now->copy()->subMonths(6));
                    break;
                case 'Last year':
                    $query->where('created_at', '>=', $now->copy()->subYear());
                    break;
            }
        }

        return $query;
    }

    /**
     * Apply tenancy filter
     */
    protected function applyTenancyFilter(Builder $query, Request $request): Builder
    {
        if (!$request->has('tenancy') || !$request->input('tenancy')) {
            return $query;
        }

        $tenancy = trim($request->input('tenancy'));
        if (!$tenancy) {
            return $query;
        }

        return $query->whereHas('details', function ($q) use ($tenancy) {
            $searchTerm = "%{$tenancy}%";
            $q->where(function ($subQuery) use ($searchTerm) {
                $subQuery->whereRaw("JSON_EXTRACT(summary_details, '$.Tenancy') LIKE ?", [$searchTerm])
                    ->orWhereRaw("JSON_EXTRACT(summary_details, '$.Tenant Count') LIKE ?", [$searchTerm])
                    ->orWhereRaw("JSON_EXTRACT(summary_details, '$.Occupancy Status') LIKE ?", [$searchTerm]);
            });
        });
    }

    /**
     * Generate listing title based on filters and URL parameters
     */
    protected function generateListingTitle($type, $category, $listingType, $status, $section, $propertyTypes = null): string
    {
        // Handle property type filters (e.g., Dispensary)
        if ($propertyTypes && is_array($propertyTypes) && count($propertyTypes) > 0) {
            $primaryType = $propertyTypes[0];
            $typeLabel = ucfirst($primaryType);

            if ($type === 'for-lease') {
                return $typeLabel . ' For Lease';
            } elseif ($type === 'for-sale') {
                return $typeLabel . ' For Sale';
            } elseif ($status === 'auctions') {
                return $typeLabel . ' Auctions For Sale';
            } elseif ($listingType === 'off-market') {
                return 'Off-Market ' . $typeLabel;
            } else {
                return $typeLabel . ' Properties';
            }
        }

        // Handle "all-commercial" and "all-residential"
        if ($category === 'all-commercial') {
            if ($status === 'auctions') {
                return 'All Commercial Auctions For Sale';
            } elseif ($listingType === 'off-market') {
                return 'All Off-Market Commercial';
            }
            return 'All Commercial For Sale';
        } elseif ($category === 'all-residential') {
            if ($status === 'auctions') {
                return 'All Residential Auctions For Sale';
            } elseif ($listingType === 'off-market') {
                return 'All Off-Market Residential';
            }
            return 'All Residential For Sale';
        }

        // Handle status (auctions)
        if ($status === 'auctions') {
            if ($category === 'commercial') {
                return 'Commercial Auctions for Sale';
            } elseif ($category === 'residential') {
                return 'Residential Auctions For Sale';
            } else {
                return 'Auctions For Sale';
            }
        }

        // Handle listing type (off-market)
        if ($listingType === 'off-market') {
            if ($category === 'commercial') {
                return 'Off-Market Commercial';
            } elseif ($category === 'residential') {
                return 'Off-Market Residential';
            } else {
                return 'Off-Market Properties';
            }
        }

        // Handle type (for-sale vs for-lease)
        if ($type === 'for-sale') {
            if ($category === 'commercial') {
                return 'Commercial For Sale';
            } elseif ($category === 'residential') {
                return 'Residential For Sale';
            } else {
                return 'Properties For Sale';
            }
        } elseif ($type === 'for-lease') {
            if ($category === 'commercial') {
                return 'Commercial Lease';
            } elseif ($category === 'residential') {
                return 'Residential Lease';
            } else {
                return 'All For Lease';
            }
        }

        // Handle category only
        if ($category === 'commercial') {
            return 'All Commercial For Sale';
        } elseif ($category === 'residential') {
            return 'All Residential For Sale';
        }

        // Handle section (backward compatibility)
        if ($section === 'residential' || $section === 'residentials') {
            return 'Residential Properties';
        } elseif ($section === 'commercial') {
            return 'Commercial Properties';
        } elseif ($section === 'auctions') {
            return 'Auctions';
        } elseif ($section === 'rental') {
            return 'Rental Properties';
        }

        return 'All Properties';
    }
}

