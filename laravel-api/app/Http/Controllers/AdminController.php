<?php

namespace App\Http\Controllers;

use App\Models\AdminModel;
use Illuminate\Http\Request;
use PDO;
use PDOException;
use Exception;
use Illuminate\Validation\Rules\Exists;
use Illuminate\Support\Facades\Validator;

class AdminController extends Controller
{
    public function index()
    {
        return $this->responseJson("success", "Saludos desde AdminController" );
    }

    public function getAllUsers(Request $request)
    {
        $AdminModel = AdminModel::getBeneficiaries($request->config);
        if($AdminModel){
            return $this->responseJson("success", "Datos procesados", $AdminModel );
        }else
            return $this->responseJson("failed", "No se encontraron los datos");
    }
    
    public function getUser($id)
    {
        $AdminModel = AdminModel::find($id);
        if($AdminModel)
            return response()->json([ "status" => "success", "message" => "Datos procesados","data"=>$AdminModel ]);
        else 
            return response()->json(["status" => "failed", "message" => "No se encontro Los datos", "data"=> [] ]);
    }
    public function getResponsibleBeneficiaries($idUser)
    {
        $AdminModel = AdminModel::getResponsibleBeneficiaries($idUser);
        if($AdminModel){
            return $this->responseJson("success", "Datos procesados", $AdminModel );
        }else
            return $this->responseJson("failed", "No se encontraron los datos");
    }

    public function select(Request $request)
    {
        $request->data;
    }
    public function filter(Request $request)
    {
        $request->data;
    }

    public function updateBeneficiary(Request $request)
    {
        try{
            if($this->validateData($request)){
               
                $beneficiaryArray["apellido"] = $request->lastName;
                $beneficiaryArray["nombre"] = $request->name;
                if($request->pwd !="default" && $request->pwd !="")
                    $beneficiaryArray["pwd"] = md5($request->pwd);
                $beneficiaryArray["descripcion"] = $request->description;
                $beneficiaryArray["fecha_de_recepcion"] = $request->receptionDate;
                $beneficiaryArray["estado_de_solicitud"] = $request->requestStatus;

                $beneficiary = AdminModel::updateBeneficiary($beneficiaryArray,$request->id);
                if($beneficiary )
                    return $this->responseJson("success", "Datos Actualizados", $beneficiary );
            }
            return $this->responseJson("failed", "Ocurrio un error al actualizar" );
        }catch(Exception $e){
            return $this->responseJson("failed", $e->getMessage() );
        }
       
    }
    public function deleteMasive(Request $request)
    {
        try{
            $id = null;
            $beneficiary = 0;
            foreach( $request->data as $val)
            {
                $beneficiary = AdminModel::deleteBeneficiary($val["id_usuario"]);
            }
         
            if($beneficiary )
                return $this->responseJson("success", "Datos eliminados", $beneficiary );
            
            return $this->responseJson("failed", "Ocurrio un error al eliminar" );
        }catch(Exception $e){
            return $this->responseJson("failed", $e->getMessage() );
        }
    }
    public function deleteBeneficiary($id)
    {
        try{
            $beneficiary = AdminModel::deleteBeneficiary($id);
            if($beneficiary )
                return $this->responseJson("success", "Datos eliminados", $beneficiary );
            
            return $this->responseJson("failed", "Ocurrio un error al eliminar" );
        }catch(Exception $e){
            return $this->responseJson("failed", $e->getMessage() );
        }
    }
    

    private function responseJson($status="",$message="",$data=[]){
        return response()->json([
            "status" => $status,
            "message" => $message,
            "data"=> $data
        ]);
    }

    private function validateData(Request $request){
       
        $validator = Validator::make($request->all(), [
            "name"=>"required",
            "lastName"=>"required",
            "email"=>"required|email",
            "pwd"=>"required",
        ]);

        if ($validator->fails())
            return false;
        else 
            return true;
    }
}
