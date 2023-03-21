<?php

namespace App\Http\Controllers;

use App\Models\IndigenousInfoModel;
use Illuminate\Http\Request;
use PDO;
use PDOException;
use Exception;
use Illuminate\Validation\Rules\Exists;
use Illuminate\Support\Facades\Validator;

class IndigenousInfoController extends Controller
{
    private $responseValidated = [];

    public function index()
    {
        return $this->responseJson("success", "Saludos desde SchoolInfoController" );
    }

    public function exists($id,$json=false){
        $IndigenousInfo = IndigenousInfoModel::where("id_usuario","=", $id)->count();
        if($json=="json")
            return $this->responseJson("success", "Datos procesados", ["count" =>$IndigenousInfo] );
        return $IndigenousInfo;
    }

    public function show($id)
    {
        if($this->exists($id)){
            $IndigenousInfo = IndigenousInfoModel::where("id_usuario","=", $id)->get();
            return $this->responseJson("success", "Datos procesados", $IndigenousInfo );
        }else
            return $this->responseJson("failed", "No se encontraron Los datos");
    }

    public function create(Request $request)
    {
        try{
            if(!$this->validateData($request, $request->idUser))
                return $this->responseValidated;
            
            if(!$this->exists($request->idUser)){
                $IndigenousInfo = new IndigenousInfoModel();
                $IndigenousInfo->decendencia = $request->descent;
                $IndigenousInfo->pueblo_indigena = $request->indigenousTown;
                $IndigenousInfo->lengua_indigena = $request->indigenousLanguage;
                $IndigenousInfo->nivel_que_habla =  $request->levelThatSpeaking;
                $IndigenousInfo->nivel_que_escribe = $request->levelThatWrites;
                $IndigenousInfo->nivel_que_pronuncia = $request->levelThatPronounces;
                $IndigenousInfo->id_usuario = $request->idUser;
                if($IndigenousInfo->save())
                    return $this->responseJson("success", "Datos creados correctamente", $IndigenousInfo );
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

            $IndigenousInfo = IndigenousInfoModel::findOrFail($request->idIndigenousInfo);
            $IndigenousInfo->decendencia = $request->descent;
            $IndigenousInfo->pueblo_indigena = $request->indigenousTown;
            $IndigenousInfo->lengua_indigena = $request->indigenousLanguage;
            $IndigenousInfo->nivel_que_habla =  $request->levelThatSpeaking;
            $IndigenousInfo->nivel_que_escribe = $request->levelThatWrites;
            $IndigenousInfo->nivel_que_pronuncia = $request->levelThatPronounces;
            
            if($IndigenousInfo->save())
                return $this->responseJson("success", "Datos Actualizados", $IndigenousInfo );
            else 
                return $this->responseJson("failed", "Ocurrio un error al actualizar" );
        }catch(Exception $e){
            return $this->responseJson("failed", $e->getMessage() );
        }
        
    }

    public function validateData(Request $request,$id = null){
        if ($id !== null ){
            
            $IndigenousInfo = IndigenousInfoModel::findIdUser($id);
            if (!$IndigenousInfo) {
                $this->responseValidated = $this->responseJson("failed", "No se encontro el id del usuario" );
                return false;
            }
        }

        $validator = Validator::make($request->all(), [
            "descent"=>"required",
            "indigenousTown"=>"required",
            "indigenousLanguage"=>"required",
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
