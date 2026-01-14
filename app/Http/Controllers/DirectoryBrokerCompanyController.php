<?php

namespace App\Http\Controllers;

use App\Models\DirectoryBrokerCompany;
use Illuminate\Http\Request;
use Inertia\Inertia;

class DirectoryBrokerCompanyController extends Controller
{
    public function index(Request $request)
    {
        $query = DirectoryBrokerCompany::query();

        // Search
        if ($request->has('search') && !empty($request->search)) {
            $search = $request->search;
            $query->where(function($q) use ($search) {
                $q->where('company', 'like', "%{$search}%")
                  ->orWhere('specialty', 'like', "%{$search}%")
                  ->orWhere('hq_city', 'like', "%{$search}%")
                  ->orWhere('hq_state', 'like', "%{$search}%");
            });
        }

         // Filtering (Example: match exact fields if provided)
        if ($request->filled('hq_city')) {
            $query->where('hq_city', 'like', "%{$request->hq_city}%");
        }
        if ($request->filled('hq_state')) {
            $query->where('hq_state', 'like', "%{$request->hq_state}%");
        }
        if ($request->filled('specialty')) {
              $query->where('specialty', 'like', "%{$request->specialty}%");
        }

        // Sorting
        $sortColumn = $request->input('sort_by', 'company');
        $sortDirection = $request->input('sort_order', 'asc');
        
        // whitelist sort columns
        $allowedSorts = [
            'company', 'specialty', 'hq_city', 'hq_state', 'employees',
            'lease_transactions_3y', 'lease_listings', 'sale_transactions_3y', 'sale_listings'
        ];

        if (in_array($sortColumn, $allowedSorts)) {
             $query->orderBy($sortColumn, $sortDirection);
        } else {
             $query->orderBy('company', 'asc');
        }

        $perPage = $request->input('per_page', 10);
        
        $companies = $query->paginate($perPage)->withQueryString();

        return Inertia::render('Contacts/Companies/Index', [
            'companies' => $companies,
            'filters' => $request->all(['search', 'hq_city', 'hq_state', 'specialty', 'view', 'per_page']),
            'sort' => [
                'column' => $sortColumn,
                'direction' => $sortDirection
            ]
        ]);
    }
}
