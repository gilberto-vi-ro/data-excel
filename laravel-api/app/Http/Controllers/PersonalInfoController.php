<?php

namespace App\Http\Controllers;

use App\Models\PersonalInfoModel;
use Illuminate\Http\Request;
use PDO;
use PDOException;
use Exception;
use Illuminate\Validation\Rules\Exists;
use Illuminate\Support\Facades\Validator;

class PersonalInfoController extends Controller
{
    private $responseValidated = [];

    public function index()
    {
        return response()->json([ "status" => "success", "message" => "Saludos desde PersonalInfoController","data"=>[] ]);
    }

    public function show($id)
    {
        $PersonalInfo = PersonalInfoModel::find($id);
        if($PersonalInfo)
            return response()->json([ "status" => "success", "message" => "Datos procesados","data"=>$PersonalInfo ]);
        else 
            return response()->json(["status" => "failed", "message" => "No se encontraron Los datos", "data"=> [] ]);
    }

    public function create(Request $request)
    {
        try{
            if(!$this->validateData($request, $request->idUser))
                return $this->responseValidated;
            
            $PersonalInfo = new PersonalInfoModel();
            $PersonalInfo->curp = $request->curp;
            $PersonalInfo->edad = $request->age;
            $PersonalInfo->fecha_nac = $request->birthDate;
            $PersonalInfo->domicilio_origen =  $request->domicile;
            $PersonalInfo->sexo = $request->sex;
            $PersonalInfo->estatura = $request->height;
            $PersonalInfo->peso = $request->weight;
            $PersonalInfo->n_telefono = $request->phone;
            $PersonalInfo->id_usuario = $request->idUser;
            if($PersonalInfo->save())
                return response()->json([ "status" => "success", "message" => "Datos creados correctamente","data"=>$PersonalInfo ]);
            else 
                return response()->json(["status" => "failed", "message" => "Ocurrio un error al crear los datos", "data"=> [] ]);
        }catch(Exception $e){
            return response()->json(["status" => "failed", "message" => $e->getMessage(), "data"=> [] ]);
        }
    }

    public function update(Request $request)
    {
        try{
            if(!$this->validateData($request))
                return $this->responseValidated;

            $PersonalInfo = PersonalInfoModel::findOrFail($request->idPersonalInfo);
            $PersonalInfo->curp = $request->curp;
            $PersonalInfo->edad = $request->age;
            $PersonalInfo->fecha_nac = $request->birthDate;
            $PersonalInfo->domicilio_origen =  $request->domicile;
            $PersonalInfo->sexo = $request->sex;
            $PersonalInfo->estatura = $request->height;
            $PersonalInfo->peso = $request->weight;
            $PersonalInfo->n_telefono = $request->phone;
            
            if($PersonalInfo->save())
                return response()->json([ "status" => "success", "message" => "Datos Actualizados","data"=>$PersonalInfo ]);
            else 
                return response()->json(["status" => "failed", "message" => "Ocurrio un error al actualizar", "data"=> [] ]);
        }catch(Exception $e){
            return response()->json(["status" => "failed", "message" => $e->getMessage(), "data"=> [] ]);
        }
        
    }

    public function validateData(Request $request,$id = null){
        if ($id !== null ){
            
            $PersonalInfo = PersonalInfoModel::findIdUser($id);
            if (!$PersonalInfo) {
                $this->responseValidated = response()->json([
                    "status" => "failed",
                     "message" => "No se encontro el id del usuario",
                     "data"=> [] 
                ]);
                return false;
            }
        }

        $validator = Validator::make($request->all(), [
            "curp"=>"required|string|min:18|max:20",
            "birthDate"=>"required|date",
            "age"=>"required|numeric|digits_between:1,3",
            "domicile"=>"required",
            "sex"=>"required",
        ]);

        if ($validator->fails()) {
            $this->responseValidated = response()->json([
                "status" => "failed",
                "message" => $validator->errors()."" ,
                "data"=> []
            ]);
            return false;
        }else 
            return true;
    }
}
