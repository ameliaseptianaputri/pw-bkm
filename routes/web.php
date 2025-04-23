<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;

Route::get('/', function () {
    return view('welcome');
});

// Route::post('/login', [AuthController::class, 'login'])->name('login');


Route::get('/{any}', function () {
    return view('welcome');
})->where('any', '^(?!api).*$'); // ← ini mengecualikan prefix "api"
