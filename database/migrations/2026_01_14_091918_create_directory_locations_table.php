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
        Schema::create('directory_locations', function (Blueprint $table) {
            $table->id();
            $table->string('company')->nullable();
            $table->string('specialty')->nullable();
            $table->string('building_name')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('country')->nullable();
            $table->string('website')->nullable();
            
            $table->integer('location_employees')->default(0);

            $table->integer('lease_transactions_3y')->default(0);
            $table->integer('lease_transactions_sf_3y')->default(0);
            $table->integer('lease_listings')->default(0);
            $table->integer('lease_listings_portfolio_sf')->default(0);
            $table->integer('lease_listings_available_sf')->default(0);

            $table->integer('sale_transactions_3y')->default(0);
            $table->integer('sale_transactions_sf_3y')->default(0);
            $table->bigInteger('sale_transactions_volume_3y')->default(0);
            $table->integer('sale_listings')->default(0);
            $table->integer('sale_listings_sf')->default(0);

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('directory_locations');
    }
};
