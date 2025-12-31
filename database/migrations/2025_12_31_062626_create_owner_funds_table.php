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
            $table->string('company')->nullable();
            $table->string('fund');
            $table->decimal('fund_size', 15, 2)->nullable();
            $table->string('status')->nullable();
            $table->decimal('dry_powder', 15, 2)->nullable();
            $table->decimal('aum', 15, 2)->nullable();
            $table->string('vintage')->nullable();
            $table->string('property_focus')->nullable();
            $table->string('country_focus')->nullable();
            $table->string('region_focus')->nullable();
            $table->string('strategy')->nullable();
            $table->string('fund_structure')->nullable();
            $table->date('launch_date')->nullable();
            $table->date('final_close_date')->nullable();
            $table->integer('months_in_market')->nullable();
            $table->decimal('target_irr_gross', 10, 2)->nullable();
            $table->decimal('target_irr_net', 10, 2)->nullable();
            $table->string('min_fund_manager_loc')->nullable();
            $table->integer('properties')->nullable();
            $table->decimal('portfolio_size_sf', 15, 2)->nullable();
            $table->decimal('acquisitions_24_months', 15, 2)->nullable();
            $table->decimal('dispositions_24_months', 15, 2)->nullable();
            $table->timestamps();

            $table->index('fund');
            $table->index('company');
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
