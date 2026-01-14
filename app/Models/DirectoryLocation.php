<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class DirectoryLocation extends Model
{
    use HasFactory;

    protected $fillable = [
        'company',
        'specialty',
        'building_name',
        'address',
        'city',
        'state',
        'postal_code',
        'country',
        'website',
        'location_employees',
        'lease_transactions_3y',
        'lease_transactions_sf_3y',
        'lease_listings',
        'lease_listings_portfolio_sf',
        'lease_listings_available_sf',
        'sale_transactions_3y',
        'sale_transactions_sf_3y',
        'sale_transactions_volume_3y',
        'sale_listings',
        'sale_listings_sf',
    ];
}
