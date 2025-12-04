<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index']);

Route::get('/properties', [\App\Http\Controllers\PropertyController::class, 'index'])->name('properties.index');
Route::get('/properties/auctions', [\App\Http\Controllers\PropertyController::class, 'auctions'])->name('properties.auctions');
Route::get('/properties/residential', [\App\Http\Controllers\PropertyController::class, 'residentials'])->name('properties.residentials');
Route::get('/properties/commercial', [\App\Http\Controllers\PropertyController::class, 'commercial'])->name('properties.commercial');
Route::get('/properties/rental', [\App\Http\Controllers\PropertyController::class, 'rental'])->name('properties.rental');
Route::get('/properties/{property}/{url_slug}', [\App\Http\Controllers\PropertyController::class, 'show'])->name('properties.show');

Route::get('/optimize', function () {
    Artisan::call('optimize:clear');
    return 'Application optimized!';
})->name('optimize')->middleware('auth');
