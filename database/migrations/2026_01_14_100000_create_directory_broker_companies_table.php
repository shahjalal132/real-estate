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
        Schema::create('directory_broker_companies', function (Blueprint $table) {
            $table->id();
            $table->string('company')->nullable();
            $table->string('specialty')->nullable();
            $table->string('hq_market')->nullable();
            $table->string('hq_city')->nullable();
            $table->string('hq_state')->nullable();
            $table->string('hq_country')->nullable();
            $table->string('website')->nullable();
            $table->integer('employees')->nullable();
            $table->integer('locations')->nullable();
            $table->integer('managed_properties')->nullable();
            $table->integer('owned_properties')->nullable();
            $table->integer('operated_properties')->nullable();
            
            // Lease metrics
            $table->bigInteger('lease_transactions_3y')->nullable();
            $table->bigInteger('lease_transactions_sf_3y')->nullable();
            $table->bigInteger('lease_listings')->nullable();
            $table->bigInteger('lease_listings_portfolio_sf')->nullable();
            $table->bigInteger('lease_listings_available_sf')->nullable();

            // Sale metrics
            $table->bigInteger('sale_transactions_3y')->nullable();
            $table->bigInteger('sale_transactions_sf_3y')->nullable();
            $table->decimal('sale_transactions_volume_3y', 20, 2)->nullable(); // Increased precision too
            $table->bigInteger('sale_listings')->nullable();
            $table->bigInteger('sale_listings_sf')->nullable();

            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('directory_broker_companies');
    }
};
