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
        // Location filter
        if ($request->has('location') && $request->input('location')) {
            $location = $request->input('location');
            $query->whereHas('location', function ($locQuery) use ($location) {
                $locQuery->where('city', 'like', "%{$location}%")
                    ->orWhere('state_name', 'like', "%{$location}%")
                    ->orWhere('state_code', 'like', "%{$location}%")
                    ->orWhere('zip', 'like', "%{$location}%")
                    ->orWhere('full_address', 'like', "%{$location}%")
                    ->orWhere('county', 'like', "%{$location}%");
            });
        }

        // Keywords filter
        if ($request->has('keywords') && $request->input('keywords')) {
            $keywords = $request->input('keywords');
            $query->where(function ($q) use ($keywords) {
                $q->where('name', 'like', "%{$keywords}%")
                    ->orWhere('description', 'like', "%{$keywords}%")
                    ->orWhere('marketing_description', 'like', "%{$keywords}%")
                    ->orWhereHas('details', function ($detailQuery) use ($keywords) {
                        $detailQuery->where('investment_highlights', 'like', "%{$keywords}%");
                    });
            });
        }

        // Property Types filter
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
                        $q->orWhereJsonContains('types', trim($type));
                    }
                });
            }
        }

        // Price/Rate filter (asking_price)
        if ($request->has('min_rate') || $request->has('min_price')) {
            $minPrice = $request->input('min_rate') ?: $request->input('min_price');
            if ($minPrice) {
                // Remove $ and commas, convert to number
                $minPrice = preg_replace('/[^0-9.]/', '', $minPrice);
                if (is_numeric($minPrice)) {
                    $query->where('asking_price', '>=', $minPrice);
                }
            }
        }

        if ($request->has('max_rate') || $request->has('max_price')) {
            $maxPrice = $request->input('max_rate') ?: $request->input('max_price');
            if ($maxPrice && !str_ends_with($maxPrice, '+')) {
                // Remove $ and commas, convert to number
                $maxPrice = preg_replace('/[^0-9.]/', '', $maxPrice);
                if (is_numeric($maxPrice)) {
                    $query->where('asking_price', '<=', $maxPrice);
                }
            }
        }

        // Exclude undisclosed rate
        if ($request->has('exclude_undisclosed_rate') && $request->input('exclude_undisclosed_rate')) {
            $query->whereNotNull('asking_price')->where('asking_price', '>', 0);
        }

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
                // Note: JSON filtering for numeric comparisons is complex, so we'll filter in PHP for now
                // This could be optimized with a database function or computed column
                if (($minSize && is_numeric($minSize)) || ($maxSize && !str_ends_with($maxSize, '+') && is_numeric($maxSize))) {
                    // We'll apply this filter after fetching, or use a more complex query
                    // For now, we'll use a whereRaw with JSON extraction
                    if ($minSize && is_numeric($minSize)) {
                        $query->whereHas('details', function ($q) use ($minSize) {
                            $q->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Feet') AS UNSIGNED) >= ?", [$minSize])
                                ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Sqft') AS UNSIGNED) >= ?", [$minSize])
                                ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Footage') AS UNSIGNED) >= ?", [$minSize]);
                        });
                    }
                    if ($maxSize && !str_ends_with($maxSize, '+') && is_numeric($maxSize)) {
                        $query->whereHas('details', function ($q) use ($maxSize) {
                            $q->whereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Feet') AS UNSIGNED) <= ?", [$maxSize])
                                ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Sqft') AS UNSIGNED) <= ?", [$maxSize])
                                ->orWhereRaw("CAST(JSON_EXTRACT(summary_details, '$.Square Footage') AS UNSIGNED) <= ?", [$maxSize]);
                        });
                    }
                }
            }
        }

        // Broker Agent filter
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

        // Brokerage Shop filter
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
                    foreach ($propertyClasses as $class) {
                        $q->orWhereJsonContains('summary_details->Class', trim($class))
                            ->orWhereJsonContains('summary_details->Property Class', trim($class));
                    }
                });
            }
        }

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

        return $query;
    }
}
