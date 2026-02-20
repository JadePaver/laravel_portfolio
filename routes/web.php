<?php

use App\Http\Controllers\HeroController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', [HeroController::class, 'index'])->name('hero.index');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

Route::get('/hero', [HeroController::class, 'index'])->name('hero.index');
Route::get('/hero/pasabay', [HeroController::class, 'pasabayPage'])->name('hero.pasabay');
Route::get('/about', function (){return Inertia::render('About/AboutPage');})->name('about.index');


Route::get('/projects/pasabay', function(){return Inertia::render('Projects/PasabayPage');})->name('projects.pasabay');
Route::get('/projects/gso_pmd', function(){return Inertia::render('Projects/GSOPMDPage');})->name('projects.gso_pmd');
Route::get('/projects/ledger', function(){return Inertia::render('Projects/LedgerPage');})->name('projects.ledger');
Route::get('/projects/furniture', function(){return Inertia::render('Projects/FurniturePage');})->name('projects.butch_furniture');
Route::get('/projects/aes', function(){return Inertia::render('Projects/AESPage');})->name('projects.aes');


require __DIR__.'/auth.php';    
