<?php

use Illuminate\Support\Facades\Route;

$nc = "App\Http\Controllers\\";// Namespace del controller

Route::get('/', function () {
    return view('welcome');
});


Route::get('/login',$nc.'LoginController@methodOfModel');


// $datos = [
//     ['texto'=>'hola 1'],
//     ['texto'=>'hola 2'],
// ];
// Route::view('/login','login',$datos)->name('r_login');
