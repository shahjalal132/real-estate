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
        if ($request->has('min_sf_occupied')) {
            $query->where('sf_occupied', '>=', $request->min_sf_occupied);
        }
        if ($request->has('max_sf_occupied')) {
            $query->where('sf_occupied', '<=', $request->max_sf_occupied);
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
            $locationsQuery = \App\Models\TennentLocation::where('tenant_name', $company->tenant_name);

            // Apply filters if any
            if ($request->has('view_mode')) {
                // View mode is handled on frontend
            }

            // Get locations with pagination
            $perPage = $request->get('per_page', 20);
            $locations = $locationsQuery->paginate($perPage);

            // Get related companies (same industry or parent company)
            $relatedCompanies = TennentCompany::where('id', '!=', $id)
                ->where(function ($query) use ($company) {
                    $query->where('industry', $company->industry)
                        ->orWhere('parent_company', $company->tenant_name);
                })
                ->limit(10)
                ->get();

            return Inertia::render('Contacts/Tenants/CompanyDetails', [
                'company' => $company,
                'locations' => $locations,
                'relatedCompanies' => $relatedCompanies,
                'filters' => $request->only(['search', 'address_search', 'space_use', 'min_sf_occupied', 'max_sf_occupied', 'occupancy', 'view_mode']),
            ]);
        }

        // For other tabs, render the tab page with coming soon
        $tabLabels = [
            'locations' => 'Locations',
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
