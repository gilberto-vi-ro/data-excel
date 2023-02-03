<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoginModel;  // Aquí importamos el modelo

class LoginController extends Controller
{
    
    public function methodOfModel() //Agrega un metodo en el controlador
    {
        return view('login', ["message" => LoginModel::helloFromModel()]);// retorna la vista y le pasamos un dato en array
    }
}
