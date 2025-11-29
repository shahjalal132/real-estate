<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('property_details', function (Blueprint $table) {
            $table->id();
            $table->foreignId('property_id')->constrained()->onDelete('cascade');
            $table->string('zoning')->nullable();
            $table->decimal('lot_size_acres', 10, 2)->nullable();
            $table->string('price_per_acre')->nullable();
            $table->longText('investment_highlights')->nullable();
            $table->json('summary_details')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('property_details');
    }
};
