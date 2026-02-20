<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;

class HeroController extends Controller
{
    public function index()
    {
        return Inertia::render('Hero/HeroPage');
    }

    public function pasabayPage()
    {
        return Inertia::render('Projects/PasabayPage');
    }
}
