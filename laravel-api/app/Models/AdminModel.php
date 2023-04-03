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

    public static function getBeneficiaries($data=null){
       try{
         return DB::table('all_info_users')
                ->select('*')
                ->distinct()
                ->where('responsable_es_tutor', '1')
                ->orWhere('responsable_es_tutor', null)
                ->get();

                //  ->select('campo1', DB::raw('COUNT(*) as total'))
                // ->where('responsable_es_tutor', '1')
                // ->orWhere('responsable_es_tutor', null)
                // ->groupBy('id_usuario')
                // ->get();
        }catch(Exception $e){
             return $e->getMessage() ;
        }
    }
    
}
