<?php

namespace App\Http\Controllers;

use App\Models\TennentLocation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class TenantLocationController extends Controller
{
    public function index(Request $request)
    {
        $query = TennentLocation::query();

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
            $query->whereRaw('CAST(sf_occupied AS UNSIGNED) >= ?', [$request->min_sf_occupied]);
        }
        if ($request->has('max_sf_occupied') && $request->max_sf_occupied !== null) {
            $query->whereRaw('CAST(sf_occupied AS UNSIGNED) <= ?', [$request->max_sf_occupied]);
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

        $allowedSorts = ['tenant_name', 'city', 'state', 'sf_occupied', 'market', 'property_type'];
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortDir);
        } else {
            $query->orderBy('tenant_name', 'asc');
        }

        $perPage = $request->get('per_page', 20);
        $locations = $query->paginate($perPage);

        // Add company_id to each location
        $locations->getCollection()->transform(function ($location) {
            $company = \App\Models\TennentCompany::where('tenant_name', $location->tenant_name)->first();
            $location->company_id = $company ? $company->id : null;
            return $location;
        });

        return Inertia::render('Contacts/Tenants/Locations', [
            'locations' => $locations,
            'filters' => $request->only(['search', 'address_search', 'min_sf_occupied', 'max_sf_occupied', 'space_use', 'occupancy', 'industry', 'city', 'state', 'market', 'property_type']),
            'sort' => [
                'by' => $sortBy,
                'dir' => $sortDir,
            ],
        ]);
    }
}
