<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class ResponsiblesModel extends Model
{
    use HasFactory;

    protected $table = 'responsables';
    protected $primaryKey = 'id_responsable';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_responsable','parentesco', 'es_tutor', 'apellido', 'nombre', 'curp','sexo','n_telefono', 'entidad_nac', 'fecha_nac'
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
