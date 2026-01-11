<?php

namespace App\Http\Controllers;

use App\Models\OwnerCompany;
use App\Models\OwnerFund;
use App\Models\Property;
use App\Models\TennentCompany;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OwnerCompanyController extends Controller
{
    public function companies(Request $request)
    {
        $query = OwnerCompany::query();

        // Search by company name
        if ($request->has('search') && $request->search) {
            $query->where('company', 'like', '%' . $request->search . '%');
        }

        // Filter: Properties (min and max)
        if ($request->has('min_properties')) {
            $query->where('properties', '>=', $request->min_properties);
        }
        if ($request->has('max_properties')) {
            $query->where('properties', '<=', $request->max_properties);
        }

        // Filter: Portfolio SF
        if ($request->has('min_portfolio_sf')) {
            $query->where('portfolio_sf', '>=', $request->min_portfolio_sf);
        }
        if ($request->has('max_portfolio_sf')) {
            $query->where('portfolio_sf', '<=', $request->max_portfolio_sf);
        }

        // Owner Type filter (supports single value or array)
        if ($request->has('owner_type') && $request->owner_type) {
            $ownerTypes = $request->owner_type;
            if (is_array($ownerTypes)) {
                $query->whereIn('owner_type', $ownerTypes);
            } else {
                $query->where('owner_type', $ownerTypes);
            }
        }

        // Territory filter
        if ($request->has('territory') && $request->territory) {
            $query->where('territory', $request->territory);
        }

        // Main Property Type filter (supports single value or array)
        if ($request->has('main_property_type') && $request->main_property_type) {
            $propertyTypes = $request->main_property_type;
            if (is_array($propertyTypes)) {
                $query->whereIn('main_property_type', $propertyTypes);
            } else {
                $query->where('main_property_type', $propertyTypes);
            }
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'company');
        $sortDir = $request->get('sort_dir', 'asc');

        $allowedSorts = ['company', 'owner_type', 'properties', 'portfolio_sf', 'territory', 'main_property_type'];
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortDir);
        } else {
            $query->orderBy('company', 'asc');
        }

        $perPage = $request->get('per_page', 15);
        $companies = $query->paginate($perPage);

        return Inertia::render('Contacts/Owners/Companies', [
            'companies' => $companies,
            'filters' => $request->only(['search', 'min_properties', 'max_properties', 'min_portfolio_sf', 'max_portfolio_sf', 'owner_type', 'territory', 'main_property_type']),
            'sort' => [
                'by' => $sortBy,
                'dir' => $sortDir,
            ],
        ]);
    }

    public function funds(Request $request)
    {
        $query = OwnerFund::query();

        // Search by fund name or company
        if ($request->has('search') && $request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('fund', 'like', '%' . $request->search . '%')
                    ->orWhere('company', 'like', '%' . $request->search . '%');
            });
        }

        // Filter: Properties
        if ($request->has('min_properties')) {
            $query->where('properties', '>=', $request->min_properties);
        }

        // Filter: Portfolio SF
        if ($request->has('min_portfolio_sf')) {
            $query->where('portfolio_size_sf', '>=', $request->min_portfolio_sf);
        }
        if ($request->has('max_portfolio_sf')) {
            $query->where('portfolio_size_sf', '<=', $request->max_portfolio_sf);
        }

        // Company filter
        if ($request->has('company') && $request->company) {
            $query->where('company', 'like', '%' . $request->company . '%');
        }

        // Status filter (supports single value or array)
        if ($request->has('status') && $request->status) {
            $statuses = $request->status;
            if (is_array($statuses)) {
                $query->whereIn('status', $statuses);
            } else {
                $query->where('status', $statuses);
            }
        }

        // Property Focus filter (supports single value or array)
        if ($request->has('property_focus') && $request->property_focus) {
            $propertyFocuses = $request->property_focus;
            if (is_array($propertyFocuses)) {
                $query->whereIn('property_focus', $propertyFocuses);
            } else {
                $query->where('property_focus', $propertyFocuses);
            }
        }

        // Country Focus filter (supports single value or array)
        if ($request->has('country_focus') && $request->country_focus) {
            $countryFocuses = $request->country_focus;
            if (is_array($countryFocuses)) {
                $query->where(function ($q) use ($countryFocuses) {
                    foreach ($countryFocuses as $country) {
                        $q->orWhere('country_focus', 'like', '%' . $country . '%');
                    }
                });
            } else {
                $query->where('country_focus', 'like', '%' . $countryFocuses . '%');
            }
        }

        // Region Focus filter
        if ($request->has('region_focus') && $request->region_focus) {
            $query->where('region_focus', 'like', '%' . $request->region_focus . '%');
        }

        // Strategy filter (supports single value or array)
        if ($request->has('strategy') && $request->strategy) {
            $strategies = $request->strategy;
            if (is_array($strategies)) {
                $query->whereIn('strategy', $strategies);
            } else {
                $query->where('strategy', 'like', '%' . $strategies . '%');
            }
        }

        // Dry Powder filter (min and max)
        if ($request->has('min_dry_powder')) {
            $query->where('dry_powder', '>=', $request->min_dry_powder);
        }
        if ($request->has('max_dry_powder')) {
            $query->where('dry_powder', '<=', $request->max_dry_powder);
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'fund');
        $sortDir = $request->get('sort_dir', 'asc');

        $allowedSorts = ['fund', 'company', 'fund_size', 'status', 'aum', 'vintage', 'properties', 'portfolio_size_sf', 'property_focus', 'country_focus', 'region_focus'];
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortDir);
        } else {
            $query->orderBy('fund', 'asc');
        }

        $perPage = $request->get('per_page', 20);
        $funds = $query->paginate($perPage);

        return Inertia::render('Contacts/Owners/Funds', [
            'funds' => $funds,
            'filters' => $request->only(['search', 'min_properties', 'min_portfolio_sf', 'max_portfolio_sf', 'company', 'status', 'property_focus', 'country_focus', 'region_focus', 'strategy', 'min_dry_powder', 'max_dry_powder']),
            'sort' => [
                'by' => $sortBy,
                'dir' => $sortDir,
            ],
        ]);
    }

    public function show(Request $request, $id, $tab = 'summary')
    {
        $company = OwnerCompany::findOrFail($id);

        // If it's the summary tab, render the full details page
        if ($tab === 'summary') {
            // Get related companies (same owner type or territory)
            $relatedCompanies = OwnerCompany::where('id', '!=', $id)
                ->where(function ($query) use ($company) {
                    $query->where('owner_type', $company->owner_type)
                        ->orWhere('territory', $company->territory)
                        ->orWhere('main_property_type', $company->main_property_type);
                })
                ->limit(10)
                ->get();

            return Inertia::render('Contacts/Owners/CompanyDetails', [
                'company' => $company,
                'relatedCompanies' => $relatedCompanies,
                'filters' => $request->only(['search']),
            ]);
        }

        // Handle properties tab
        if ($tab === 'properties') {
            // Get random 30-40 properties (for now, just get 35 random properties)
            $properties = Property::with(['location', 'images', 'brokers.brokerage', 'details'])
                ->inRandomOrder()
                ->limit(35)
                ->get();

            return Inertia::render('Contacts/Owners/Properties', [
                'company' => $company,
                'properties' => $properties,
            ]);
        }

        // Handle transactions tab
        if ($tab === 'transactions') {
            return Inertia::render('Contacts/Owners/Transactions', [
                'company' => $company,
            ]);
        }

        // Handle listings tab
        if ($tab === 'listings') {
            return Inertia::render('Contacts/Owners/Listings', [
                'company' => $company,
            ]);
        }

        // Handle funds tab
        if ($tab === 'funds') {
            return Inertia::render('Contacts/Owners/CompanyFunds', [
                'company' => $company,
            ]);
        }

        // Handle tenants tab
        if ($tab === 'tenants') {
            // Check if showing locations sub-tab
            if ($request->has('tab') && $request->get('tab') === 'locations') {
                $query = \App\Models\TennentLocation::query();

                // Search by tenant name (separate from address search)
                if ($request->has('search') && $request->search) {
                    $query->where('tenant_name', 'like', '%' . $request->search . '%');
                }

                // Address search (address, city, building name)
                if ($request->has('address_search') && $request->address_search) {
                    $addressSearch = $request->address_search;
                    $query->where(function ($q) use ($addressSearch) {
                        $q->where('address', 'like', '%' . $addressSearch . '%')
                            ->orWhere('city', 'like', '%' . $addressSearch . '%')
                            ->orWhere('building_name', 'like', '%' . $addressSearch . '%');
                    });
                }

                // Filter: Size Occupied (SF Occupied)
                if ($request->has('min_sf_occupied') && $request->min_sf_occupied !== null) {
                    $query->whereRaw('CAST(sf_occupied AS DECIMAL) >= ?', [$request->min_sf_occupied]);
                }
                if ($request->has('max_sf_occupied') && $request->max_sf_occupied !== null) {
                    $query->whereRaw('CAST(sf_occupied AS DECIMAL) <= ?', [$request->max_sf_occupied]);
                }

                // Space Use filter
                if ($request->has('space_use') && $request->space_use) {
                    $query->where('space_use', $request->space_use);
                }

                // Occupancy filter (using percent_of_building field)
                if ($request->has('occupancy') && $request->occupancy) {
                    // Parse occupancy range (e.g., "0-25", "26-50", etc.)
                    $occupancyRange = explode('-', $request->occupancy);
                    if (count($occupancyRange) === 2) {
                        $minOccupancy = (float) $occupancyRange[0];
                        $maxOccupancy = (float) $occupancyRange[1];
                        $query->where('percent_of_building', '>=', $minOccupancy)
                            ->where('percent_of_building', '<=', $maxOccupancy);
                    }
                }

                // Industry filter
                if ($request->has('industry') && $request->industry) {
                    $query->where('industry', $request->industry);
                }

                // City filter
                if ($request->has('city') && $request->city) {
                    $query->where('city', $request->city);
                }

                // State filter
                if ($request->has('state') && $request->state) {
                    $query->where('state', $request->state);
                }

                // Market filter
                if ($request->has('market') && $request->market) {
                    $query->where('market', $request->market);
                }

                // Property Type filter
                if ($request->has('property_type') && $request->property_type) {
                    $query->where('property_type', $request->property_type);
                }

                // Sorting
                $sortBy = $request->get('sort_by', 'tenant_name');
                $sortDir = $request->get('sort_dir', 'asc');

                $allowedSorts = ['tenant_name', 'city', 'state', 'sf_occupied', 'market', 'property_type', 'address'];
                if (in_array($sortBy, $allowedSorts)) {
                    if ($sortBy === 'sf_occupied') {
                        $query->orderByRaw('CAST(sf_occupied AS DECIMAL) ' . $sortDir);
                    } else {
                        $query->orderBy($sortBy, $sortDir);
                    }
                } else {
                    $query->orderBy('tenant_name', 'asc');
                }

                $perPage = $request->get('per_page', 20);
                $locations = $query->paginate($perPage);

                return Inertia::render('Contacts/Owners/Tenants', [
                    'company' => $company,
                    'locations' => $locations,
                    'filters' => $request->only(['search', 'address_search', 'min_sf_occupied', 'max_sf_occupied', 'space_use', 'occupancy', 'industry', 'city', 'state', 'market', 'property_type']),
                    'sort' => [
                        'by' => $sortBy,
                        'dir' => $sortDir,
                    ],
                ]);
            }

            // Default to companies view
            $query = TennentCompany::query();

            // Search by tenant name
            if ($request->has('search') && $request->search) {
                $query->where('tenant_name', 'like', '%' . $request->search . '%');
            }

            // Filter: Min Locations
            if ($request->has('min_locations') && $request->min_locations !== null) {
                $query->where('locations', '>=', $request->min_locations);
            }

            // Filter: Max Locations
            if ($request->has('max_locations') && $request->max_locations !== null) {
                $query->where('locations', '<=', $request->max_locations);
            }

            // Filter: Size Occupied (SF Occupied)
            if ($request->has('min_sf_occupied') && $request->min_sf_occupied !== null) {
                $query->whereRaw('CAST(sf_occupied AS UNSIGNED) >= ?', [$request->min_sf_occupied]);
            }
            if ($request->has('max_sf_occupied') && $request->max_sf_occupied !== null) {
                $query->whereRaw('CAST(sf_occupied AS UNSIGNED) <= ?', [$request->max_sf_occupied]);
            }

            // Filter: Retailers Only
            if ($request->boolean('retailers_only')) {
                $query->where('industry', 'like', '%Retailer%');
            }

            // Industry filter
            if ($request->has('industry') && $request->industry) {
                $query->where('industry', $request->industry);
            }

            // Territory filter
            if ($request->has('territory') && $request->territory) {
                $query->where('territory', $request->territory);
            }

            // Sorting
            $sortBy = $request->get('sort_by', 'tenant_name');
            $sortDir = $request->get('sort_dir', 'asc');

            $allowedSorts = [
                'tenant_name',
                'industry',
                'territory',
                'hq_market',
                'locations',
                'sf_occupied',
                'highest_use_by_sf',
                'employees',
                'growth',
                'revenue',
                'credit_rating',
                'established',
                'parent_company',
                'hq_city',
                'hq_state',
                'hq_postal_code',
                'hq_country',
                'naics',
                'sic',
            ];
            
            if (in_array($sortBy, $allowedSorts)) {
                // Handle special cases for numeric fields
                if (in_array($sortBy, ['sf_occupied', 'highest_use_by_sf', 'employees', 'revenue'])) {
                    $query->orderByRaw("CAST({$sortBy} AS UNSIGNED) {$sortDir}");
                } else {
                    $query->orderBy($sortBy, $sortDir);
                }
            } else {
                $query->orderBy('tenant_name', 'asc');
            }

            $perPage = $request->get('per_page', 15);
            $companies = $query->paginate($perPage);

            return Inertia::render('Contacts/Owners/Tenants', [
                'company' => $company,
                'companies' => $companies,
                'filters' => $request->only(['search', 'min_locations', 'max_locations', 'min_sf_occupied', 'max_sf_occupied', 'retailers_only', 'industry', 'territory']),
                'sort' => [
                    'by' => $sortBy,
                    'dir' => $sortDir,
                ],
            ]);
        }

        // For other tabs, render the tab page with coming soon
        $tabLabels = [
            'transactions' => 'Transactions',
            'acquisitions' => 'Acquisitions',
            'contacts' => 'Contacts',
            'relationships' => 'Relationships',
            'news' => 'News',
        ];

        $tabLabel = $tabLabels[$tab] ?? ucfirst(str_replace('-', ' ', $tab));

        return Inertia::render('Contacts/Owners/CompanyTab', [
            'company' => $company,
            'tab' => $tab,
            'tabLabel' => $tabLabel,
        ]);
    }
}
