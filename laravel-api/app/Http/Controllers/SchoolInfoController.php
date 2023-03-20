<?php

namespace App\Http\Controllers;

use App\Models\SchoolInfoModel;
use Illuminate\Http\Request;
use PDO;
use PDOException;
use Exception;
use Illuminate\Validation\Rules\Exists;
use Illuminate\Support\Facades\Validator;

class SchoolInfoController extends Controller
{
    private $responseValidated = [];

    public function index()
    {
        return $this->responseJson("success", "Saludos desde SchoolInfoController" );
    }

    public function exists($id,$json=false){
        $SchoolInfo = SchoolInfoModel::where("id_usuario","=", $id)->count();
        if($json=="json")
            return $this->responseJson("success", "Datos procesados", ["count" =>$SchoolInfo] );
        return $SchoolInfo;
    }

    public function show($id)
    {
        if($this->exists($id)){
            $SchoolInfo = SchoolInfoModel::where("id_usuario","=", $id)->get();
            return $this->responseJson("success", "Datos procesados", $SchoolInfo );
        }else
            return $this->responseJson("failed", "No se encontraron Los datos");
    }

    public function create(Request $request)
    {
        try{
            if(!$this->validateData($request, $request->idUser))
                return $this->responseValidated;
            
            if(!$this->exists($request->idUser)){
                $SchoolInfo = new SchoolInfoModel();
                $SchoolInfo->escolaridad = $request->scholarship;
                $SchoolInfo->nombre_escuela = $request->schoolName;
                $SchoolInfo->clave_escolar = $request->schoolKey;
                $SchoolInfo->modalidad =  $request->modality;
                $SchoolInfo->grado = $request->degree;
                $SchoolInfo->ultima_calificacion = $request->lastQualification;
                $SchoolInfo->id_usuario = $request->idUser;
                if($SchoolInfo->save())
                    return $this->responseJson("success", "Datos creados correctamente", $SchoolInfo );
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

            $SchoolInfo = SchoolInfoModel::findOrFail($request->idSchoolInfo);
            $SchoolInfo->escolaridad = $request->scholarship;
            $SchoolInfo->nombre_escuela = $request->schoolName;
            $SchoolInfo->clave_escolar = $request->schoolKey;
            $SchoolInfo->modalidad =  $request->modality;
            $SchoolInfo->grado = $request->degree;
            $SchoolInfo->ultima_calificacion = $request->lastQualification;
            
            if($SchoolInfo->save())
                return $this->responseJson("success", "Datos Actualizados", $SchoolInfo );
            else 
                return $this->responseJson("failed", "Ocurrio un error al actualizar" );
        }catch(Exception $e){
            return $this->responseJson("failed", $e->getMessage() );
        }
        
    }

    public function validateData(Request $request,$id = null){
        if ($id !== null ){
            
            $SchoolInfo = SchoolInfoModel::findIdUser($id);
            if (!$SchoolInfo) {
                $this->responseValidated = $this->responseJson("failed", "No se encontro el id del usuario" );
                return false;
            }
        }

        $validator = Validator::make($request->all(), [
            "scholarship"=>"required",
            "schoolName"=>"required",
            "modality"=>"required",
            "degree"=>"required",
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
