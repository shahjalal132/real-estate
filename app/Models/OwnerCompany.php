<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class OwnerCompany extends Model
{
    protected $fillable = [
        'company',
        'hierarchy',
        'owner_type',
        'hq_city',
        'hq_state',
        'hq_country',
        'properties',
        'portfolio_sf',
        'average_sf',
        'apt_units',
        'hotel_rooms',
        'land_acre',
        'main_property_type',
        'sf_delivered_24_months',
        'sf_under_construction',
        'continental_focus',
        'primary_country',
        'territory',
        'sale_listings',
        'sale_listings_value',
        'acquisitions_24_months',
        'dispositions_24_months',
    ];

    protected $casts = [
        'properties' => 'integer',
        'portfolio_sf' => 'decimal:2',
        'average_sf' => 'decimal:2',
        'apt_units' => 'integer',
        'hotel_rooms' => 'integer',
        'land_acre' => 'decimal:2',
        'sf_delivered_24_months' => 'decimal:2',
        'sf_under_construction' => 'decimal:2',
        'sale_listings' => 'integer',
        'sale_listings_value' => 'decimal:2',
        'acquisitions_24_months' => 'decimal:2',
        'dispositions_24_months' => 'decimal:2',
    ];
}
