<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/
$nc = "App\Http\Controllers\\";// Namespace del controller

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post("user-signup", $nc."LoginController@signUp");

Route::post("user-login", $nc."LoginController@login");

Route::get("user-info/{email}", $nc."LoginController@userDetail");
