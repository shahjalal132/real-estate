<?php

namespace App\Http\Controllers;

use App\Models\Broker;
use App\Models\DirectoryContact;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BrokerController extends Controller
{
    /**
     * Display a listing of the brokers (Directory Contacts).
     */
    public function index(Request $request)
    {
        $query = DirectoryContact::query();

        // Search by name, company, email
        if ($request->has('search') && $request->search) {
            $search = $request->search;
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhere('company', 'like', "%{$search}%")
                    ->orWhere('email', 'like', "%{$search}%");
            });
        }

        // Filter by Specialty
        if ($request->has('specialty') && $request->specialty) {
            $query->where('specialty', 'like', "%{$request->specialty}%");
        }

        // Sorting
        $sortBy = $request->get('sort_by', 'name');
        $sortDir = $request->get('sort_dir', 'asc');

        $allowedSorts = ['name', 'company', 'title', 'lease_listings', 'sale_listings', 'lease_transactions_3y', 'sale_transactions_3y'];
        if (in_array($sortBy, $allowedSorts)) {
            $query->orderBy($sortBy, $sortDir);
        } else {
            $query->orderBy('name', 'asc');
        }

        $perPage = $request->get('per_page', 20);
        $brokers = $query->paginate($perPage)->withQueryString();

        return Inertia::render('Contacts/Brokers/Index', [
            'brokers' => $brokers,
            'filters' => $request->only(['search', 'specialty', 'view', 'per_page']),
            'sort' => [
                'by' => $sortBy,
                'dir' => $sortDir,
            ],
        ]);
    }

    /**
     * Search brokers by name
     */
    public function search(Request $request)
    {
        $search = $request->input('search', '');
        $limit = $request->input('limit', 20);

        $query = Broker::with('brokerage')
            ->select('id', 'first_name', 'last_name', 'email', 'thumbnail_url', 'brokerage_id')
            ->orderBy('first_name')
            ->orderBy('last_name');

        if ($search) {
            $query->where(function ($q) use ($search) {
                $q->where('first_name', 'like', "%{$search}%")
                    ->orWhere('last_name', 'like', "%{$search}%")
                    ->orWhereRaw("CONCAT(first_name, ' ', last_name) LIKE ?", ["%{$search}%"]);
            });
        }

        $brokers = $query->limit($limit)->get()->map(function ($broker) {
            return [
                'id' => $broker->id,
                'full_name' => $broker->full_name,
                'first_name' => $broker->first_name,
                'last_name' => $broker->last_name,
                'email' => $broker->email,
                'thumbnail_url' => $broker->thumbnail_url,
                'brokerage_name' => $broker->brokerage?->name,
            ];
        });

        return response()->json($brokers);
    }
    /**
     * Display the specified broker.
     */
    public function show($id, $tab = 'summary')
    {
        $broker = DirectoryContact::findOrFail($id);
        $properties = null;

        // Load additional data based on tab if needed
        if ($tab === 'properties') {
            $properties = Property::latest()->paginate(10);
        }

        // For navigation (previous/next) - simple implementation for now based on ID
        $previousBrokerId = DirectoryContact::where('id', '<', $id)->max('id');
        $nextBrokerId = DirectoryContact::where('id', '>', $id)->min('id');
        $totalCount = DirectoryContact::count();
        // Calculate current index (rough estimate for now)
        $currentIndex = DirectoryContact::where('id', '<=', $id)->count();

        return Inertia::render('Contacts/Brokers/Details', [
            'broker' => $broker,
            'currentTab' => $tab,
            'previousBrokerId' => $previousBrokerId,
            'nextBrokerId' => $nextBrokerId,
            'totalCount' => $totalCount,
            'currentIndex' => $currentIndex
        ]);
    }
}
