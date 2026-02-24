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
        'description',
        'due_date',
        'project',
        'project_id',
        'is_completed',
        'status',
        'priority',
        'collaborators',
        'visibility',
        'position',
    ];

    protected $casts = [
        'is_completed' => 'boolean',
        'collaborators' => 'array',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    public function project(): BelongsTo
    {
        return $this->belongsTo(TodoProject::class, 'project_id');
    }
}
