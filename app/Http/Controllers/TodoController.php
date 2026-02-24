<?php

namespace App\Http\Controllers;

use App\Models\TodoTask;
use App\Models\TodoProject;
use App\Models\TodoTeam;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
    public function index()
    {
        $user = Auth::user();
        $tasks = $user->todoTasks()->latest()->get();
        $projects = $user->todoProjects()->latest()->get();
        $teams = $user->todoTeams()->latest()->get();

        return Inertia::render('Tools/Todo', [
            'title' => 'To-Do List',
            'tasks' => $tasks,
            'projects' => $projects,
            'teams' => $teams,
        ]);
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'nullable|string',
            'due_date' => 'nullable|string',
            'project' => 'nullable|string',
            'project_id' => 'nullable|exists:todo_projects,id',
            'status' => 'nullable|string',
            'priority' => 'nullable|string',
            'position' => 'nullable|integer',
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
            'description' => 'nullable|string',
            'due_date' => 'nullable|string',
            'project' => 'nullable|string',
            'project_id' => 'nullable|exists:todo_projects,id',
            'is_completed' => 'sometimes|boolean',
            'status' => 'nullable|string',
            'priority' => 'nullable|string',
            'position' => 'nullable|integer',
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

    // --- Project Methods ---

    public function storeProject(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'nullable|string|max:50',
        ]);

        Auth::user()->todoProjects()->create($validated);

        return redirect()->back();
    }

    public function updateProject(Request $request, TodoProject $todoProject)
    {
        if ($todoProject->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'color' => 'nullable|string|max:50',
        ]);

        $todoProject->update($validated);

        return redirect()->back();
    }

    public function destroyProject(TodoProject $todoProject)
    {
        if ($todoProject->user_id !== Auth::id()) {
            abort(403);
        }

        $todoProject->delete();

        return redirect()->back();
    }

    // --- Team Methods ---

    public function storeTeam(Request $request)
    {
        $validated = $request->validate([
            'name' => 'required|string|max:255',
            'color' => 'nullable|string|max:50',
        ]);

        Auth::user()->todoTeams()->create($validated);

        return redirect()->back();
    }

    public function updateTeam(Request $request, TodoTeam $todoTeam)
    {
        if ($todoTeam->user_id !== Auth::id()) {
            abort(403);
        }

        $validated = $request->validate([
            'name' => 'sometimes|string|max:255',
            'color' => 'nullable|string|max:50',
        ]);

        $todoTeam->update($validated);

        return redirect()->back();
    }

    public function destroyTeam(TodoTeam $todoTeam)
    {
        if ($todoTeam->user_id !== Auth::id()) {
            abort(403);
        }

        $todoTeam->delete();

        return redirect()->back();
    }
}
