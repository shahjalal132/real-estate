<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('todo_tasks', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('title');
            $table->string('due_date')->nullable();
            $table->string('project')->nullable()->default('Tasks to get done');
            $table->boolean('is_completed')->default(false);
            $table->string('status')->default('todo');
            $table->string('priority')->nullable();
            $table->json('collaborators')->nullable();
            $table->string('visibility')->default('Only me');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('todo_tasks');
    }
};
