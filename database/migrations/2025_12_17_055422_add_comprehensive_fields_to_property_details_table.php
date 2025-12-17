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
        Schema::table('property_details', function (Blueprint $table) {
            // Investment fields
            $table->string('investment_type')->nullable()->after('price_per_acre');
            $table->string('investment_sub_type')->nullable()->after('investment_type');
            $table->string('class')->nullable()->after('investment_sub_type');

            // Lease fields
            $table->string('lease_type')->nullable()->after('class');
            $table->string('tenancy')->nullable()->after('lease_type');
            $table->date('lease_expiration')->nullable()->after('tenancy');
            $table->boolean('ground_lease')->nullable()->after('lease_expiration');

            // Financial fields
            $table->decimal('net_rentable_sqft', 15, 2)->nullable()->after('lot_size_acres');
            $table->decimal('cap_rate', 5, 2)->nullable()->after('net_rentable_sqft');
            $table->decimal('pro_forma_noi', 15, 2)->nullable()->after('cap_rate');
            $table->decimal('price_per_unit', 15, 2)->nullable()->after('pro_forma_noi');

            // Occupancy fields
            $table->date('occupancy_date')->nullable()->after('cap_rate');

            // Property characteristics
            $table->integer('parking_spaces')->nullable()->after('zoning');
            $table->string('ceiling_height')->nullable()->after('parking_spaces');
            $table->string('ownership')->nullable()->after('ceiling_height');
            $table->string('sale_condition')->nullable()->after('ownership');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('property_details', function (Blueprint $table) {
            $table->dropColumn([
                'investment_type',
                'investment_sub_type',
                'class',
                'lease_type',
                'tenancy',
                'lease_expiration',
                'ground_lease',
                'net_rentable_sqft',
                'cap_rate',
                'pro_forma_noi',
                'price_per_unit',
                'occupancy_date',
                'parking_spaces',
                'ceiling_height',
                'ownership',
                'sale_condition',
            ]);
        });
    }
};
