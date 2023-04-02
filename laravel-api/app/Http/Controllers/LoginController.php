<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\LoginModel;  // Aquí importamos el modelo
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    private $status_code = 200;
    
    public function methodOfModel() //Agrega un metodo en el controlador
    {
        return view('login', ["message" => LoginModel::helloFromModel()]);// retorna la vista y le pasamos un dato en array
    }

    public function signUp(Request $request)
    {
        try{
            $validator = Validator::make($request->all(), [
                "nombre"=>"required",
                "apellido"=>"required",
                "email"=>"required|email",
                "clave"=>"required",
            ]);

            if ($validator->fails()) {
                return response()->json(["status" => "failed", "message" => "validation_error", "errors" => $validator->errors()]);
            }

            // $name = $request->name;
            // $name = explode(" ", $name);
            // if (isset($name[1])) {
            //     $last_name = $name[1];
            // }

            $userDataArray = array(
                "nombre" => $request->nombre,
                "apellido" => $request->apellido,
                "email" => $request->email,
                "pwd" => md5($request->clave),
                "img" => null,
                "tipo" => "0",
                "ultima_vez" => now()
            );

            $user_status = LoginModel::where("email", $request->email)->first();

            if (!is_null($user_status)) {
                return response()->json(["status" => "failed", "success" => false, "message" => "Whoops! email already registered"]);
            }

            $user = LoginModel::create($userDataArray);

            if (!is_null($user)) {
                return response()->json(["status" => $this->status_code, "success" => true, "message" => "El registro ha sido exitoso", "data" => $user]);
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => "failed to register"]);
            }
        }catch (\Exception $e){
            return response()->json(["status" => "failed", "success" => false, "message" => $e->getMessage()]);
        }
        catch (\PDOException $e){
            return response()->json(["status" => "failed", "success" => false, "message" => $e->getMessage()]);
        }
    }


    // ------------ [ User Login ] -------------------
    public function login(Request $request)
    {

        try{

        
            $validator = Validator::make(
                $request->all(),
                [
                    "email" => "required|email",
                    "clave" => "required"
                ]
            );

            if ($validator->fails()) {
                return response()->json(["status" => "failed","message" => "validation_error", "errors" => $validator->errors()]);
            }


            // check if entered email exists in db
            $email_status = LoginModel::where("email", $request->email)->first();
            // if email exists then we will check password for the same email
            if (!is_null($email_status)) {
                $password_status = LoginModel::where("email", $request->email)->where("pwd", md5($request->clave))->first();

                // if password is correct
                if (!is_null($password_status)) {
                    $this->updateLastTime($email_status->id_usuario);
                    $user = $this->userDetail($request->email);
                    return response()->json(["status" => $this->status_code, "success" => true, "message" => "Has accedido exitosamente", "data" => $user]);
                } else {
                    return response()->json(["status" => "failed", "success" => false, "message" => "La contraseña no es correcta."]);
                }
            } else {
                return response()->json(["status" => "failed", "success" => false, "message" => "El email no esta registrado."]);
            }
        }catch (\Exception $e){
            return response()->json(["status" => "failed", "success" => false, "message" => $e->getMessage()]);
        }
        catch (\PDOException $e){
            return response()->json(["status" => "failed", "success" => false, "message" => $e->getMessage()]);
        }
    }

    // ------------------ [ User Detail ] ---------------------
    public function userDetail($email)
    {
        try{
            $user = array();
            if ($email != "") {
                $user = LoginModel::where("email", $email)->first();
                return $user;
            }
        }catch (\Exception $e){
            return response()->json(["status" => "failed", "success" => false, "message" => $e->getMessage()]);
        }
        catch (\PDOException $e){
            return response()->json(["status" => "failed", "success" => false, "message" => $e->getMessage()]);
        }
    }

    private function updateLastTime($id){
            $LoginModel = LoginModel::findOrFail($id);
            $LoginModel->ultima_vez = date("Y-m-d H:i:s");
            $LoginModel->save();
    }
}
