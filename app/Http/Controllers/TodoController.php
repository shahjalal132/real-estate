<?php

namespace App\Http\Controllers;

use App\Models\TodoTask;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    public function index()
    {
        $tasks = Auth::user()->todoTasks()->latest()->get();

        return Inertia::render('Tools/TodoApp/MyTasks', [
            'title' => 'My Tasks - To-Do List',
            'tasks' => $tasks,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'nullable|string',
            'project' => 'nullable|string',
            'status' => 'nullable|string',
            'priority' => 'nullable|string',
            'collaborators' => 'nullable|array',
            'visibility' => 'nullable|string',
        ]);

        $task = Auth::user()->todoTasks()->create($validated);

        return redirect()->back();
    }

    public function update(Request $request, TodoTask $todoTask)
    {
        // Ensure user owns the task
        if ($todoTask->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'title' => 'sometimes|string|max:255',
            'due_date' => 'nullable|string',
            'project' => 'nullable|string',
            'is_completed' => 'sometimes|boolean',
            'status' => 'nullable|string',
            'priority' => 'nullable|string',
            'collaborators' => 'nullable|array',
            'visibility' => 'nullable|string',
        ]);

        $todoTask->update($validated);

        return redirect()->back();
    }

    public function destroy(TodoTask $todoTask)
    {
        if ($todoTask->user_id !== Auth::id()) {
            abort(403);
        }

        $todoTask->delete();

        return redirect()->back();
    }
}
