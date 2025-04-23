<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BiodataController;
use App\Http\Controllers\LayananController;

Route::post('/login', [AuthController::class, 'login'])->middleware('api');
Route::get('biodata', [BiodataController::class, 'index']);
Route::get('biodata/{biodata}', [BiodataController::class, 'show']);
Route::get('/layanan', [LayananController::class, 'index']);


Route::middleware('auth:sanctum')->group(function () {
    // Route::get('/biodata', [BiodataController::class, 'index']);
    Route::put('/biodata/{id}', [BiodataController::class, 'update']);
    Route::post('/biodata', [BiodataController::class, 'store']);
    Route::delete('/biodata/{id}', [BiodataController::class, 'destroy']);
    Route::post('/layanan', [LayananController::class, 'store']);
    Route::post('/layanan/{layanan}', [LayananController::class, 'update']);
    Route::delete('/layanan/{layanan}', [LayananController::class, 'destroy']);
});
