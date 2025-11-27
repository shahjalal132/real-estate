<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PropertyLocation extends Model
{
    protected $fillable = [
        'property_id',
        'address',
        'city',
        'county',
        'state_code',
        'state_name',
        'zip',
        'latitude',
        'longitude',
        'full_address',
    ];

    protected $casts = [
        'latitude' => 'decimal:8',
        'longitude' => 'decimal:8',
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }
}
