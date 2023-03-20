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
        return $this->responseJson("success", "Saludos desde PersonalInfoController" );
    }

    public function exists($id,$json=false){
        $PersonalInfo = PersonalInfoModel::where("id_usuario","=", $id)->count();
        if($json=="json")
            return $this->responseJson("success", "Datos procesados", ["count" =>$PersonalInfo] );
        return $PersonalInfo;
    }

    public function show($id)
    {
        if($this->exists($id)){
            $PersonalInfo = PersonalInfoModel::where("id_usuario","=", $id)->get();
            return $this->responseJson("success", "Datos procesados", $PersonalInfo );
        }else
            return $this->responseJson("failed", "No se encontraron Los datos");
    }

    public function create(Request $request)
    {
        try{
            if(!$this->validateData($request, $request->idUser))
                return $this->responseValidated;
            
            if(!$this->exists($request->idUser)){
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
                    return $this->responseJson("success", "Datos creados correctamente", $PersonalInfo );
            }
            return $this->responseJson("failed", "Ocurrio un error al crear los datos" );
        }catch(Exception $e){
            return $this->responseJson("failed", $e->getMessage() );
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
                return $this->responseJson("success", "Datos Actualizados", $PersonalInfo );
            else 
                return $this->responseJson("failed", "Ocurrio un error al actualizar" );
        }catch(Exception $e){
            return $this->responseJson("failed", $e->getMessage() );
        }
        
    }

    public function validateData(Request $request,$id = null){
        if ($id !== null ){
            
            $PersonalInfo = PersonalInfoModel::findIdUser($id);
            if (!$PersonalInfo) {
                $this->responseValidated = $this->responseJson("failed", "No se encontro el id del usuario" );
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
            $this->responseValidated = $this->responseJson("failed", $validator->errors()."" );
            return false;
        }else 
            return true;
    }

    private function responseJson($status="",$message="",$data=[]){
        return response()->json([
            "status" => $status,
            "message" => $message,
            "data"=> $data
        ]);
    }
}
