<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Home');
});

Route::get('/properties', function (Request $request) {
    return Inertia::render('Properties', [
        'filter' => $request->query('filter', 'all'),
        'section' => $request->query('section'),
    ]);
});
