<?php

namespace App\Http\Controllers;

use App\Http\Requests\PostRequest;
use App\Models\Post;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class PostController extends Controller
{
    public function index(Request $request): Response
    {
        return Inertia::render('Posts/Index', [
            'posts' => Post::all(),
            'status' => session('status')
        ]);
    }

    public function create(Request $request): Response
    {
        return Inertia::render('Posts/Create', [
            'status' => session('status')
        ]);
    }

    public function store(PostRequest $request, Post $post): RedirectResponse
    {
        $validated = $request->validated();

        $validated['images'] = $validated['images'] ?? [];
        foreach ($validated['images'] as $key => $image) {
            $validated['images'][$key] = $image->store('posts', 'public');
        }

        $post->fill([...$validated, 'user_id' => $request->user()->id]);

        $post->save();

        return Redirect::route('posts.index');
    }

    public function edit(Request $request, Post $post): Response
    {
        return Inertia::render('Posts/Edit', [
            'post' => $post,
            'status' => session('status')
        ]);
    }

    public function update(PostRequest $request, Post $post): RedirectResponse
    {
        $validated = $request->validated();

        $validated['images'] = $validated['images'] ?? [];
        $validated['old_images'] = $validated['old_images'] ?? [];
        $newImages = [];
        foreach ($validated['old_images'] as $key => $image) {
            if (in_array($image, $post->images)) {
                $newImages[] = $image;
            } else {
                Storage::disk('public')->delete($image);
            }
        }
        foreach ($validated['images'] as $key => $image) {
            $newImages[] = $image->store('posts', 'public');
        }

        $validated['images'] = $newImages;

        $post->fill([...$validated, 'user_id' => $request->user()->id]);

        $post->save();

        return Redirect::route('posts.edit', $post->id);
    }

    public function destroy(Request $request, Post $post): RedirectResponse
    {
        foreach ($post->images as $key => $image) {
            Storage::disk('public')->delete($image ?? '');
        }
        $post->delete();

        return Redirect::route('posts.index');
    }
}
