<?php

namespace App\Http\Controllers;

use App\Models\OwnerCompany;
use App\Models\OwnerFund;
use Illuminate\Http\Request;
use Inertia\Inertia;

class OwnerCompanyController extends Controller
{
    public function index(Request $request)
    {
        $tab = $request->get('tab', 'companies'); // 'companies' or 'funds'

        if ($tab === 'funds') {
            $query = OwnerFund::query();

            // Search by fund name
            if ($request->has('search') && $request->search) {
                $query->where('fund_name', 'like', '%' . $request->search . '%');
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
            $sortBy = $request->get('sort_by', 'fund_name');
            $sortDir = $request->get('sort_dir', 'asc');

            $allowedSorts = ['fund_name', 'owner_type', 'properties', 'portfolio_sf', 'territory', 'main_property_type'];
            if (in_array($sortBy, $allowedSorts)) {
                $query->orderBy($sortBy, $sortDir);
            } else {
                $query->orderBy('fund_name', 'asc');
            }

            $perPage = $request->get('per_page', 20);
            $funds = $query->paginate($perPage);

            return Inertia::render('Contacts/Owners/Funds', [
                'funds' => $funds,
                'filters' => $request->only(['search', 'min_properties', 'min_portfolio_sf', 'max_portfolio_sf', 'owner_type', 'territory', 'main_property_type']),
                'sort' => [
                    'by' => $sortBy,
                    'dir' => $sortDir,
                ],
            ]);
        } else {
            // Companies tab (default)
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
    }

    public function show(Request $request, $id)
    {
        $company = OwnerCompany::findOrFail($id);

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
}

