<?php

namespace App\Http\Controllers;

use App\Models\ResponsiblesModel;
use Illuminate\Http\Request;
use PDO;
use PDOException;
use Exception;
use Illuminate\Validation\Rules\Exists;
use Illuminate\Support\Facades\Validator;

class ResponsiblesController extends Controller
{
    private $responseValidated = [];

    public function index()
    {
        return $this->responseJson("success", "Saludos desde ResponsiblesController" );
    }

    public function exists($id,$json=false){
        $Responsibles = ResponsiblesModel::where("id_usuario","=", $id)->count();
        if($json=="json")
            return $this->responseJson("success", "Datos procesados", ["count" =>$Responsibles] );
        return $Responsibles;
    }

    public function show($id)
    {
        if($this->exists($id)){
            $Responsibles = ResponsiblesModel::where("id_usuario","=", $id)->orderBy('apellido')->get();
            return $this->responseJson("success", "Datos procesados", $Responsibles );
        }else
            return $this->responseJson("failed", "No se encontraron los datos");
    }

    public function create(Request $request)
    {
        try{
            if(!$this->validateData($request))
                return $this->responseValidated;
            
            $Responsibles = new ResponsiblesModel();
            $Responsibles->parentesco = $request->relationship;
            $Responsibles->es_tutor = $request->isTutor;
            $Responsibles->apellido =  $request->lastName;
            $Responsibles->nombre = $request->name;
            $Responsibles->curp = $request->curp;
            $Responsibles->sexo = $request->sex;
            $Responsibles->n_telefono = $request->NPhone;
            $Responsibles->entidad_nac = $request->birthEntity;
            $Responsibles->fecha_nac = $request->birthDate;
            $Responsibles->id_usuario = $request->idUser;
            if($Responsibles->save())
                return $this->responseJson("success", "Datos creados correctamente", $Responsibles );
            
            return $this->responseJson("failed", $request->idUser );
        }catch(Exception $e){
            return $this->responseJson("failed", $e->getMessage() );
        }
    }

    public function update(Request $request)
    {
        try{
            if(!$this->validateData($request))
                return $this->responseValidated;

            $Responsibles = ResponsiblesModel::findOrFail($request->idResponsible);
            $Responsibles->parentesco = $request->relationship;
            $Responsibles->es_tutor = $request->isTutor;
            $Responsibles->apellido =  $request->lastName;
            $Responsibles->nombre = $request->name;
            $Responsibles->curp = $request->curp;
            $Responsibles->sexo = $request->sex;
            $Responsibles->n_telefono = $request->NPhone;
            $Responsibles->entidad_nac = $request->birthEntity;
            $Responsibles->fecha_nac = $request->birthDate;
            
            if($Responsibles->save())
                return $this->responseJson("success", "Datos Actualizados", $Responsibles );
            else 
                return $this->responseJson("failed", "Ocurrio un error al actualizar" );
        }catch(Exception $e){
            return $this->responseJson("failed", $e->getMessage() );
        }
        
    }

    public function delete($id)
    {
        $Responsibles = ResponsiblesModel::destroy($id);
        if($Responsibles)
            return response()->json([ "status" => "success", "message" => "Datos eliminados","data"=>$Responsibles ]);
        else 
            return response()->json(["status" => "failed", "message" => "Ocurrio un error al eliminar", "data"=> [] ]);
    }

    public function validateData(Request $request,$id = null){
        if ($id !== null ){
            $Responsibles = ResponsiblesModel::findIdUser($id);
            if (!$Responsibles) {
                $this->responseValidated = $this->responseJson("failed", "No se encontro el id del usuario" );
                return false;
            }
        }

        $validator = Validator::make($request->all(), [
            "relationship"=>"required",
            "isTutor"=>"required",
            "lastName"=>"required",
            "name"=>"required",
            "curp"=>"required|string|min:18|max:20",
            "sex"=>"required",
            "NPhone"=>"required|string|min:10|max:14",
            "birthEntity"=>"required",
            "birthDate"=>"required|required|date",
           
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
