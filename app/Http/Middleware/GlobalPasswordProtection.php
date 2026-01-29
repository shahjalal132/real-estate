<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class GlobalPasswordProtection
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if ($request->is('site-lock') || $request->is('site-lock/*')) {
            return $next($request);
        }

        if (!session()->has('site_unlocked')) {
            return redirect()->route('site-lock.show');
        }

        return $next($request);
    }
}
