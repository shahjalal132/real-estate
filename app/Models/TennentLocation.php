<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TennentLocation extends Model
{
    protected $fillable = [
        'address',
        'city',
        'state',
        'country',
        'tenant_name',
        'sf_occupied',
        'floor',
        'space_use',
        'moved_in',
        'commencement',
        'expiration',
        'percent_of_building',
        'occupancy_type',
        'rent_per_sf_year',
        'rent_type',
        'employees',
        'sf_per_employee',
        'industry',
        'star_rating',
        'green_rating',
        'building_name',
        'building_park',
        'center_name',
        'property_type',
        'secondary_type',
        'center_type',
        'market',
        'submarket',
        'location_type',
        'landlord',
        'landlord_representative',
        'tenant_representative',
        'best_tenant_contact',
        'best_tenant_phone',
        'location_phone',
        'website',
        'future_move',
        'future_move_type',
        'signed',
        'suite',
        'zip',
        'time_in_building',
        'store_type',
        'naics',
        'sic',
        'property_id',
    ];

    protected $casts = [
        'sf_occupied' => 'decimal:2',
        'moved_in' => 'date',
        'commencement' => 'date',
        'expiration' => 'date',
        'percent_of_building' => 'decimal:2',
        'rent_per_sf_year' => 'decimal:2',
        'employees' => 'integer',
        'sf_per_employee' => 'decimal:2',
        'star_rating' => 'integer',
        'future_move' => 'date',
        'signed' => 'date',
        'property_id' => 'integer',
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }

    public function company(): BelongsTo
    {
        return $this->belongsTo(TennentCompany::class, 'tenant_name', 'tenant_name');
    }
}
