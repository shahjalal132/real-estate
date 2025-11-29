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
        $featuredAuctions = Property::with(['location', 'images', 'brokers', 'details'])
            ->where('status', 'On-Market')
            ->whereNotNull('thumbnail_url')
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        // Fetch featured residential properties - properties with "Residential" in types array
        $featuredResidential = Property::with(['location', 'images', 'brokers', 'details'])
            ->whereJsonContains('types', 'Residential')
            ->where('status', '!=', 'Sold')
            ->whereNotNull('thumbnail_url')
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        // Fetch featured commercial properties - Commercial, Land, Multifamily, Office, Retail, Industrial
        // Exclude Residential properties
        $featuredCommercial = Property::with(['location', 'images', 'brokers', 'details'])
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
            ->whereNotNull('thumbnail_url')
            ->orderBy('created_at', 'desc')
            ->limit(12)
            ->get();

        // Hero section content
        $heroContent = [
            'title' => 'Discover Your New Home',
            'subtitle' => 'Helping 100 million renters find their perfect fit.',
            'searchPlaceholder' => 'Chicago, IL',
            'backgroundImage' => 'https://images.pexels.com/photos/772472/pexels-photo-772472.jpeg',
        ];

        // Statistics data
        $statistics = [
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
        ];

        // Features data
        $features = [
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
        ];

        // News items
        $news = [
            ['title' => '2026 Auction Calendar Is Here', 'slug' => '2026-auction-calendar'],
            ['title' => '2025 Mid-Year Auction Report', 'slug' => '2025-mid-year-auction-report'],
            ['title' => 'Auctions 101 with Steven Silverman', 'slug' => 'auctions-101-steven-silverman'],
            ['title' => 'The 2025 Auction Calendar Is Here', 'slug' => '2025-auction-calendar'],
            ['title' => 'Q2 CRE Auction Report - Latest Stats from Around the Country', 'slug' => 'q2-cre-auction-report'],
            ['title' => 'Q1 CRE Auction Report - Vital Insights from the Midwest and Beyond', 'slug' => 'q1-cre-auction-report'],
        ];

        // Testimonials
        $testimonials = [
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
        ];

        // CTA Banner content
        $ctaBanner = [
            'title' => 'Have a Question ?',
            'description' => 'Give us a call or fill out the contact form and we will get back to you as soon as possible.',
            'buttonText' => 'Contact Us',
            'buttonLink' => '/contact',
        ];

        // Marketplace Explainer content
        $marketplaceExplainer = [
            'title' => "WHAT IS\nR MARKETPLACE?",
            'subtitle' => 'The auction platform with the highest trade rate in the industry - explained',
            'videoUrl' => null, // Can be added later
            'videoThumbnail' => null,
        ];

        // Data Powered section content
        $dataPowered = [
            'title' => 'Data-Powered Investing',
            'description' => 'Gain an advantage over competitors. With data-backed market insights, real-time property valuations, industry news, and more, we\'ll help you make smarter decisions.',
            'ctaText' => 'EXPLORE INSIGHTS',
            'ctaLink' => '/insights',
        ];

        return Inertia::render('Home', [
            'featuredAuctions' => $featuredAuctions,
            'featuredResidential' => $featuredResidential,
            'featuredCommercial' => $featuredCommercial,
            'heroContent' => $heroContent,
            'statistics' => $statistics,
            'features' => $features,
            'news' => $news,
            'testimonials' => $testimonials,
            'ctaBanner' => $ctaBanner,
            'marketplaceExplainer' => $marketplaceExplainer,
            'dataPowered' => $dataPowered,
        ]);
    }
}
