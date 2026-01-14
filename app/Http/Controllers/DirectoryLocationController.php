<?php

namespace App\Http\Controllers;

use App\Models\DirectoryLocation;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DirectoryLocationController extends Controller
{
    /**
     * Display a listing of the directory locations.
     */
    public function index(Request $request)
    {
        $query = DirectoryLocation::query();

        // Search by company, address, city
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('company', 'like', "%{$search}%")
                  ->orWhere('address', 'like', "%{$search}%")
                  ->orWhere('city', 'like', "%{$search}%");
            });
        }

        // Filter by City/State ?? For now, just generic search is fine or maybe specific columns later.
        if ($request->has('location') && $request->location) {
             $loc = $request->location;
             $query->where(function($q) use ($loc) {
                 $q->where('city', 'like', "%{$loc}%")
                   ->orWhere('state', 'like', "%{$loc}%")
                   ->orWhere('country', 'like', "%{$loc}%");
             });
        }
        
        // Sorting
        $sortBy = $request->get('sort_by', 'company');
        $sortDir = $request->get('sort_dir', 'asc');

        $allowedSorts = [
            'company', 'city', 'state', 'location_employees', 
            'lease_transactions_3y', 'sale_transactions_3y'
        ];
        
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortDir);
        } else {
            $query->orderBy('company', 'asc');
        }

        $perPage = $request->get('per_page', 20);
        $locations = $query->paginate($perPage)->withQueryString();

        return Inertia::render('Contacts/Locations/Index', [
            'locations' => $locations,
            'filters' => $request->only(['search', 'location', 'view', 'per_page']),
            'sort' => [
                'by' => $sortBy,
                'dir' => $sortDir,
            ],
        ]);
    }
}
