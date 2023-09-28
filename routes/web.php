<?php

use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Cache;
use App\Http\Controllers\PostController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\ProfileController;
use App\Models\Post;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::prefix('admin')->middleware('auth')->group(function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Admin');
    })->name('admin');

    Route::resource('posts', PostController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);
    Route::resource('users', UserController::class)->only(['index', 'create', 'store', 'edit', 'update', 'destroy']);

    // Route::singleton('profile', ProfileController::class)->only(['edit', 'update', 'destroy']);
});

Route::get('/', function () {
    return Inertia::render('Home', [
        'posts' => Post::all()
    ]);
})->name('home');

Route::get('/blog', function () {
    return Inertia::render('Blog', [
        'posts' => Post::all()
    ]);
})->name('blog');

require __DIR__ . '/auth.php';
