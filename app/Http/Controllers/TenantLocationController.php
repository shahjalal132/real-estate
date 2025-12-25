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

        // Search by tenant name, address, city, building name
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('tenant_name', 'like', '%' . $search . '%')
                    ->orWhere('address', 'like', '%' . $search . '%')
                    ->orWhere('city', 'like', '%' . $search . '%')
                    ->orWhere('building_name', 'like', '%' . $search . '%');
            });
        }

        // Filter: Size Occupied (SF Occupied)
        if ($request->has('min_sf_occupied')) {
            $query->where('sf_occupied', '>=', $request->min_sf_occupied);
        }
        if ($request->has('max_sf_occupied')) {
            $query->where('sf_occupied', '<=', $request->max_sf_occupied);
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

        return Inertia::render('Contacts/Tenants/Locations', [
            'locations' => $locations,
            'filters' => $request->only(['search', 'min_sf_occupied', 'max_sf_occupied', 'industry', 'city', 'state', 'market', 'property_type']),
            'sort' => [
                'by' => $sortBy,
                'dir' => $sortDir,
            ],
        ]);
    }
}
