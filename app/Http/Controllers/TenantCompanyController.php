<?php

namespace App\Http\Controllers;

use App\Models\TennentCompany;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantCompanyController extends Controller
{
    public function index(Request $request)
    {
        $query = TennentCompany::query();

        // Search by tenant name
        if ($request->has('search') && $request->search) {
            $query->where('tenant_name', 'like', '%' . $request->search . '%');
        }

        // Filter: 5+ Locations
        if ($request->has('min_locations')) {
            $query->where('locations', '>=', $request->min_locations);
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

        $allowedSorts = ['tenant_name', 'industry', 'locations', 'sf_occupied', 'employees', 'growth'];
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortDir);
        } else {
            $query->orderBy('tenant_name', 'asc');
        }

        $perPage = $request->get('per_page', 20);
        $companies = $query->paginate($perPage);

        return Inertia::render('Contacts/Tenants/Companies', [
            'companies' => $companies,
            'filters' => $request->only(['search', 'min_locations', 'min_sf_occupied', 'max_sf_occupied', 'retailers_only', 'industry', 'territory']),
            'sort' => [
                'by' => $sortBy,
                'dir' => $sortDir,
            ],
        ]);
    }

    public function show(Request $request, $id, $tab = 'summary')
    {
        $company = TennentCompany::findOrFail($id);

        // If it's the summary tab, render the full details page
        if ($tab === 'summary') {
            // Get related locations for this company
            $locationsQuery = \App\Models\TennentLocation::latest();

            // Apply filters if any
            if ($request->has('view_mode')) {
                // View mode is handled on frontend
            }

            // Get locations with pagination
            $perPage = $request->get('per_page', 20);
            $locations = $locationsQuery->paginate(20);

            // Get related companies (same industry or parent company)
            $relatedCompanies = TennentCompany::where('id', '!=', $id)
                // ->where(function ($query) use ($company) {
                //     $query->where('industry', $company->industry)
                //         ->orWhere('parent_company', $company->tenant_name);
                // })
                ->limit(10)
                ->get();

            return Inertia::render('Contacts/Tenants/CompanyDetails', [
                'company' => $company,
                'locations' => $locations,
                'relatedCompanies' => $relatedCompanies,
                'filters' => $request->only(['search', 'address_search', 'space_use', 'min_sf_occupied', 'max_sf_occupied', 'occupancy', 'view_mode']),
            ]);
        }

        // Handle locations tab
        if ($tab === 'locations') {
            $query = \App\Models\TennentLocation::latest();

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

            // Add company_id to each location
            $locations->getCollection()->transform(function ($location) use ($company) {
                $location->company_id = $company->id;
                return $location;
            });

            return Inertia::render('Contacts/Tenants/CompanyLocations', [
                'company' => $company,
                'locations' => $locations,
                'filters' => $request->only(['search', 'address_search', 'min_sf_occupied', 'max_sf_occupied', 'space_use', 'occupancy', 'industry', 'city', 'state', 'market', 'property_type']),
                'sort' => [
                    'by' => $sortBy,
                    'dir' => $sortDir,
                ],
            ]);
        }

        // For other tabs, render the tab page with coming soon
        $tabLabels = [
            'transactions' => 'Transactions',
            'lease-expirations' => 'Lease Expirations',
            'contacts' => 'Contacts',
            'relationships' => 'Relationships',
            'news' => 'News',
        ];

        $tabLabel = $tabLabels[$tab] ?? ucfirst(str_replace('-', ' ', $tab));

        return Inertia::render('Contacts/Tenants/CompanyTab', [
            'company' => $company,
            'tab' => $tab,
            'tabLabel' => $tabLabel,
        ]);
    }
}
