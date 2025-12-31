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
        Schema::create('owner_funds', function (Blueprint $table) {
            $table->id();
            $table->string('fund_name');
            $table->string('hierarchy')->nullable();
            $table->string('owner_type')->nullable();
            $table->string('hq_city')->nullable();
            $table->string('hq_state')->nullable();
            $table->string('hq_country')->nullable();
            $table->integer('properties')->nullable();
            $table->decimal('portfolio_sf', 15, 2)->nullable();
            $table->decimal('average_sf', 15, 2)->nullable();
            $table->integer('apt_units')->nullable();
            $table->integer('hotel_rooms')->nullable();
            $table->decimal('land_acre', 15, 2)->nullable();
            $table->string('main_property_type')->nullable();
            $table->decimal('sf_delivered_24_months', 15, 2)->nullable();
            $table->decimal('sf_under_construction', 15, 2)->nullable();
            $table->string('continental_focus')->nullable();
            $table->string('primary_country')->nullable();
            $table->string('territory')->nullable();
            $table->integer('sale_listings')->nullable();
            $table->decimal('sale_listings_value', 15, 2)->nullable();
            $table->decimal('acquisitions_24_months', 15, 2)->nullable();
            $table->decimal('dispositions_24_months', 15, 2)->nullable();
            $table->timestamps();
            
            $table->index('fund_name');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('owner_funds');
    }
};
