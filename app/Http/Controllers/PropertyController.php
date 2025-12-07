<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Services\PropertyImportService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{

    public function index(Request $request)
    {
        $section = $request->query('section');
        $filter = $request->query('filter', 'all');

        $query = Property::with(['location', 'images', 'brokers.brokerage', 'details']);

        // Apply section-based filtering
        if ($section === 'residential') {
            $query->where(function ($q) {
                $q->whereJsonContains('types', 'Multifamily')
                    ->orWhereJsonContains('types', 'living')
                    ->orWhereJsonContains('types', 'Residential');
            })->where('status', '!=', 'Sold');
        } elseif ($section === 'commercial') {
            $query->where(function ($q) {
                $q->whereJsonContains('types', 'Commercial')
                    ->orWhereJsonContains('types', 'Land')
                    ->orWhereJsonContains('types', 'Multifamily')
                    ->orWhereJsonContains('types', 'Office')
                    ->orWhereJsonContains('types', 'Retail')
                    ->orWhereJsonContains('types', 'Industrial');
            })
                ->whereJsonDoesntContain('types', 'Residential')
                ->where('status', '!=', 'Sold');
        }

        // Always exclude properties without thumbnails
        $query->whereNotNull('thumbnail_url');

        // Apply comprehensive filters
        $query = $this->applyFilters($query, $request);

        // Sorting
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');

        if (in_array($sort, ['asking_price', 'created_at', 'name'])) {
            $query->orderBy($sort, $direction);
        }

        $properties = $query->orderBy('created_at', 'desc')->get();

        // Apply client-side filter if needed
        if ($filter && $filter !== 'all') {
            $filteredProperties = $properties->filter(function ($property, $index) use ($filter) {
                if ($filter === 'option1') return $index % 3 === 0;
                if ($filter === 'option2') return $index % 3 === 1;
                if ($filter === 'option3') return $index % 3 === 2;
                return true;
            });
            $properties = $filteredProperties->values();
        }

        return Inertia::render('Properties', [
            'properties' => $properties,
            'filter' => $filter,
            'section' => $section,
            'filters' => $request->only([
                'location',
                'keywords',
                'property_types',
                'min_rate',
                'max_rate',
                'exclude_undisclosed_rate',
                'size_type',
                'min_size',
                'max_size',
                'broker_agent',
                'brokerage_shop',
                'timeline_type',
                'from_date',
                'to_date',
                'time_period',
                'property_class'
            ]),
        ]);
    }

    public function show($property, $url_slug)
    {
        $property = Property::where('id', $property)
            ->where('url_slug', $url_slug)
            ->with(['location', 'details', 'brokers.brokerage', 'images'])
            ->firstOrFail();

        return Inertia::render('Properties/Show', [
            'property' => $property,
        ]);
    }

    public function store(Request $request, PropertyImportService $importService)
    {
        // This endpoint would likely be protected and receive JSON payload
        // Validation would be needed here

        $data = $request->all();
        $property = $importService->importFromJson($data);

        return response()->json(['message' => 'Property imported successfully', 'id' => $property->id]);
    }

    public function update(Request $request, Property $property)
    {
        // Implement update logic if manual updates are allowed
    }

    public function destroy(Property $property)
    {
        $property->delete();
        return redirect()->route('properties.index');
    }

    public function auctions(Request $request)
    {
        $filter = $request->query('filter', 'all');

        $query = Property::with(['location', 'images', 'brokers.brokerage', 'details'])
            ->where('status', 'On-Market')
            ->whereNotNull('thumbnail_url');

        // Apply comprehensive filters
        $query = $this->applyFilters($query, $request);

        // Sorting
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');

        if (in_array($sort, ['asking_price', 'created_at', 'name'])) {
            $query->orderBy($sort, $direction);
        }

        $properties = $query->orderBy('created_at', 'desc')->get();

        // Apply client-side filter if needed
        if ($filter && $filter !== 'all') {
            $filteredProperties = $properties->filter(function ($property, $index) use ($filter) {
                if ($filter === 'option1') return $index % 3 === 0;
                if ($filter === 'option2') return $index % 3 === 1;
                if ($filter === 'option3') return $index % 3 === 2;
                return true;
            });
            $properties = $filteredProperties->values();
        }

        return Inertia::render('Properties', [
            'properties' => $properties,
            'filter' => $filter,
            'section' => 'auctions',
            'filters' => $request->only([
                'location',
                'keywords',
                'property_types',
                'min_rate',
                'max_rate',
                'exclude_undisclosed_rate',
                'size_type',
                'min_size',
                'max_size',
                'broker_agent',
                'brokerage_shop',
                'timeline_type',
                'from_date',
                'to_date',
                'time_period',
                'property_class'
            ]),
        ]);
    }

    public function residentials(Request $request)
    {
        $filter = $request->query('filter', 'all');

        $query = Property::with(['location', 'images', 'brokers.brokerage', 'details'])
            ->where(function ($query) {
                $query->whereJsonContains('types', 'Multifamily')
                    ->orWhereJsonContains('types', 'living')
                    ->orWhereJsonContains('types', 'Residential');
            })
            ->where('status', '!=', 'Sold')
            ->whereNotNull('thumbnail_url');

        // Apply comprehensive filters
        $query = $this->applyFilters($query, $request);

        // Sorting
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');

        if (in_array($sort, ['asking_price', 'created_at', 'name'])) {
            $query->orderBy($sort, $direction);
        }

        $properties = $query->orderBy('created_at', 'desc')->get();

        // Apply client-side filter if needed
        if ($filter && $filter !== 'all') {
            $filteredProperties = $properties->filter(function ($property, $index) use ($filter) {
                if ($filter === 'option1') return $index % 3 === 0;
                if ($filter === 'option2') return $index % 3 === 1;
                if ($filter === 'option3') return $index % 3 === 2;
                return true;
            });
            $properties = $filteredProperties->values();
        }

        return Inertia::render('Properties', [
            'properties' => $properties,
            'filter' => $filter,
            'section' => 'residentials',
            'filters' => $request->only([
                'location',
                'keywords',
                'property_types',
                'min_rate',
                'max_rate',
                'exclude_undisclosed_rate',
                'size_type',
                'min_size',
                'max_size',
                'broker_agent',
                'brokerage_shop',
                'timeline_type',
                'from_date',
                'to_date',
                'time_period',
                'property_class'
            ]),
        ]);
    }

    public function commercial(Request $request)
    {
        $filter = $request->query('filter', 'all');

        $query = Property::with(['location', 'images', 'brokers.brokerage', 'details'])
            ->where(function ($query) {
                $query->whereJsonContains('types', 'Commercial')
                    ->orWhereJsonContains('types', 'Land')
                    ->orWhereJsonContains('types', 'Multifamily')
                    ->orWhereJsonContains('types', 'Office')
                    ->orWhereJsonContains('types', 'Retail')
                    ->orWhereJsonContains('types', 'Industrial');
            })
            ->where(function ($query) {
                $query->whereJsonDoesntContain('types', 'Residential');
            })
            ->where('status', '!=', 'Sold')
            ->whereNotNull('thumbnail_url');

        // Apply comprehensive filters
        $query = $this->applyFilters($query, $request);

        // Sorting
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');

        if (in_array($sort, ['asking_price', 'created_at', 'name'])) {
            $query->orderBy($sort, $direction);
        }

        $properties = $query->orderBy('created_at', 'desc')->get();

        // Apply client-side filter if needed
        if ($filter && $filter !== 'all') {
            $filteredProperties = $properties->filter(function ($property, $index) use ($filter) {
                if ($filter === 'option1') return $index % 3 === 0;
                if ($filter === 'option2') return $index % 3 === 1;
                if ($filter === 'option3') return $index % 3 === 2;
                return true;
            });
            $properties = $filteredProperties->values();
        }

        return Inertia::render('Properties', [
            'properties' => $properties,
            'filter' => $filter,
            'section' => 'commercial',
            'filters' => $request->only([
                'location',
                'keywords',
                'property_types',
                'min_rate',
                'max_rate',
                'exclude_undisclosed_rate',
                'size_type',
                'min_size',
                'max_size',
                'broker_agent',
                'brokerage_shop',
                'timeline_type',
                'from_date',
                'to_date',
                'time_period',
                'property_class'
            ]),
        ]);
    }

    public function rental(Request $request)
    {
        $query = Property::with(['location', 'images', 'brokers'])
            ->where('status', '!=', 'Sold')
            ->where('status', '!=', 'On-Market')
            ->whereNotNull('thumbnail_url')
            ->where(function ($query) {
                $query->whereJsonContains('types', 'Residential')
                    ->orWhereJsonContains('types', 'Multifamily');
            });

        // Apply filters
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhereHas('location', function ($locQuery) use ($search) {
                        $locQuery->where('city', 'like', "%{$search}%")
                            ->orWhere('state_name', 'like', "%{$search}%")
                            ->orWhere('zip', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->has('min_price')) {
            $query->where('asking_price', '>=', $request->input('min_price'));
        }

        if ($request->has('max_price')) {
            $query->where('asking_price', '<=', $request->input('max_price'));
        }

        // Sorting
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');

        if (in_array($sort, ['asking_price', 'created_at', 'name'])) {
            $query->orderBy($sort, $direction);
        }

        $properties = $query->paginate(12)->withQueryString();

        return Inertia::render('Properties/Rental', [
            'properties' => $properties,
            'filters' => $request->only(['search', 'min_price', 'max_price', 'sort', 'direction']),
        ]);
    }

    /**
     * Apply comprehensive filters to property query
     */
    protected function applyFilters($query, Request $request)
    {


        // 1. Location filter (supports multiple locations)
        if ($request->has('location') && $request->input('location')) {
            $locations = is_array($request->input('location'))
                ? $request->input('location')
                : explode(',', $request->input('location'));

            // Filter out empty values
            $locations = array_filter(array_map('trim', $locations), function ($loc) {
                return !empty($loc);
            });

            if (!empty($locations)) {
                $query->whereHas('location', function ($locQuery) use ($locations) {
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
        }

        // 2. Keywords filter
        if ($request->has('keywords') && $request->input('keywords')) {
            $keywords = trim($request->input('keywords'));
            if ($keywords) {
                $query->where(function ($q) use ($keywords) {
                    $q->where('name', 'like', "%{$keywords}%")
                        ->orWhere('description', 'like', "%{$keywords}%")
                        ->orWhere('marketing_description', 'like', "%{$keywords}%")
                        ->orWhereHas('details', function ($detailQuery) use ($keywords) {
                            $detailQuery->where('investment_highlights', 'like', "%{$keywords}%");
                        });
                });
            }
        }

        // 3. Property Types filter
        if ($request->has('property_types') && $request->input('property_types')) {
            $propertyTypes = is_array($request->input('property_types'))
                ? $request->input('property_types')
                : explode(',', $request->input('property_types'));

            // Remove "All" from array if present
            $propertyTypes = array_filter($propertyTypes, function ($type) {
                return trim($type) !== 'All' && trim($type) !== '';
            });

            if (!empty($propertyTypes)) {
                $query->where(function ($q) use ($propertyTypes) {
                    foreach ($propertyTypes as $type) {
                        $type = trim($type);
                        // Check if it's a subtype (format: "Type - Subtype")
                        if (strpos($type, ' - ') !== false) {
                            [$mainType, $subtype] = explode(' - ', $type, 2);
                            $mainType = trim($mainType);
                            $subtype = trim($subtype);
                            // Filter by both type and subtype
                            // Subtypes can be in properties.subtypes OR property_details.subtypes
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
                            // Just filter by main type
                            $q->orWhereJsonContains('types', $type);
                        }
                    }
                });
            }
        }

        // 4. Price/Rate filter (asking_price)
        if ($request->has('min_rate') || $request->has('min_price')) {
            $minPrice = $request->input('min_rate') ?: $request->input('min_price');
            if ($minPrice) {
                // Remove $ and commas, convert to number
                $minPrice = preg_replace('/[^0-9.]/', '', $minPrice);
                if (is_numeric($minPrice) && $minPrice > 0) {
                    $query->where('asking_price', '>=', $minPrice);
                }
            }
        }

        if ($request->has('max_rate') || $request->has('max_price')) {
            $maxPrice = $request->input('max_rate') ?: $request->input('max_price');
            if ($maxPrice && !str_ends_with($maxPrice, '+')) {
                // Remove $ and commas, convert to number
                $maxPrice = preg_replace('/[^0-9.]/', '', $maxPrice);
                if (is_numeric($maxPrice) && $maxPrice > 0) {
                    $query->where('asking_price', '<=', $maxPrice);
                }
            }
        }

        // Exclude undisclosed rate
        // if ($request->has('exclude_undisclosed_rate') && $request->input('exclude_undisclosed_rate')) {
        //     $query->whereNotNull('asking_price')->where('asking_price', '>', 0);
        // }

        // Exclude unpriced (same as exclude_undisclosed_rate)
        // if ($request->has('exclude_unpriced') && $request->input('exclude_unpriced')) {
        //     $query->whereNotNull('asking_price')->where('asking_price', '>', 0);
        // }

        // 5. Broker Agent filter
        if ($request->has('broker_agent') && $request->input('broker_agent')) {
            $brokerName = trim($request->input('broker_agent'));
            if ($brokerName) {
                $query->whereHas('brokers', function ($q) use ($brokerName) {
                    // Search in first name, last name, or full name (case-insensitive)
                    $q->where(function ($subQuery) use ($brokerName) {
                        $searchTerm = "%{$brokerName}%";
                        $subQuery->where('first_name', 'like', $searchTerm)
                            ->orWhere('last_name', 'like', $searchTerm)
                            ->orWhereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", [$searchTerm]);
                    });
                });
            }
        }

        // 6. Brokerage Shop filter
        if ($request->has('brokerage_shop') && $request->input('brokerage_shop')) {
            $brokerageName = trim($request->input('brokerage_shop'));
            if ($brokerageName) {
                $query->whereHas('brokers', function ($q) use ($brokerageName) {
                    $q->whereHas('brokerage', function ($brokerageQuery) use ($brokerageName) {
                        $brokerageQuery->where('name', 'like', "%{$brokerageName}%");
                    });
                });
            }
        }

        // ============================================
        // OTHER FILTERS - Temporarily disabled for focused testing
        // Uncomment these as we test and fix them one by one
        // ============================================

        /*
        // Size filter (Square Feet or Acreage)
        if ($request->has('size_type') && $request->has('min_size')) {
            $sizeType = $request->input('size_type');
            $minSize = $request->input('min_size');
            $maxSize = $request->input('max_size');

            if ($sizeType === 'acreage') {
                // Filter by lot_size_acres
                if ($minSize && is_numeric($minSize)) {
                    $query->whereHas('details', function ($q) use ($minSize) {
                        $q->where('lot_size_acres', '>=', $minSize);
                    });
                }
                if ($maxSize && !str_ends_with($maxSize, '+') && is_numeric($maxSize)) {
                    $query->whereHas('details', function ($q) use ($maxSize) {
                        $q->where('lot_size_acres', '<=', $maxSize);
                    });
                }
            } else {
                // Filter by Square Feet from summary_details
                if (($minSize && is_numeric($minSize)) || ($maxSize && !str_ends_with($maxSize, '+') && is_numeric($maxSize))) {
                    $query->whereHas('details', function ($q) use ($minSize, $maxSize) {
                    if ($minSize && is_numeric($minSize)) {
                            $q->where(function ($sizeQuery) use ($minSize) {
                                $sizeQuery->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Feet') AS UNSIGNED) >= ?", [$minSize])
                                ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Sqft') AS UNSIGNED) >= ?", [$minSize])
                                    ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Footage') AS UNSIGNED) >= ?", [$minSize])
                                    ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.SF') AS UNSIGNED) >= ?", [$minSize]);
                        });
                    }
                    if ($maxSize && !str_ends_with($maxSize, '+') && is_numeric($maxSize)) {
                            $q->where(function ($sizeQuery) use ($maxSize) {
                                $sizeQuery->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Feet') AS UNSIGNED) <= ?", [$maxSize])
                                ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Sqft') AS UNSIGNED) <= ?", [$maxSize])
                                    ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Footage') AS UNSIGNED) <= ?", [$maxSize])
                                    ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.SF') AS UNSIGNED) <= ?", [$maxSize]);
                            });
                        }
                    });
                }
            }
        }

        // Listing Timeline filter
        if ($request->has('timeline_type')) {
            $timelineType = $request->input('timeline_type');

            if ($timelineType === 'custom' && $request->has('from_date') && $request->has('to_date')) {
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
                        $query->where('created_at', '>=', $now->subDays(7));
                        break;
                    case 'Last 30 days':
                        $query->where('created_at', '>=', $now->subDays(30));
                        break;
                    case 'Last 90 days':
                        $query->where('created_at', '>=', $now->subDays(90));
                        break;
                    case 'Last 6 months':
                        $query->where('created_at', '>=', $now->subMonths(6));
                        break;
                    case 'Last year':
                        $query->where('created_at', '>=', $now->subYear());
                        break;
                }
            }
        }

        // Property Class filter (if stored in details or summary_details)
        if ($request->has('property_class') && $request->input('property_class')) {
            $propertyClasses = is_array($request->input('property_class'))
                ? $request->input('property_class')
                : explode(',', $request->input('property_class'));

            if (!empty($propertyClasses)) {
                $query->whereHas('details', function ($q) use ($propertyClasses) {
                    $q->where(function ($subQuery) use ($propertyClasses) {
                    foreach ($propertyClasses as $class) {
                            $class = trim($class);
                            $searchTerm = "%{$class}%";
                            $subQuery->orWhere(function ($classQuery) use ($class, $searchTerm) {
                                $classQuery->whereRaw("JSON_EXTRACT(summary_details, '$.Class') LIKE ?", [$searchTerm])
                                    ->orWhereRaw("JSON_EXTRACT(summary_details, '$.Property Class') LIKE ?", [$searchTerm])
                                    ->orWhereRaw("JSON_EXTRACT(summary_details, '$.PropertyClass') LIKE ?", [$searchTerm]);
                            });
                        }
                    });
                });
            }
        }

        // Exclude Unpriced Listings
        if ($request->has('exclude_unpriced') && $request->input('exclude_unpriced')) {
            $query->whereNotNull('asking_price')->where('asking_price', '>', 0);
        }

        // Cap Rate filter (if stored in summary_details)
        if ($request->has('min_cap_rate') && $request->input('min_cap_rate')) {
            $minCapRate = preg_replace('/[^0-9.]/', '', $request->input('min_cap_rate'));
            if (is_numeric($minCapRate)) {
                $query->whereHas('details', function ($q) use ($minCapRate) {
                    $q->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Cap Rate') AS DECIMAL(5,2)) >= ?", [$minCapRate])
                        ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Cap Rate %') AS DECIMAL(5,2)) >= ?", [$minCapRate]);
                });
            }
        }

        if ($request->has('max_cap_rate') && $request->input('max_cap_rate') && !str_ends_with($request->input('max_cap_rate'), '+')) {
            $maxCapRate = preg_replace('/[^0-9.]/', '', $request->input('max_cap_rate'));
            if (is_numeric($maxCapRate)) {
                $query->whereHas('details', function ($q) use ($maxCapRate) {
                    $q->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Cap Rate') AS DECIMAL(5,2)) <= ?", [$maxCapRate])
                        ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Cap Rate %') AS DECIMAL(5,2)) <= ?", [$maxCapRate]);
                });
            }
        }

        // Tenant/Brand filter (if stored in summary_details)
        if ($request->has('tenant_brand') && $request->input('tenant_brand')) {
            $tenantBrand = trim($request->input('tenant_brand'));
            if ($tenantBrand) {
                $query->whereHas('details', function ($q) use ($tenantBrand) {
                    $searchTerm = "%{$tenantBrand}%";
                    $q->where(function ($subQuery) use ($tenantBrand, $searchTerm) {
                        $subQuery->whereRaw("JSON_EXTRACT(summary_details, '$.Tenant') LIKE ?", [$searchTerm])
                            ->orWhereRaw("JSON_EXTRACT(summary_details, '$.Brand') LIKE ?", [$searchTerm])
                            ->orWhereRaw("JSON_EXTRACT(summary_details, '$.Tenant Name') LIKE ?", [$searchTerm])
                            ->orWhereRaw("JSON_EXTRACT(summary_details, '$.Brand Name') LIKE ?", [$searchTerm]);
                    });
                });
            }
        }

        // Remaining Term filter (if stored in summary_details)
        if ($request->has('remaining_term') && is_array($request->input('remaining_term'))) {
            $remainingTerm = $request->input('remaining_term');
            if (isset($remainingTerm[0]) && is_numeric($remainingTerm[0])) {
                $query->whereHas('details', function ($q) use ($remainingTerm) {
                    $q->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Remaining Term') AS UNSIGNED) >= ?", [$remainingTerm[0]]);
                });
            }
            if (isset($remainingTerm[1]) && is_numeric($remainingTerm[1]) && $remainingTerm[1] < 100) {
                $query->whereHas('details', function ($q) use ($remainingTerm) {
                    $q->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Remaining Term') AS UNSIGNED) <= ?", [$remainingTerm[1]]);
                });
            }
        }

        // Tenancy filter (vacant, single, multi)
        if ($request->has('tenancy') && $request->input('tenancy')) {
            $tenancy = trim($request->input('tenancy'));
            if ($tenancy) {
                $query->whereHas('details', function ($q) use ($tenancy) {
                    $searchTerm = "%{$tenancy}%";
                    $q->where(function ($subQuery) use ($tenancy, $searchTerm) {
                        $subQuery->whereRaw("JSON_EXTRACT(summary_details, '$.Tenancy') LIKE ?", [$searchTerm])
                            ->orWhereRaw("JSON_EXTRACT(summary_details, '$.Tenant Count') LIKE ?", [$searchTerm])
                            ->orWhereRaw("JSON_EXTRACT(summary_details, '$.Occupancy Status') LIKE ?", [$searchTerm]);
                    });
                });
            }
        }

        // Lease Type filter
        if ($request->has('lease_type') && $request->input('lease_type')) {
            $leaseType = trim($request->input('lease_type'));
            if ($leaseType) {
                $query->whereHas('details', function ($q) use ($leaseType) {
                    $searchTerm = "%{$leaseType}%";
                    $q->where(function ($subQuery) use ($leaseType, $searchTerm) {
                        $subQuery->whereRaw("JSON_EXTRACT(summary_details, '$.Lease Type') LIKE ?", [$searchTerm])
                            ->orWhereRaw("JSON_EXTRACT(summary_details, '$.Lease') LIKE ?", [$searchTerm]);
                    });
                });
            }
        }

        // Unit Measurements filter
        if ($request->has('measurement_type') && $request->has('min_units')) {
            $measurementType = $request->input('measurement_type');
            $minUnits = preg_replace('/[^0-9]/', '', $request->input('min_units'));
            $maxUnits = preg_replace('/[^0-9]/', '', $request->input('max_units'));

            if ($minUnits && is_numeric($minUnits)) {
                $query->whereHas('details', function ($q) use ($measurementType, $minUnits) {
                    $fieldMap = [
                        'units' => 'Units',
                        'keys' => 'Keys',
                        'beds' => 'Beds',
                        'pads' => 'Pads',
                        'pumps' => 'Pumps',
                    ];
                    $field = $fieldMap[$measurementType] ?? 'Units';
                    $q->whereRaw("CAST(JSON_EXTRACT(summary_details, ?) AS UNSIGNED) >= ?", ["$.{$field}", $minUnits]);
                });
            }

            if ($maxUnits && !str_ends_with($request->input('max_units'), '+') && is_numeric($maxUnits)) {
                $query->whereHas('details', function ($q) use ($measurementType, $maxUnits) {
                    $fieldMap = [
                        'units' => 'Units',
                        'keys' => 'Keys',
                        'beds' => 'Beds',
                        'pads' => 'Pads',
                        'pumps' => 'Pumps',
                    ];
                    $field = $fieldMap[$measurementType] ?? 'Units';
                    $q->whereRaw("CAST(JSON_EXTRACT(summary_details, ?) AS UNSIGNED) <= ?", ["$.{$field}", $maxUnits]);
                });
            }
        }

        // Square Footage filter
        if ($request->has('min_sqft') && is_numeric($request->input('min_sqft'))) {
            $minSqft = $request->input('min_sqft');
            $query->whereHas('details', function ($q) use ($minSqft) {
                $q->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Feet') AS UNSIGNED) >= ?", [$minSqft])
                    ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Sqft') AS UNSIGNED) >= ?", [$minSqft])
                    ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Footage') AS UNSIGNED) >= ?", [$minSqft]);
            });
        }

        if ($request->has('max_sqft') && is_numeric($request->input('max_sqft'))) {
            $maxSqft = $request->input('max_sqft');
            $query->whereHas('details', function ($q) use ($maxSqft) {
                $q->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Feet') AS UNSIGNED) <= ?", [$maxSqft])
                    ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Sqft') AS UNSIGNED) <= ?", [$maxSqft])
                    ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Footage') AS UNSIGNED) <= ?", [$maxSqft]);
            });
        }

        // Price per Square Foot filter
        if ($request->has('min_price_per_sqft') && is_numeric($request->input('min_price_per_sqft'))) {
            $minPricePerSqft = $request->input('min_price_per_sqft');
            $query->whereHas('details', function ($q) use ($minPricePerSqft) {
                $q->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Price per SF') AS DECIMAL(10,2)) >= ?", [$minPricePerSqft])
                    ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.$/SF') AS DECIMAL(10,2)) >= ?", [$minPricePerSqft]);
            });
        }

        if ($request->has('max_price_per_sqft') && is_numeric($request->input('max_price_per_sqft'))) {
            $maxPricePerSqft = $request->input('max_price_per_sqft');
            $query->whereHas('details', function ($q) use ($maxPricePerSqft) {
                $q->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Price per SF') AS DECIMAL(10,2)) <= ?", [$maxPricePerSqft])
                    ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.$/SF') AS DECIMAL(10,2)) <= ?", [$maxPricePerSqft]);
            });
        }

        // Acreage filter
        if ($request->has('min_acres') && is_numeric($request->input('min_acres'))) {
            $minAcres = $request->input('min_acres');
            $query->whereHas('details', function ($q) use ($minAcres) {
                $q->where('lot_size_acres', '>=', $minAcres);
            });
        }

        if ($request->has('max_acres') && is_numeric($request->input('max_acres'))) {
            $maxAcres = $request->input('max_acres');
            $query->whereHas('details', function ($q) use ($maxAcres) {
                $q->where('lot_size_acres', '<=', $maxAcres);
            });
        }

        // Tenant Credit filter
        if ($request->has('tenant_credit') && $request->input('tenant_credit')) {
            $tenantCredit = trim($request->input('tenant_credit'));
            if ($tenantCredit) {
                $query->whereHas('details', function ($q) use ($tenantCredit) {
                    $searchTerm = "%{$tenantCredit}%";
                    $q->where(function ($subQuery) use ($tenantCredit, $searchTerm) {
                        $subQuery->whereRaw("JSON_EXTRACT(summary_details, '$.Tenant Credit') LIKE ?", [$searchTerm])
                            ->orWhereRaw("JSON_EXTRACT(summary_details, '$.Credit Rating') LIKE ?", [$searchTerm]);
                    });
                });
            }
        }

        // Occupancy filter
        if ($request->has('min_occupancy') && is_numeric($request->input('min_occupancy'))) {
            $minOccupancy = preg_replace('/[^0-9.]/', '', $request->input('min_occupancy'));
            if (is_numeric($minOccupancy)) {
                $query->whereHas('details', function ($q) use ($minOccupancy) {
                    $q->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Occupancy') AS DECIMAL(5,2)) >= ?", [$minOccupancy])
                        ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Occupancy %') AS DECIMAL(5,2)) >= ?", [$minOccupancy]);
                });
            }
        }

        if ($request->has('max_occupancy') && is_numeric($request->input('max_occupancy'))) {
            $maxOccupancy = preg_replace('/[^0-9.]/', '', $request->input('max_occupancy'));
            if (is_numeric($maxOccupancy)) {
                $query->whereHas('details', function ($q) use ($maxOccupancy) {
                    $q->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Occupancy') AS DECIMAL(5,2)) <= ?", [$maxOccupancy])
                        ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Occupancy %') AS DECIMAL(5,2)) <= ?", [$maxOccupancy]);
                });
            }
        }

        // Listing Status filter
        if ($request->has('listing_status') && $request->input('listing_status')) {
            $listingStatuses = is_array($request->input('listing_status'))
                ? $request->input('listing_status')
                : explode(',', $request->input('listing_status'));

            if (!empty($listingStatuses)) {
                $query->where(function ($q) use ($listingStatuses) {
                    foreach ($listingStatuses as $status) {
                        $q->orWhere('status', trim($status));
                    }
                });
            }
        }

        // Opportunity Zone filter
        if ($request->has('opportunity_zone') && $request->input('opportunity_zone')) {
            $query->where('is_in_opportunity_zone', true);
        }

        // Broker/Agent Co-Op and Owner/User filters
        // These would need to be stored in summary_details or a separate field
        // For now, we'll skip these as they may not be in the database structure

        // Legacy filters for backward compatibility
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhereHas('location', function ($locQuery) use ($search) {
                        $locQuery->where('city', 'like', "%{$search}%")
                            ->orWhere('state_name', 'like', "%{$search}%")
                            ->orWhere('zip', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->has('type')) {
            $query->whereJsonContains('types', $request->input('type'));
        }
        */

        return $query;
    }
}
