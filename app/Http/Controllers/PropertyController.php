<?php

namespace App\Http\Controllers;

use App\Traits\FiltersProperties;
use App\Models\Property;
use App\Services\PropertyImportService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    use FiltersProperties;

    public function index(Request $request)
    {
        $section = $request->query('section');
        $filter = $request->query('filter', 'all');
        $type = $request->query('type'); // for-sale, for-lease
        $category = $request->query('category'); // commercial, residential
        $listingType = $request->query('listing_type'); // off-market, on-market
        $status = $request->query('status'); // auctions

        $query = Property::with(['location', 'images', 'brokers.brokerage', 'details']);

        // Check if this is "all-commercial" or "all-residential" (includes all listing types)
        $isAllCategory = ($category === 'all-commercial' || $category === 'all-residential');

        // Normalize category for filtering (remove "all-" prefix)
        $normalizedCategory = $isAllCategory
            ? str_replace('all-', '', $category)
            : $category;

        // Apply type-based filtering (for-sale vs for-lease)
        // Skip type filtering for "all-commercial" and "all-residential" as they include all types
        if (!$isAllCategory && $type === 'for-sale') {
            $query->where('status', '!=', 'Sold')
                ->where(function ($q) {
                    $q->whereDoesntHave('details', function ($detailQuery) {
                        $detailQuery->whereNotNull('lease_type')
                            ->where('lease_type', '!=', '');
                    })
                        ->orWhereIn('status', ['On-Market', 'Off-Market', 'Auction', 'Pending', 'Under Contract']);
                });
        } elseif (!$isAllCategory && $type === 'for-lease') {
            $query->where('status', '!=', 'Sold')
                ->where(function ($q) {
                    $q->whereHas('details', function ($detailQuery) {
                        $detailQuery->whereNotNull('lease_type')
                            ->where('lease_type', '!=', '');
                    })
                        ->orWhere(function ($subQ) {
                            $subQ->whereJsonContains('types', 'Residential')
                                ->orWhereJsonContains('types', 'Multifamily');
                        });
                });
        }

        // For "all-commercial" and "all-residential", exclude Sold status but include all other statuses
        if ($isAllCategory) {
            $query->where('status', '!=', 'Sold');
        }

        // Apply category-based filtering (commercial vs residential)
        if ($normalizedCategory === 'residential') {
            $query->where(function ($q) {
                $q->whereJsonContains('types', 'Residential')
                    ->orWhere(function ($subQ) {
                        // Multifamily that is residential-focused (not commercial multifamily)
                        $subQ->whereJsonContains('types', 'Multifamily')
                            ->whereDoesntHave('details', function ($detailQuery) {
                                // Exclude commercial multifamily (check subtypes or details)
                                $detailQuery->whereJsonContains('subtypes', 'Commercial')
                                    ->orWhere('class', 'like', '%Commercial%');
                            });
                    });
            });
        } elseif ($normalizedCategory === 'commercial') {
            // Commercial: Commercial, Land, Office, Retail, Industrial, OR Commercial Multifamily
            $query->where(function ($q) {
                $q->whereJsonContains('types', 'Commercial')
                    ->orWhereJsonContains('types', 'Land')
                    ->orWhereJsonContains('types', 'Office')
                    ->orWhereJsonContains('types', 'Retail')
                    ->orWhereJsonContains('types', 'Industrial')
                    ->orWhereJsonContains('types', 'Hospitality')
                    ->orWhereJsonContains('types', 'Mixed Use')
                    ->orWhere(function ($subQ) {
                        // Commercial Multifamily (apartment buildings, commercial multifamily)
                        $subQ->whereJsonContains('types', 'Multifamily')
                            ->where(function ($multifamilyQ) {
                                $multifamilyQ->whereHas('details', function ($detailQuery) {
                                    $detailQuery->whereJsonContains('subtypes', 'Commercial')
                                        ->orWhere('class', 'like', '%Commercial%');
                                })
                                    ->orWhereJsonContains('subtypes', 'Commercial');
                            });
                    });
            })
                // Exclude pure residential
                ->where(function ($excludeQ) {
                    $excludeQ->whereJsonDoesntContain('types', 'Residential')
                        ->orWhere(function ($residentialQ) {
                            // Allow Residential only if it's also Commercial or Mixed Use
                            $residentialQ->whereJsonContains('types', 'Residential')
                                ->where(function ($mixedQ) {
                                    $mixedQ->whereJsonContains('types', 'Commercial')
                                        ->orWhereJsonContains('types', 'Mixed Use');
                                });
                        });
                });
        }

        // Apply section-based filtering (backward compatibility)
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

        // Apply listing type filtering (off-market, on-market)
        if ($listingType === 'off-market') {
            $query->where('status', 'Off-Market');
        } elseif ($listingType === 'on-market') {
            $query->whereIn('status', ['On-Market', 'Auction', 'Pending', 'Under Contract']);
        }

        // Apply status filtering (auctions)
        if ($status === 'auctions') {
            // Auctions have status "Auction" or may be On-Market with auction indicators
            $query->where(function ($q) {
                $q->where('status', 'Auction')
                    ->orWhere(function ($subQ) {
                        // Check if property has auction-related details
                        $subQ->where('status', 'On-Market')
                            ->where(function ($auctionQ) {
                                $auctionQ->whereHas('details', function ($detailQuery) {
                                    $detailQuery->where('sale_condition', 'like', '%Auction%')
                                        ->orWhere('investment_type', 'like', '%Auction%')
                                        ->orWhereRaw("JSON_EXTRACT(summary_details, '$[*].key') LIKE '%Auction%'")
                                        ->orWhereRaw("JSON_EXTRACT(summary_details, '$[*].label') LIKE '%Auction%'");
                                })
                                    ->orWhere('name', 'like', '%Auction%')
                                    ->orWhere('marketing_description', 'like', '%Auction%');
                            });
                    });
            });
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

        // Get property_types filter for title generation
        $propertyTypes = $request->has('property_types') && $request->input('property_types')
            ? (is_array($request->input('property_types'))
                ? $request->input('property_types')
                : explode(',', $request->input('property_types')))
            : null;

        // Generate listing title based on filters
        $listingTitle = $this->generateListingTitle($type, $category, $listingType, $status, $section, $propertyTypes);

        return Inertia::render('Properties', [
            'properties' => $properties,
            'filter' => $filter,
            'section' => $section ?: ($category ?: null),
            'listingTitle' => $listingTitle,
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
                'property_class',
                'type',
                'category',
                'listing_type',
                'status'
            ]),
        ]);
    }

    public function show($property, $url_slug)
    {
        $property = Property::where('id', $property)
            ->where('url_slug', $url_slug)
            ->with(['location', 'details', 'brokers.brokerage', 'images'])
            ->firstOrFail();

        // Get similar properties based on property types
        $similarProperties = Property::where('id', '!=', $property->id)
            ->whereNotNull('thumbnail_url')
            ->where(function ($query) use ($property) {
                // Match by property types
                if ($property->types && is_array($property->types) && count($property->types) > 0) {
                    foreach ($property->types as $type) {
                        $query->orWhereJsonContains('types', $type);
                    }
                }
                // Match by subtypes if available
                if ($property->subtypes && is_array($property->subtypes) && count($property->subtypes) > 0) {
                    foreach ($property->subtypes as $subtype) {
                        $query->orWhereJsonContains('subtypes', $subtype);
                    }
                }
                // Match by status
                if ($property->status) {
                    $query->orWhere('status', $property->status);
                }
            })
            ->with(['location', 'details', 'brokers.brokerage', 'images'])
            ->limit(10)
            ->get();

        return Inertia::render('Properties/Show', [
            'property' => $property,
            'similarProperties' => $similarProperties,
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
            'listingTitle' => 'Auctions',
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
            'listingTitle' => 'Residential Properties',
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
            'listingTitle' => 'Commercial Properties',
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
            'listingTitle' => 'Rental Properties',
            'filters' => $request->only(['search', 'min_price', 'max_price', 'sort', 'direction']),
        ]);
    }
}
