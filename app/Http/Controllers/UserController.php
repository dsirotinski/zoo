<?php

namespace App\Http\Controllers;

use App\Http\Requests\UserStoreRequest;
use App\Http\Requests\UserUpdateRequest;
use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Redirect;
use Inertia\Inertia;
use Inertia\Response;

class UserController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Users/Index', [
            'users' => User::all()
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Users/Create');
    }

    public function store(UserStoreRequest $request, User $user): RedirectResponse
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);

        $user->fill($validated);
        $user->save();

        return Redirect::route('users.index');
    }

    public function edit(Request $request, User $user): Response
    {
        return Inertia::render('Users/Edit', [
            'user' => $user
        ]);
    }

    public function update(UserUpdateRequest $request, User $user): RedirectResponse
    {
        $validated = $request->validated();
        $validated['password'] = Hash::make($validated['password']);

        $user->fill($validated);
        $user->save();

        return Redirect::route('users.edit', $user->id);
    }

    public function destroy(Request $request, User $user): RedirectResponse
    {
        $user->delete();

        return Redirect::route('users.index');
    }
}
