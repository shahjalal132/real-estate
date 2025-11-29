<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('properties', function (Blueprint $table) {
            $table->id();
            $table->bigInteger('external_id')->unique(); // Crexi property ID
            $table->string('name');
            $table->text('description')->nullable();
            $table->longText('marketing_description')->nullable();
            $table->decimal('asking_price', 15, 2);
            $table->string('status'); // On-Market, Sold, etc.
            $table->json('types'); // e.g., ['Land']
            $table->json('subtypes')->nullable(); // e.g., ['Commercial']
            $table->string('url_slug');
            $table->string('external_url')->nullable();
            $table->string('thumbnail_url')->nullable();
            $table->integer('number_of_images')->default(0);
            $table->boolean('has_flyer')->default(false);
            $table->boolean('has_video')->default(false);
            $table->boolean('has_virtual_tour')->default(false);
            $table->boolean('is_in_opportunity_zone')->default(false);
            $table->timestamp('activated_on')->nullable();
            $table->timestamp('external_updated_on')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('properties');
    }
};
