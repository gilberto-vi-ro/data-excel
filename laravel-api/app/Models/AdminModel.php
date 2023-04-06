<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;
use PDOException;
use Exception;

class AdminModel extends Model
{
    use HasFactory;

    protected $table = 'all_info_users';
    protected $primaryKey = 'id_usuario';

    public static function updateBeneficiary($dataArray,$id){
        return DB::table('usuarios')->where('id_usuario', $id)->update($dataArray);
    }

    public static function deleteBeneficiary($id){
        return DB::table('usuarios')->where('id_usuario', $id)->delete();
    }

    public static function getBeneficiaries($config=null){
       try{
            $all_info_users = [];

                if(empty($config) || is_null($config) ){
                    $all_info_users = DB::table('all_info_users')
                    ->select('*')
                    ->distinct()
                    ->where('responsable_es_tutor', '1')
                    ->orWhere('responsable_es_tutor', null)
                    ->get();
                }else{
                    
                    $config["where1"]["operator"]=="like"?$config["where1"]["value"]="%".$config["where1"]["value"]."%":"";
                    $config["where2"]["operator"]=="like"?$config["where2"]["value"]="%".$config["where1"]["value"]."%":"";

                    if($config["distinct"]===true){
                        $all_info_users =  DB::table('all_info_users')
                        ->select($config["select"])
                        ->where(function ($query) {
                            $query->where('responsable_es_tutor', '=',  '1')
                                  ->orWhere('responsable_es_tutor', null);
                        })
                        ->where($config["where1"]["column"], $config["where1"]["operator"],$config["where1"]["value"])
                        ->where($config["where2"]["column"], $config["where2"]["operator"],$config["where2"]["value"])
                        ->get();
                    }else{
                        $all_info_users =  DB::table('all_info_users')
                        ->select($config["select"])
                        ->where($config["where1"]["column"], $config["where1"]["operator"],$config["where1"]["value"])
                        ->where($config["where2"]["column"], $config["where2"]["operator"],$config["where2"]["value"])
                        ->get();
                    }
                }
            return $all_info_users;
        }catch(Exception $e){
             return $e->getMessage() ;
        }
    }

    public static function getResponsibleBeneficiaries($idUser){
        try{
          return DB::table('responsables')
                ->select( 'responsables.parentesco  AS responsable_parentesco', 
                    'responsables.es_tutor AS responsable_es_tutor', 
                    'responsables.nombre AS responsable_nombre', 
                    'responsables.apellido AS responsable_apellido', 
                    'responsables.curp AS responsable_curp', 
                    'responsables.sexo AS responsable_sexo',
                    'responsables.n_telefono AS responsable_n_telefono', 
                    'responsables.entidad_nac AS responsable_entidad_nacimiento',
                    'responsables.fecha_nac AS responsable_fecha_nacimiento'
                    )
                 ->where('id_usuario', $idUser)
                 ->get();
         }catch(Exception $e){
              return $e->getMessage() ;
         }
     }
 
    
    
}
