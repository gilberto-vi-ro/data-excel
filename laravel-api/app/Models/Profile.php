<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class Profile extends Model
{
    use HasFactory;

    protected $table = 'usuarios';
    protected $primaryKey = 'id_usuario';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_usuarios','apellido', 'nombre', 'email', 'pwd', 'tipo','ultima_vez'
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'pwd', 'remember_token',
    ];

    public static function getStep($idUser){
        
        $step["datos_personales"] = DB::table('datos_personales')
            ->select('id_dato_personal')
            ->where('id_usuario', '=',  $idUser)
            ->count();
        $step["info_escolar"] = DB::table('info_escolar')
            ->select('id_info_escolar')
            ->where('id_usuario', '=',  $idUser)
            ->count();
        $step["info_indigena"] = DB::table('info_indigena')
            ->select('id_info_indigena')
            ->where('id_usuario', '=',  $idUser)
            ->count();
        $step["responsables"] = DB::table('responsables')
            ->select('id_responsable')
            ->where('id_usuario', '=',  $idUser)
            ->count();

        return $step;
    }
}
