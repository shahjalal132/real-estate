<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class TodoTask extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'title',
        'due_date',
        'project',
        'is_completed',
        'status',
        'priority',
        'collaborators',
        'visibility',
    ];

    protected $casts = [
        'is_completed' => 'boolean',
        'collaborators' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }
}
