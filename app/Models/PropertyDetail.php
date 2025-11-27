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
    ];

    protected $casts = [
        'summary_details' => 'array',
        'subtypes' => 'array',
        'lot_size_acres' => 'decimal:2',
    ];

    public function property(): BelongsTo
    {
        return $this->belongsTo(Property::class);
    }
}
