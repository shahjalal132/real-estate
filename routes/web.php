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

// API routes for filters
Route::get('/api/brokers/search', [\App\Http\Controllers\BrokerController::class, 'search'])->name('api.brokers.search');

// Auth routes
Route::post('/api/auth/login', [\App\Http\Controllers\AuthController::class, 'login'])->name('api.auth.login');
Route::post('/api/auth/register', [\App\Http\Controllers\AuthController::class, 'register'])->name('api.auth.register');
Route::post('/api/auth/logout', [\App\Http\Controllers\AuthController::class, 'logout'])->name('api.auth.logout')->middleware('auth');
Route::get('/api/auth/user', [\App\Http\Controllers\AuthController::class, 'user'])->name('api.auth.user');

// Saved Searches routes (require authentication)
Route::middleware('auth')->group(function () {
    Route::get('/api/saved-searches', [\App\Http\Controllers\SavedSearchController::class, 'index'])->name('api.saved-searches.index');
    Route::post('/api/saved-searches', [\App\Http\Controllers\SavedSearchController::class, 'store'])->name('api.saved-searches.store');
    Route::put('/api/saved-searches/{savedSearch}', [\App\Http\Controllers\SavedSearchController::class, 'update'])->name('api.saved-searches.update');
    Route::delete('/api/saved-searches/{savedSearch}', [\App\Http\Controllers\SavedSearchController::class, 'destroy'])->name('api.saved-searches.destroy');
    Route::get('/api/saved-searches/{savedSearch}/apply', [\App\Http\Controllers\SavedSearchController::class, 'apply'])->name('api.saved-searches.apply');
});

Route::get('/optimize', function () {
    Artisan::call('optimize:clear');
    return 'Application optimized!';
})->name('optimize')->middleware('auth');
