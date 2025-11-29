<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [\App\Http\Controllers\HomeController::class, 'index']);

Route::resource('properties', \App\Http\Controllers\PropertyController::class);
Route::get('/properties/auctions', [\App\Http\Controllers\PropertyController::class, 'auctions'])->name('properties.auctions');
Route::get('/properties/commercial', [\App\Http\Controllers\PropertyController::class, 'commercial'])->name('properties.commercial');
Route::get('/properties/rental', [\App\Http\Controllers\PropertyController::class, 'rental'])->name('properties.rental');
