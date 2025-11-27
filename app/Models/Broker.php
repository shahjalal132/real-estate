<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;

class Broker extends Model
{
    protected $fillable = [
        'brokerage_id',
        'external_id',
        'global_id',
        'first_name',
        'last_name',
        'phone',
        'email',
        'thumbnail_url',
        'public_profile_id',
        'licenses',
        'badges',
        'number_of_assets',
        'is_platinum',
    ];

    protected $casts = [
        'licenses' => 'array',
        'badges' => 'array',
        'is_platinum' => 'boolean',
    ];

    public function brokerage(): BelongsTo
    {
        return $this->belongsTo(Brokerage::class);
    }

    public function properties(): BelongsToMany
    {
        return $this->belongsToMany(Property::class);
    }

    public function getFullNameAttribute(): string
    {
        return "{$this->first_name} {$this->last_name}";
    }
}
