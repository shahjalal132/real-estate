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
        Schema::table('todo_tasks', function (Blueprint $table) {
            // Change due_date from string to date if possible, but SQLite doesn't easily support column type changes without doctrine/dbal.
            // Let's add the new columns:
            $table->text('description')->nullable()->after('title');
            $table->foreignId('project_id')->nullable()->after('id')->constrained('todo_projects')->nullOnDelete();
            $table->integer('position')->default(0)->after('visibility');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('todo_tasks', function (Blueprint $table) {
            $table->dropForeign(['project_id']);
            $table->dropColumn(['description', 'project_id', 'position']);
        });
    }
};
