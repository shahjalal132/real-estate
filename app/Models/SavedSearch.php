<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class SavedSearch extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'name',
        'email_alerts',
        'filters',
        'location',
        'keywords',
        'property_types',
        'min_price',
        'max_price',
        'exclude_unpriced',
        'min_cap_rate',
        'max_cap_rate',
        'tenant_brand',
        'remaining_term',
        'broker_agent',
        'brokerage_shop',
        'tenancy',
        'lease_type',
        'measurement_type',
        'min_units',
        'max_units',
        'min_sqft',
        'max_sqft',
        'min_price_per_sqft',
        'max_price_per_sqft',
        'min_acres',
        'max_acres',
        'tenant_credit',
        'min_occupancy',
        'max_occupancy',
        'timeline_type',
        'from_date',
        'to_date',
        'time_period',
        'listing_status',
        'opportunity_zone',
        'property_class',
        'broker_agent_co_op',
        'owner_user',
    ];

    protected $casts = [
        'filters' => 'array',
        'property_types' => 'array',
        'remaining_term' => 'array',
        'listing_status' => 'array',
        'property_class' => 'array',
        'email_alerts' => 'boolean',
        'exclude_unpriced' => 'boolean',
        'opportunity_zone' => 'boolean',
        'broker_agent_co_op' => 'boolean',
        'owner_user' => 'boolean',
        'from_date' => 'date',
        'to_date' => 'date',
    ];

    /**
     * Get the user that owns the saved search.
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
