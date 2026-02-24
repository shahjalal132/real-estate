<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class CalendarEvent extends Model
{
    protected $fillable = [
        'user_id',
        'title',
        'type',
        'start_at',
        'end_at',
        'location',
        'description',
        'attendees',
    ];

    protected $casts = [
        'start_at' => 'datetime',
        'end_at' => 'datetime',
        'attendees' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
