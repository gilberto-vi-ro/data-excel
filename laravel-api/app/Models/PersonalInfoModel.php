<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
// use Illuminate\Database\Eloquent\DB;
use Illuminate\Support\Facades\DB;

class PersonalInfoModel extends Model
{
    use HasFactory;

    protected $table = 'datos_personales';
    protected $primaryKey = 'id_dato_personal';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_dato_personal','curp', 'edad', 'fecha_nac', 'domicilio_origen', 'sexo','estatura','peso', 'n_telefono',
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
