<?php

namespace App\Http\Controllers;

use App\Traits\FiltersProperties;
use App\Models\Property;
use Illuminate\Http\Request;
use Inertia\Inertia;

class HomeController extends Controller
{
    use FiltersProperties;

    private const FEATURED_LIMIT = 12;

    public function index(Request $request)
    {
        $hasFilters = $this->hasFilterParameters($request);
        $section = $request->query('section', 'residential'); // Default to residential
        $staticContent = $this->getStaticContent();

        return Inertia::render('Home', array_merge([
            'hasFilters' => $hasFilters,
            'filterSection' => $hasFilters ? $section : null,
            'featuredAuctions' => $this->getFeaturedAuctions($request, $hasFilters, $section),
            'featuredResidential' => $this->getFeaturedResidential($request, $hasFilters, $section),
            'featuredCommercial' => $this->getFeaturedCommercial($request, $hasFilters, $section),
        ], $staticContent));
    }
    /**
     * Get featured auction properties (On-Market status)
     */
    private function getFeaturedAuctions(Request $request = null, bool $hasFilters = false, string $section = 'residential')
    {
        $query = Property::with(['location', 'images', 'brokers.brokerage', 'details'])
            ->where('status', 'On-Market')
            ->whereNotNull('thumbnail_url');

        // Apply filters if request has filter parameters and section is auctions
        if ($request && $hasFilters && $section === 'auctions') {
            $query = $this->applyFilters($query, $request);
        }

        $query->orderBy('created_at', 'desc');

        // If filters are applied for auctions section, return all results without limit
        if ($hasFilters && $section === 'auctions') {
            return $query->get();
        }

        // Otherwise, limit to featured limit and only show if not filtering
        if ($hasFilters && $section !== 'auctions') {
            return collect([]); // Return empty if filtering another section
        }

        return $query->limit(self::FEATURED_LIMIT)->get();
    }

    /**
     * Get featured residential properties (properties with "Residential" type)
     */
    private function getFeaturedResidential(Request $request = null, bool $hasFilters = false, string $section = 'residential')
    {
        $query = Property::with(['location', 'images', 'brokers.brokerage', 'details'])
            ->where(function ($query) {
                $query->whereJsonContains('types', 'Residential')
                    ->orWhereJsonContains('types', 'Multifamily');
            })
            ->where('status', '!=', 'Sold')
            ->whereNotNull('thumbnail_url');

        // Apply filters if request has filter parameters and section is residential
        if ($request && $hasFilters && $section === 'residential') {
            $query = $this->applyFilters($query, $request);
        }

        $query->orderBy('created_at', 'desc');

        // If filters are applied for residential section, return all results without limit
        if ($hasFilters && $section === 'residential') {
            return $query->get();
        }

        // Otherwise, limit to featured limit and only show if not filtering
        if ($hasFilters && $section !== 'residential') {
            return collect([]); // Return empty if filtering another section
        }

        return $query->limit(self::FEATURED_LIMIT)->get();
    }


    /**
     * Get featured commercial properties (Commercial types excluding Residential)
     */
    private function getFeaturedCommercial(Request $request = null, bool $hasFilters = false, string $section = 'residential')
    {
        $query = Property::with(['location', 'images', 'brokers.brokerage', 'details'])
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

        // Apply filters if request has filter parameters and section is commercial
        if ($request && $hasFilters && $section === 'commercial') {
            $query = $this->applyFilters($query, $request);
        }

        $query->orderBy('created_at', 'desc');

        // If filters are applied for commercial section, return all results without limit
        if ($hasFilters && $section === 'commercial') {
            return $query->get();
        }

        // Otherwise, limit to featured limit and only show if not filtering
        if ($hasFilters && $section !== 'commercial') {
            return collect([]); // Return empty if filtering another section
        }

        return $query->limit(self::FEATURED_LIMIT)->get();
    }

    /**
     * Get static content configuration
     */
    private function getStaticContent(): array
    {
        return [
            'heroContent' => [
                'title' => 'Discover Your New Home',
                'subtitle' => 'Helping 100 million renters find their perfect fit.',
                'searchPlaceholder' => 'Enter Location, Broker/Agent, Tenant, Keyword',
                'backgroundImage' => 'https://images.pexels.com/photos/1396132/pexels-photo-1396132.jpeg',
            ],
            'statistics' => [
                [
                    'icon' => 'users',
                    'number' => '100,000+',
                    'title' => 'Investors',
                    'description' => 'Our platform has grown to over 100,000 active investors, creating the largest network of qualified buyers in commercial real estate.',
                    'ctaText' => 'View investor network',
                    'ctaLink' => '/investors',
                ],
                [
                    'icon' => 'trending-up',
                    'number' => '$5B+',
                    'title' => 'Transacted',
                    'description' => 'Total transaction volume exceeds $5 billion, demonstrating the platform\'s ability to facilitate large-scale commercial real estate deals.',
                    'ctaText' => 'See transaction data',
                    'ctaLink' => '/transactions',
                ],
                [
                    'icon' => 'bar-chart',
                    'number' => '75%',
                    'title' => 'Industry Leading Trade Rate',
                    'description' => 'Our auction platform achieves a 75% trade rate, significantly higher than industry averages, ensuring successful property sales.',
                    'ctaText' => 'Learn about our success',
                    'ctaLink' => '/success-stories',
                ],
            ],
            'features' => [
                [
                    'icon' => '📄',
                    'title' => 'PROMOTE PRIME ASSETS WITH CLASSIC AUCTIONS',
                    'description' => 'Showcase your premium properties',
                ],
                [
                    'icon' => '📢',
                    'title' => 'FAST-TRACK TRADES WITH ABSOLUTE AUCTIONS',
                    'description' => 'Real-time auction management',
                ],
                [
                    'icon' => '⚙️',
                    'title' => 'TAILOR YOUR TACTICS WITH CUSTOM AUCTIONS',
                    'description' => 'Customizable auction strategies',
                ],
                [
                    'icon' => '🏢',
                    'title' => 'CENTRALIZE SALES WITH MARKETPLACE LISTINGS',
                    'description' => 'Unified sales platform',
                ],
            ],
            'news' => [
                ['title' => '2026 Auction Calendar Is Here', 'slug' => '2026-auction-calendar'],
                ['title' => '2025 Mid-Year Auction Report', 'slug' => '2025-mid-year-auction-report'],
                ['title' => 'Auctions 101 with Steven Silverman', 'slug' => 'auctions-101-steven-silverman'],
                ['title' => 'The 2025 Auction Calendar Is Here', 'slug' => '2025-auction-calendar'],
                ['title' => 'Q2 CRE Auction Report - Latest Stats from Around the Country', 'slug' => 'q2-cre-auction-report'],
                ['title' => 'Q1 CRE Auction Report - Vital Insights from the Midwest and Beyond', 'slug' => 'q1-cre-auction-report'],
            ],
            'testimonials' => [
                [
                    'quote' => 'The platform provides an incredible volume of transactions and the technology makes it seamless.',
                    'author' => 'Johan Moschki',
                    'title' => 'SRGSCG',
                ],
                [
                    'quote' => 'We successfully sold our property through the platform with great results.',
                    'author' => 'Deborah A. Nemec',
                    'title' => 'PRESIDENT NEMEC PROPERTIES INC.',
                ],
                [
                    'quote' => 'The marketing exposure and transaction efficiency exceeded our expectations.',
                    'author' => 'David Hoppe',
                    'title' => 'INVESTMENT ADVISOR ATLANTIC RETH',
                ],
            ],
            'ctaBanner' => [
                'title' => 'Have a Question ?',
                'description' => 'Give us a call or fill out the contact form and we will get back to you as soon as possible.',
                'buttonText' => 'Contact Us',
                'buttonLink' => '/contact',
            ],
            'marketplaceExplainer' => [
                'title' => "WHAT IS\nR MARKETPLACE?",
                'subtitle' => 'The auction platform with the highest trade rate in the industry - explained',
                'videoUrl' => null,
                'videoThumbnail' => null,
            ],
            'dataPowered' => [
                'title' => 'Data-Powered Investing',
                'description' => 'Gain an advantage over competitors. With data-backed market insights, real-time property valuations, industry news, and more, we\'ll help you make smarter decisions.',
                'ctaText' => 'EXPLORE INSIGHTS',
                'ctaLink' => '/insights',
            ],
        ];
    }
}
