<?php

namespace App\Http\Controllers;

use App\Models\SavedSearch;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class SavedSearchController extends Controller
{
    /**
     * Display a listing of saved searches for the authenticated user.
     */
    public function index()
    {
        $savedSearches = Auth::user()->savedSearches()
            ->orderBy('created_at', 'desc')
            ->get();

        return response()->json($savedSearches);
    }

    /**
     * Store a newly created saved search.
     */
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'nullable|string|max:255',
            'email_alerts' => 'boolean',
            'filters' => 'required|array',
        ]);

        $savedSearch = Auth::user()->savedSearches()->create([
            'name' => $request->input('name'),
            'email_alerts' => $request->input('email_alerts', true),
            'filters' => $request->input('filters'),
            // Store individual filter fields for easier querying
            'location' => $request->input('filters.location'),
            'keywords' => $request->input('filters.keywords'),
            'property_types' => $request->input('filters.propertyTypes'),
            'min_price' => $request->input('filters.minPrice'),
            'max_price' => $request->input('filters.maxPrice'),
            'exclude_unpriced' => $request->input('filters.excludeUnpriced', false),
            'min_cap_rate' => $request->input('filters.minCapRate'),
            'max_cap_rate' => $request->input('filters.maxCapRate'),
            'tenant_brand' => $request->input('filters.tenantBrand'),
            'remaining_term' => $request->input('filters.remainingTerm'),
            'broker_agent' => $request->input('filters.brokerAgent'),
            'brokerage_shop' => $request->input('filters.brokerageShop'),
            'tenancy' => $request->input('filters.tenancy'),
            'lease_type' => $request->input('filters.leaseType'),
            'measurement_type' => $request->input('filters.measurementType'),
            'min_units' => $request->input('filters.minUnits'),
            'max_units' => $request->input('filters.maxUnits'),
            'min_sqft' => $request->input('filters.minSqft'),
            'max_sqft' => $request->input('filters.maxSqft'),
            'min_price_per_sqft' => $request->input('filters.minPricePerSqft'),
            'max_price_per_sqft' => $request->input('filters.maxPricePerSqft'),
            'min_acres' => $request->input('filters.minAcres'),
            'max_acres' => $request->input('filters.maxAcres'),
            'tenant_credit' => $request->input('filters.tenantCredit'),
            'min_occupancy' => $request->input('filters.minOccupancy'),
            'max_occupancy' => $request->input('filters.maxOccupancy'),
            'timeline_type' => $request->input('filters.timelineType'),
            'from_date' => $request->input('filters.fromDate'),
            'to_date' => $request->input('filters.toDate'),
            'time_period' => $request->input('filters.timePeriod'),
            'listing_status' => $request->input('filters.listingStatus'),
            'opportunity_zone' => $request->input('filters.opportunityZone', false),
            'property_class' => $request->input('filters.propertyClass'),
            'broker_agent_co_op' => $request->input('filters.brokerAgentCoOp', false),
            'owner_user' => $request->input('filters.ownerUser', false),
        ]);

        return response()->json([
            'message' => 'Search saved successfully',
            'saved_search' => $savedSearch,
        ], 201);
    }

    /**
     * Update the specified saved search.
     */
    public function update(Request $request, SavedSearch $savedSearch)
    {
        // Ensure the saved search belongs to the authenticated user
        if ($savedSearch->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $request->validate([
            'name' => 'nullable|string|max:255',
            'email_alerts' => 'boolean',
        ]);

        $savedSearch->update([
            'name' => $request->input('name'),
            'email_alerts' => $request->input('email_alerts', true),
        ]);

        return response()->json([
            'message' => 'Search updated successfully',
            'saved_search' => $savedSearch,
        ]);
    }

    /**
     * Remove the specified saved search.
     */
    public function destroy(SavedSearch $savedSearch)
    {
        // Ensure the saved search belongs to the authenticated user
        if ($savedSearch->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        $savedSearch->delete();

        return response()->json(['message' => 'Search deleted successfully']);
    }

    /**
     * Apply a saved search (return the filters to be used in property search).
     */
    public function apply(SavedSearch $savedSearch)
    {
        // Ensure the saved search belongs to the authenticated user
        if ($savedSearch->user_id !== Auth::id()) {
            return response()->json(['message' => 'Unauthorized'], 403);
        }

        return response()->json([
            'filters' => $savedSearch->filters,
        ]);
    }
}
