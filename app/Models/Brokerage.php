<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Brokerage extends Model
{
    protected $fillable = [
        'name',
        'logo_url',
        'website',
        'address',
        'city',
        'state_code',
        'zip',
    ];

    public function brokers(): HasMany
    {
        return $this->hasMany(Broker::class);
    }
}
