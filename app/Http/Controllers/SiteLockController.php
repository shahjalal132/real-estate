<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia;

class SiteLockController extends Controller
{
    public function show()
    {
        // If already unlocked, redirect to home
        if (session()->has('site_unlocked')) {
            return redirect('/');
        }
        
        return Inertia::render('SiteLock');
    }

    public function unlock(Request $request)
    {
        $request->validate([
            'password' => 'required|string',
        ]);

        if ($request->password === env('SITE_LOCK_PASSWORD')) {
            session(['site_unlocked' => true]);
            return redirect('/');
        }

        return back()->withErrors(['password' => 'Incorrect password']);
    }
}
