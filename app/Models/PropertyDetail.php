<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PropertyDetail extends Model
{
    protected $fillable = [
        'property_id',
        'zoning',
        'lot_size_acres',
        'price_per_acre',
        'investment_highlights',
        'summary_details',
        'subtypes',
        'investment_type',
        'investment_sub_type',
        'class',
        'lease_type',
        'tenancy',
        'lease_expiration',
        'ground_lease',
        'net_rentable_sqft',
        'cap_rate',
        'pro_forma_noi',
        'price_per_unit',
        'occupancy_date',
        'parking_spaces',
        'ceiling_height',
        'ownership',
        'sale_condition',
    ];

    protected $casts = [
        'summary_details' => 'array',
        'subtypes' => 'array',
        'lot_size_acres' => 'decimal:2',
        'net_rentable_sqft' => 'decimal:2',
        'cap_rate' => 'decimal:2',
        'pro_forma_noi' => 'decimal:2',
        'price_per_unit' => 'decimal:2',
        'ground_lease' => 'boolean',
        'lease_expiration' => 'date',
        'occupancy_date' => 'date',
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }
}
