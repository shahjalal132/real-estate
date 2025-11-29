<?php

namespace App\Http\Controllers;

use App\Models\Property;
use App\Services\PropertyImportService;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PropertyController extends Controller
{
    public function index(Request $request)
    {
        $section = $request->query('section');
        $filter = $request->query('filter', 'all');

        $query = Property::with(['location', 'images', 'brokers', 'details']);

        // Apply section-based filtering
        if ($section === 'residential') {
            $query->whereJsonContains('types', 'Residential')
                ->where('status', '!=', 'Sold');
        } elseif ($section === 'commercial') {
            $query->where(function ($q) {
                $q->whereJsonContains('types', 'Commercial')
                    ->orWhereJsonContains('types', 'Land')
                    ->orWhereJsonContains('types', 'Multifamily')
                    ->orWhereJsonContains('types', 'Office')
                    ->orWhereJsonContains('types', 'Retail')
                    ->orWhereJsonContains('types', 'Industrial');
            })
                ->whereJsonDoesntContain('types', 'Residential')
                ->where('status', '!=', 'Sold');
        }

        // Always exclude properties without thumbnails
        $query->whereNotNull('thumbnail_url');

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhereHas('location', function ($locQuery) use ($search) {
                        $locQuery->where('city', 'like', "%{$search}%")
                            ->orWhere('state_name', 'like', "%{$search}%")
                            ->orWhere('zip', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->has('type')) {
            $query->whereJsonContains('types', $request->input('type'));
        }

        if ($request->has('min_price')) {
            $query->where('asking_price', '>=', $request->input('min_price'));
        }

        if ($request->has('max_price')) {
            $query->where('asking_price', '<=', $request->input('max_price'));
        }

        // Sorting
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');

        if (in_array($sort, ['asking_price', 'created_at', 'name'])) {
            $query->orderBy($sort, $direction);
        }

        $properties = $query->orderBy('created_at', 'desc')->get();

        // Apply client-side filter if needed (for the filter dropdown)
        if ($filter && $filter !== 'all') {
            $filteredProperties = $properties->filter(function ($property, $index) use ($filter) {
                if ($filter === 'option1') return $index % 3 === 0;
                if ($filter === 'option2') return $index % 3 === 1;
                if ($filter === 'option3') return $index % 3 === 2;
                return true;
            });
            $properties = $filteredProperties->values();
        }

        return Inertia::render('Properties', [
            'properties' => $properties,
            'filter' => $filter,
            'section' => $section,
        ]);
    }

    public function show(Property $property)
    {
        $property->load(['location', 'details', 'brokers.brokerage', 'images']);

        return Inertia::render('Properties/Show', [
            'property' => $property,
        ]);
    }

    public function store(Request $request, PropertyImportService $importService)
    {
        // This endpoint would likely be protected and receive JSON payload
        // Validation would be needed here

        $data = $request->all();
        $property = $importService->importFromJson($data);

        return response()->json(['message' => 'Property imported successfully', 'id' => $property->id]);
    }

    public function update(Request $request, Property $property)
    {
        // Implement update logic if manual updates are allowed
    }

    public function destroy(Property $property)
    {
        $property->delete();
        return redirect()->route('properties.index');
    }

    public function auctions(Request $request)
    {
        $filter = $request->query('filter', 'all');

        $query = Property::with(['location', 'images', 'brokers', 'details'])
            ->where('status', 'On-Market')
            ->whereNotNull('thumbnail_url');

        // Apply filters
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhereHas('location', function ($locQuery) use ($search) {
                        $locQuery->where('city', 'like', "%{$search}%")
                            ->orWhere('state_name', 'like', "%{$search}%")
                            ->orWhere('zip', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->has('min_price')) {
            $query->where('asking_price', '>=', $request->input('min_price'));
        }

        if ($request->has('max_price')) {
            $query->where('asking_price', '<=', $request->input('max_price'));
        }

        // Sorting
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');

        if (in_array($sort, ['asking_price', 'created_at', 'name'])) {
            $query->orderBy($sort, $direction);
        }

        $properties = $query->orderBy('created_at', 'desc')->get();

        // Apply client-side filter if needed
        if ($filter && $filter !== 'all') {
            $filteredProperties = $properties->filter(function ($property, $index) use ($filter) {
                if ($filter === 'option1') return $index % 3 === 0;
                if ($filter === 'option2') return $index % 3 === 1;
                if ($filter === 'option3') return $index % 3 === 2;
                return true;
            });
            $properties = $filteredProperties->values();
        }

        return Inertia::render('Properties', [
            'properties' => $properties,
            'filter' => $filter,
            'section' => 'auctions',
        ]);
    }

    public function commercial(Request $request)
    {
        $filter = $request->query('filter', 'all');

        $query = Property::with(['location', 'images', 'brokers', 'details'])
            ->where(function ($query) {
                $query->whereJsonContains('types', 'Commercial')
                    ->orWhereJsonContains('types', 'Land')
                    ->orWhereJsonContains('types', 'Multifamily')
                    ->orWhereJsonContains('types', 'Office')
                    ->orWhereJsonContains('types', 'Retail')
                    ->orWhereJsonContains('types', 'Industrial');
            })
            ->where(function ($query) {
                $query->whereJsonDoesntContain('types', 'Residential');
            })
            ->where('status', '!=', 'Sold')
            ->whereNotNull('thumbnail_url');

        // Apply filters
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhereHas('location', function ($locQuery) use ($search) {
                        $locQuery->where('city', 'like', "%{$search}%")
                            ->orWhere('state_name', 'like', "%{$search}%")
                            ->orWhere('zip', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->has('type')) {
            $query->whereJsonContains('types', $request->input('type'));
        }

        if ($request->has('min_price')) {
            $query->where('asking_price', '>=', $request->input('min_price'));
        }

        if ($request->has('max_price')) {
            $query->where('asking_price', '<=', $request->input('max_price'));
        }

        // Sorting
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');

        if (in_array($sort, ['asking_price', 'created_at', 'name'])) {
            $query->orderBy($sort, $direction);
        }

        $properties = $query->orderBy('created_at', 'desc')->get();

        // Apply client-side filter if needed
        if ($filter && $filter !== 'all') {
            $filteredProperties = $properties->filter(function ($property, $index) use ($filter) {
                if ($filter === 'option1') return $index % 3 === 0;
                if ($filter === 'option2') return $index % 3 === 1;
                if ($filter === 'option3') return $index % 3 === 2;
                return true;
            });
            $properties = $filteredProperties->values();
        }

        return Inertia::render('Properties', [
            'properties' => $properties,
            'filter' => $filter,
            'section' => 'commercial',
        ]);
    }

    public function rental(Request $request)
    {
        $query = Property::with(['location', 'images', 'brokers'])
            ->where('status', '!=', 'Sold')
            ->where('status', '!=', 'On-Market')
            ->whereNotNull('thumbnail_url')
            ->where(function ($query) {
                $query->whereJsonContains('types', 'Residential')
                    ->orWhereJsonContains('types', 'Multifamily');
            });

        // Apply filters
        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where(function ($q) use ($search) {
                $q->where('name', 'like', "%{$search}%")
                    ->orWhereHas('location', function ($locQuery) use ($search) {
                        $locQuery->where('city', 'like', "%{$search}%")
                            ->orWhere('state_name', 'like', "%{$search}%")
                            ->orWhere('zip', 'like', "%{$search}%");
                    });
            });
        }

        if ($request->has('min_price')) {
            $query->where('asking_price', '>=', $request->input('min_price'));
        }

        if ($request->has('max_price')) {
            $query->where('asking_price', '<=', $request->input('max_price'));
        }

        // Sorting
        $sort = $request->input('sort', 'created_at');
        $direction = $request->input('direction', 'desc');

        if (in_array($sort, ['asking_price', 'created_at', 'name'])) {
            $query->orderBy($sort, $direction);
        }

        $properties = $query->paginate(12)->withQueryString();

        return Inertia::render('Properties/Rental', [
            'properties' => $properties,
            'filters' => $request->only(['search', 'min_price', 'max_price', 'sort', 'direction']),
        ]);
    }
}
