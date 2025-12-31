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

        // Filter: Properties
        if ($request->has('min_properties')) {
            $query->where('properties', '>=', $request->min_properties);
        }

        // Filter: Portfolio SF
        if ($request->has('min_portfolio_sf')) {
            $query->where('portfolio_sf', '>=', $request->min_portfolio_sf);
        }
        if ($request->has('max_portfolio_sf')) {
            $query->where('portfolio_sf', '<=', $request->max_portfolio_sf);
        }

        // Owner Type filter
        if ($request->has('owner_type') && $request->owner_type) {
            $query->where('owner_type', $request->owner_type);
        }

        // Territory filter
        if ($request->has('territory') && $request->territory) {
            $query->where('territory', $request->territory);
        }

        // Main Property Type filter
        if ($request->has('main_property_type') && $request->main_property_type) {
            $query->where('main_property_type', $request->main_property_type);
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

        $perPage = $request->get('per_page', 20);
        $companies = $query->paginate($perPage);

        return Inertia::render('Contacts/Owners/Companies', [
            'companies' => $companies,
            'filters' => $request->only(['search', 'min_properties', 'min_portfolio_sf', 'max_portfolio_sf', 'owner_type', 'territory', 'main_property_type']),
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
            $query->where(function($q) use ($request) {
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

        // Status filter
        if ($request->has('status') && $request->status) {
            $query->where('status', $request->status);
        }

        // Property Focus filter
        if ($request->has('property_focus') && $request->property_focus) {
            $query->where('property_focus', $request->property_focus);
        }

        // Country Focus filter
        if ($request->has('country_focus') && $request->country_focus) {
            $query->where('country_focus', 'like', '%' . $request->country_focus . '%');
        }

        // Region Focus filter
        if ($request->has('region_focus') && $request->region_focus) {
            $query->where('region_focus', 'like', '%' . $request->region_focus . '%');
        }

        // Strategy filter
        if ($request->has('strategy') && $request->strategy) {
            $query->where('strategy', 'like', '%' . $request->strategy . '%');
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
            'filters' => $request->only(['search', 'min_properties', 'min_portfolio_sf', 'max_portfolio_sf', 'company', 'status', 'property_focus', 'country_focus', 'region_focus', 'strategy']),
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

