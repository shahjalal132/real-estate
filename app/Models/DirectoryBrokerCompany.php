<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DirectoryBrokerCompany extends Model
{
    use HasFactory;

    protected $guarded = [];

    protected $casts = [
        'employees' => 'integer',
        'locations' => 'integer',
        'managed_properties' => 'integer',
        'owned_properties' => 'integer',
        'operated_properties' => 'integer',
        'lease_transactions_3y' => 'integer',
        'lease_transactions_sf_3y' => 'integer',
        'lease_listings' => 'integer',
        'lease_listings_portfolio_sf' => 'integer',
        'lease_listings_available_sf' => 'integer',
        'sale_transactions_3y' => 'integer',
        'sale_transactions_sf_3y' => 'integer',
        'sale_transactions_volume_3y' => 'decimal:2',
        'sale_listings' => 'integer',
        'sale_listings_sf' => 'integer',
    ];
}
