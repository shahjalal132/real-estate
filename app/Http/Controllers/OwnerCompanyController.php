<?php

namespace App\Http\Controllers;

use App\Models\OwnerCompany;
use App\Models\OwnerFund;
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

        // For other tabs, render the tab page with coming soon
        $tabLabels = [
            'properties' => 'Properties',
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
