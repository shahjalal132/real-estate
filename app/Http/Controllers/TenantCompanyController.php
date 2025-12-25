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
}
