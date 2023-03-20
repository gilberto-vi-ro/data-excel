<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class SchoolInfoModel extends Model
{
    use HasFactory;

    protected $table = 'info_escolar';
    protected $primaryKey = 'id_info_escolar';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_info_escolar','escolaridad', 'nombre_escuela', 'clave_escolar', 'modalidad', 'grado','ultima_calificacion','id_usuario',
    ];

    /**
     * The attributes that should be hidden for arrays.
     *
     * @var array
     */
    protected $hidden = [
        'created_at', 'updated_at',
    ];

    public static function findIdUser($id){
        return DB::table('usuarios as u')
                ->select('id_usuario')
                ->where('u.id_usuario', '=', $id)
                ->count();
                // ->get();
    }

}
