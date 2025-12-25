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
        Schema::create('tennent_companies', function (Blueprint $table) {
            $table->id();
            $table->string('tenant_name');
            $table->string('industry')->nullable();
            $table->string('territory')->nullable();
            $table->string('hq_market')->nullable();
            $table->integer('locations')->nullable();
            $table->decimal('sf_occupied', 15, 2)->nullable();
            $table->string('highest_use_by_sf')->nullable();
            $table->integer('employees')->nullable();
            $table->string('growth')->nullable();
            $table->decimal('revenue', 15, 2)->nullable();
            $table->string('credit_rating')->nullable();
            $table->year('established')->nullable();
            $table->string('parent_company')->nullable();
            $table->string('website')->nullable();
            $table->string('hq_phone')->nullable();
            $table->string('hq_city')->nullable();
            $table->string('hq_state')->nullable();
            $table->string('hq_postal_code')->nullable();
            $table->string('hq_country')->nullable();
            $table->string('naics')->nullable();
            $table->string('sic')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tennent_companies');
    }
};
