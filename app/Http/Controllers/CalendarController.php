<?php

namespace App\Http\Controllers;

use App\Models\CalendarEvent;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class CalendarController extends Controller
{
    public function index(Request $request)
    {
        $user = Auth::user();
        $start = $request->input('start', Carbon::now()->startOfMonth()->format('Y-m-d'));
        $end = $request->input('end', Carbon::now()->endOfMonth()->format('Y-m-d'));

        $events = $user->calendarEvents()
            ->whereBetween('start_at', [$start . ' 00:00:00', $end . ' 23:59:59'])
            ->orderBy('start_at')
            ->get()
            ->map(fn (CalendarEvent $e) => [
                'id' => $e->id,
                'title' => $e->title,
                'type' => $e->type,
                'start_at' => $e->start_at->toIso8601String(),
                'end_at' => $e->end_at?->toIso8601String(),
                'location' => $e->location,
                'description' => $e->description,
                'attendees' => $e->attendees ?? [],
            ]);

        return Inertia::render('Tools/Calendar', [
            'title' => 'Calendar',
            'events' => $events,
            'range' => ['start' => $start, 'end' => $end],
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'type' => 'required|string|in:open-house,viewing,closing,meeting,holiday',
            'start_at' => 'required|date',
            'end_at' => 'nullable|date|after_or_equal:start_at',
            'location' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'attendees' => 'nullable|array',
            'attendees.*' => 'string|max:100',
        ]);

        $validated['user_id'] = Auth::id();
        if (empty($validated['end_at'])) {
            $validated['end_at'] = Carbon::parse($validated['start_at'])->addHour();
        }

        Auth::user()->calendarEvents()->create($validated);

        return redirect()->back();
    }

    public function update(Request $request, CalendarEvent $calendarEvent)
    {
        if ($calendarEvent->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'type' => 'sometimes|string|in:open-house,viewing,closing,meeting,holiday',
            'start_at' => 'sometimes|date',
            'end_at' => 'nullable|date|after_or_equal:start_at',
            'location' => 'nullable|string|max:500',
            'description' => 'nullable|string',
            'attendees' => 'nullable|array',
            'attendees.*' => 'string|max:100',
        ]);

        $calendarEvent->update($validated);

        return redirect()->back();
    }

    public function destroy(CalendarEvent $calendarEvent)
    {
        if ($calendarEvent->user_id !== Auth::id()) {
            abort(403);
        }

        $calendarEvent->delete();

        return redirect()->back();
    }
}
