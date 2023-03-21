<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\DB;

class IndigenousInfoModel extends Model
{
    use HasFactory;

    protected $table = 'info_indigena';
    protected $primaryKey = 'id_info_indigena';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'id_info_indigena','decendencia', 'pueblo_indigena', 'lengua_indigena', 'nivel_que_habla', 'nivel_que_escribe','nivel_que_pronuncia',
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
