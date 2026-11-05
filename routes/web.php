<?php

use App\Http\Controllers\Admin\ContactMessageController as AdminContactMessageController;
use App\Http\Controllers\Admin\CoreValueController;
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\HeroSlideController;
use App\Http\Controllers\Admin\PartnerController;
use App\Http\Controllers\Admin\PostCategoryController;
use App\Http\Controllers\Admin\PostController;
use App\Http\Controllers\Admin\ProgramActivityController;
use App\Http\Controllers\Admin\ProgramController as AdminProgramController;
use App\Http\Controllers\Admin\SettingController;
use App\Http\Controllers\Admin\TestimonialController;
use App\Http\Controllers\Admin\UmkmRegionController;
use App\Http\Controllers\BlogController;
use App\Http\Controllers\ContactMessageController;
use App\Http\Controllers\PageController;
use App\Http\Controllers\ProgramController;
use Illuminate\Support\Facades\Route;

Route::get('/', [PageController::class, 'landing'])->name('home');
Route::get('/tentang', [PageController::class, 'about'])->name('tentang');
Route::get('/kontak', [PageController::class, 'contact'])->name('kontak');
Route::post('/kontak', [ContactMessageController::class, 'store'])->name('kontak.store');

Route::get('/program/agriculture', [ProgramController::class, 'agriculture'])->name('agriculture');
Route::get('/program/agroforestry', [ProgramController::class, 'agroforestry'])->name('agroforestry');
Route::get('/program/peternakan', [ProgramController::class, 'peternakan'])->name('peternakan');
Route::get('/program/umkm', [ProgramController::class, 'umkm'])->name('umkm');

Route::get('/blog', [BlogController::class, 'index'])->name('blog');

Route::get('/dashboard', function () {
    if (auth()->user()?->isAdmin()) {
        return redirect()->route('admin.dashboard');
    }

    return redirect()->route('home');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware(['auth', 'verified', 'admin'])->prefix('admin')->name('admin.')->group(function () {
    Route::get('/', DashboardController::class)->name('dashboard');
    Route::get('/settings', [SettingController::class, 'edit'])->name('settings.edit');
    Route::put('/settings', [SettingController::class, 'update'])->name('settings.update');

    Route::resource('hero-slides', HeroSlideController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('programs', AdminProgramController::class)->only(['index', 'edit', 'update']);
    Route::get('programs/{program}/activities', [ProgramActivityController::class, 'index'])->name('programs.activities.index');
    Route::get('programs/{program}/activities/create', [ProgramActivityController::class, 'create'])->name('programs.activities.create');
    Route::post('programs/{program}/activities', [ProgramActivityController::class, 'store'])->name('programs.activities.store');
    Route::get('programs/{program}/activities/{activity}/edit', [ProgramActivityController::class, 'edit'])->name('programs.activities.edit');
    Route::put('programs/{program}/activities/{activity}', [ProgramActivityController::class, 'update'])->name('programs.activities.update');
    Route::delete('programs/{program}/activities/{activity}', [ProgramActivityController::class, 'destroy'])->name('programs.activities.destroy');

    Route::resource('umkm', UmkmRegionController::class)
        ->except(['show'])
        ->parameters(['umkm' => 'region']);
    Route::resource('posts', PostController::class)->except(['show']);
    Route::resource('categories', PostCategoryController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('testimonials', TestimonialController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('partners', PartnerController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::resource('core-values', CoreValueController::class)->only(['index', 'store', 'update', 'destroy']);
    Route::get('messages', [AdminContactMessageController::class, 'index'])->name('messages.index');
    Route::patch('messages/{message}/toggle-read', [AdminContactMessageController::class, 'toggleRead'])->name('messages.toggle-read');
    Route::delete('messages/{message}', [AdminContactMessageController::class, 'destroy'])->name('messages.destroy');
});

require __DIR__.'/settings.php';
