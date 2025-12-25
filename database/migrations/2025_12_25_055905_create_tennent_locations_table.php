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
        Schema::create('tennent_locations', function (Blueprint $table) {
            $table->id();
            $table->string('address')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('country')->nullable();
            $table->string('tenant_name');
            $table->decimal('sf_occupied', 15, 2)->nullable();
            $table->string('floor')->nullable();
            $table->string('space_use')->nullable();
            $table->date('moved_in')->nullable();
            $table->date('commencement')->nullable();
            $table->date('expiration')->nullable();
            $table->decimal('percent_of_building', 5, 2)->nullable();
            $table->string('occupancy_type')->nullable();
            $table->decimal('rent_per_sf_year', 15, 2)->nullable();
            $table->string('rent_type')->nullable();
            $table->integer('employees')->nullable();
            $table->decimal('sf_per_employee', 15, 2)->nullable();
            $table->string('industry')->nullable();
            $table->integer('star_rating')->nullable();
            $table->string('green_rating')->nullable();
            $table->string('building_name')->nullable();
            $table->string('building_park')->nullable();
            $table->string('center_name')->nullable();
            $table->string('property_type')->nullable();
            $table->string('secondary_type')->nullable();
            $table->string('center_type')->nullable();
            $table->string('market')->nullable();
            $table->string('submarket')->nullable();
            $table->string('location_type')->nullable();
            $table->string('landlord')->nullable();
            $table->string('landlord_representative')->nullable();
            $table->string('tenant_representative')->nullable();
            $table->string('best_tenant_contact')->nullable();
            $table->string('best_tenant_phone')->nullable();
            $table->string('location_phone')->nullable();
            $table->string('website')->nullable();
            $table->date('future_move')->nullable();
            $table->string('future_move_type')->nullable();
            $table->date('signed')->nullable();
            $table->string('suite')->nullable();
            $table->string('zip')->nullable();
            $table->string('time_in_building')->nullable();
            $table->string('store_type')->nullable();
            $table->string('naics')->nullable();
            $table->string('sic')->nullable();
            $table->unsignedBigInteger('property_id')->nullable();
            $table->timestamps();

            $table->index('tenant_name');
            $table->index('property_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tennent_locations');
    }
};
