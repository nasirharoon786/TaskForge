<?php

use App\Http\Controllers\Api\V1\CompleteTaskController;
use App\Http\Controllers\Api\V1\TaskController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

require __DIR__ . '/api/v1.php';
require __DIR__ . '/api/v2.php';

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
