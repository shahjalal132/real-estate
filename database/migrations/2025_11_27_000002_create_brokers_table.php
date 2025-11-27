<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('brokers', function (Blueprint $table) {
            $table->id();
            $table->foreignId('brokerage_id')->constrained()->onDelete('cascade');
            $table->string('external_id')->unique(); // Crexi broker ID
            $table->string('global_id')->unique();
            $table->string('first_name');
            $table->string('last_name');
            $table->string('phone')->nullable();
            $table->string('email');
            $table->string('thumbnail_url')->nullable();
            $table->string('public_profile_id')->nullable();
            $table->json('licenses')->nullable();
            $table->json('badges')->nullable();
            $table->integer('number_of_assets')->default(0);
            $table->boolean('is_platinum')->default(false);
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('brokers');
    }
};
