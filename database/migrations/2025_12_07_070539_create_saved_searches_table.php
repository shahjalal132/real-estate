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
        Schema::create('saved_searches', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_id')->constrained()->onDelete('cascade');
            $table->string('name')->nullable(); // User can name their saved search
            $table->boolean('email_alerts')->default(true);

            // Filter fields - stored as JSON for flexibility
            $table->json('filters');

            // Common filters stored as individual columns for easier querying
            $table->string('location')->nullable();
            $table->string('keywords')->nullable();
            $table->json('property_types')->nullable();
            $table->string('min_price')->nullable();
            $table->string('max_price')->nullable();
            $table->boolean('exclude_unpriced')->default(false);
            $table->string('min_cap_rate')->nullable();
            $table->string('max_cap_rate')->nullable();
            $table->string('tenant_brand')->nullable();
            $table->json('remaining_term')->nullable(); // [min, max]
            $table->string('broker_agent')->nullable();
            $table->string('brokerage_shop')->nullable();
            $table->string('tenancy')->nullable(); // vacant, single, multi
            $table->string('lease_type')->nullable();
            $table->string('measurement_type')->nullable(); // units, keys, beds, pads, pumps
            $table->string('min_units')->nullable();
            $table->string('max_units')->nullable();
            $table->string('min_sqft')->nullable();
            $table->string('max_sqft')->nullable();
            $table->string('min_price_per_sqft')->nullable();
            $table->string('max_price_per_sqft')->nullable();
            $table->string('min_acres')->nullable();
            $table->string('max_acres')->nullable();
            $table->string('tenant_credit')->nullable();
            $table->string('min_occupancy')->nullable();
            $table->string('max_occupancy')->nullable();
            $table->string('timeline_type')->nullable(); // timePeriod, custom
            $table->date('from_date')->nullable();
            $table->date('to_date')->nullable();
            $table->string('time_period')->nullable();
            $table->json('listing_status')->nullable();
            $table->boolean('opportunity_zone')->default(false);
            $table->json('property_class')->nullable();
            $table->boolean('broker_agent_co_op')->default(false);
            $table->boolean('owner_user')->default(false);

            $table->timestamps();

            $table->index('user_id');
            $table->index('email_alerts');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('saved_searches');
    }
};
