<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class TennentCompany extends Model
{
    protected $fillable = [
        'tenant_name',
        'industry',
        'territory',
        'hq_market',
        'locations',
        'sf_occupied',
        'highest_use_by_sf',
        'employees',
        'growth',
        'revenue',
        'credit_rating',
        'established',
        'parent_company',
        'website',
        'hq_phone',
        'hq_city',
        'hq_state',
        'hq_postal_code',
        'hq_country',
        'naics',
        'sic',
    ];

    protected $casts = [
        'locations' => 'integer',
        'sf_occupied' => 'decimal:2',
        'employees' => 'integer',
        'revenue' => 'decimal:2',
        'established' => 'integer',
    ];

    public function locations(): HasMany
    {
        return $this->hasMany(TennentLocation::class, 'tenant_name', 'tenant_name');
    }
}
