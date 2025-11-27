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
        $query = Property::with(['location', 'images']);

        if ($request->has('search')) {
            $search = $request->input('search');
            $query->where('name', 'like', "%{$search}%")
                  ->orWhereHas('location', function ($q) use ($search) {
                      $q->where('city', 'like', "%{$search}%")
                        ->orWhere('state_name', 'like', "%{$search}%")
                        ->orWhere('zip', 'like', "%{$search}%");
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

        $properties = $query->paginate(12)->withQueryString();

        return Inertia::render('Properties/Index', [
            'properties' => $properties,
            'filters' => $request->only(['search', 'type', 'min_price', 'max_price', 'sort', 'direction']),
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
}
