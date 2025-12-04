<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsToMany;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Property extends Model
{
    protected $fillable = [
        'external_id',
        'name',
        'description',
        'marketing_description',
        'asking_price',
        'status',
        'types',
        'subtypes',
        'url_slug',
        'external_url',
        'thumbnail_url',
        'number_of_images',
        'has_flyer',
        'has_video',
        'has_virtual_tour',
        'is_in_opportunity_zone',
        'activated_on',
        'external_updated_on',
    ];

    protected $casts = [
        'types' => 'array',
        'subtypes' => 'array',
        'has_flyer' => 'boolean',
        'has_video' => 'boolean',
        'has_virtual_tour' => 'boolean',
        'is_in_opportunity_zone' => 'boolean',
        'asking_price' => 'decimal:2',
        'activated_on' => 'datetime',
        'external_updated_on' => 'datetime',
    ];

    public function location(): HasOne
    {
        return $this->hasOne(PropertyLocation::class);
    }

    public function details(): HasOne
    {
        return $this->hasOne(PropertyDetail::class);
    }

    public function brokers(): BelongsToMany
    {
        return $this->belongsToMany(Broker::class, 'broker_property', 'property_id', 'broker_id');
    }

    public function images(): HasMany
    {
        return $this->hasMany(PropertyImage::class)->orderBy('position');
    }

    public function getFormattedPriceAttribute(): string
    {
        return '$' . number_format($this->asking_price, 2);
    }
}
