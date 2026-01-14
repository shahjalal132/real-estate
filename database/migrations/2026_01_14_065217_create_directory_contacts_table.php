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
        Schema::create('directory_contacts', function (Blueprint $table) {
            $table->id();
            $table->string('name')->nullable();
            $table->string('company')->nullable();
            $table->string('title')->nullable();
            $table->text('specialty')->nullable();
            $table->text('property_type_focus')->nullable();
            $table->string('phone')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('email')->nullable();
            $table->string('building_name')->nullable();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('postal_code')->nullable();
            $table->string('country')->nullable();
            $table->string('website')->nullable();
            $table->integer('lease_transactions_3y')->nullable();
            $table->decimal('lease_transactions_sf_3y', 15, 2)->nullable();
            $table->integer('lease_listings')->nullable();
            $table->decimal('lease_listings_portfolio_sf', 15, 2)->nullable();
            $table->decimal('lease_listings_available_sf', 15, 2)->nullable();
            $table->integer('sale_transactions_3y')->nullable();
            $table->decimal('sale_transactions_sf_3y', 15, 2)->nullable();
            $table->decimal('sale_transactions_volume_3y', 15, 2)->nullable();
            $table->integer('sale_listings')->nullable();
            $table->decimal('sale_listings_sf', 15, 2)->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('directory_contacts');
    }
};
