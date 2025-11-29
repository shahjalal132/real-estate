<?php

namespace App\Http\Controllers;

use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    public function index(Request $request)
    {
        // Fetch featured auctions - properties with status "On-Market"
        // These are active listings ready for bidding/auction
        $featuredAuctions = Property::with(['location', 'images', 'brokers'])
            ->where('status', 'On-Market')
            ->whereNotNull('thumbnail_url')
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();

        // Fetch featured residential properties - properties with "Residential" in types array
        // Exclude properties already shown in auctions (On-Market status)
        $featuredResidential = Property::with(['location', 'images', 'brokers'])
            ->whereJsonContains('types', 'Residential')
            ->where('status', '!=', 'On-Market')
            ->where('status', '!=', 'Sold')
            ->whereNotNull('thumbnail_url')
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();

        // Fetch featured commercial properties - Commercial, Land, Multifamily, Office, Retail, Industrial
        // Exclude Residential properties and properties already shown in auctions
        $featuredCommercial = Property::with(['location', 'images', 'brokers'])
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
            ->where('status', '!=', 'On-Market')
            ->where('status', '!=', 'Sold')
            ->whereNotNull('thumbnail_url')
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();

        // Fetch featured rental properties - properties available for lease/rent
        // This could be properties with specific status or types indicating rental
        $featuredRental = Property::with(['location', 'images', 'brokers'])
            ->where('status', '!=', 'Sold')
            ->where('status', '!=', 'On-Market')
            ->whereNotNull('thumbnail_url')
            ->where(function ($query) {
                // Properties that might be for rent (you can adjust this logic)
                $query->whereJsonContains('types', 'Residential')
                    ->orWhereJsonContains('types', 'Multifamily');
            })
            ->orderBy('created_at', 'desc')
            ->limit(8)
            ->get();

        return Inertia::render('Home', [
            'featuredAuctions' => $featuredAuctions,
            'featuredResidential' => $featuredResidential,
            'featuredCommercial' => $featuredCommercial,
            'featuredRental' => $featuredRental,
        ]);
    }
}
