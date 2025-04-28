<?php

use App\Http\Controllers\GalleryController;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BiodataController;
use App\Http\Controllers\KalenderController;
use App\Http\Controllers\LayananController;
use App\Http\Controllers\NewsController;
use App\Http\Controllers\NewsImageController;

Route::post('/login', [AuthController::class, 'login'])->middleware('api');
Route::get('biodata', [BiodataController::class, 'index']);
Route::get('biodata/{biodata}', [BiodataController::class, 'show']);
Route::get('/layanan', [LayananController::class, 'index']);
Route::get('/news', [NewsController::class, 'index']);
Route::get('galeri', [GalleryController::class, 'index']);
Route::get('kalenders', [KalenderController::class, 'index']);


Route::middleware('auth:sanctum')->group(function () {
    // Route::get('/biodata', [BiodataController::class, 'index']);
    Route::put('/biodata/{id}', [BiodataController::class, 'update']);
    Route::post('/biodata', [BiodataController::class, 'store']);
    Route::delete('/biodata/{id}', [BiodataController::class, 'destroy']);

    Route::post('/layanan', [LayananController::class, 'store']);
    Route::post('/layanan/{layanan}', [LayananController::class, 'update']);
    Route::delete('/layanan/{layanan}', [LayananController::class, 'destroy']);

    Route::post('/news', [NewsController::class, 'store']);
    Route::get('/news/{id}', [NewsController::class, 'show']);
    Route::put('/news/{id}', [NewsController::class, 'update']);
    Route::delete('/news/{id}', [NewsController::class, 'destroy']);

    Route::post('/news/{newsId}/images', [NewsImageController::class, 'addImage']);
    Route::delete('/news/{newsId}/images', [NewsImageController::class, 'removeImage']);

    Route::get('/news/{id}/images', [NewsController::class, 'getImages']);

    Route::post('/galeri', [GalleryController::class, 'store']);
    Route::get('/galeri/{id}', [GalleryController::class, 'show']);
    Route::put('/galeri/{id}', [GalleryController::class, 'update']);
    Route::delete('/galeri/{id}', [GalleryController::class, 'destroy']);

    Route::post('kalender', [KalenderController::class, 'store']);
    Route::put('kalenders/{id}', [KalenderController::class, 'update']);
    Route::delete('kalenders/{id}', [KalenderController::class, 'destroy']);
});
