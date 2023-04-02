<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateViewAllInfoUsers extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        DB::statement('CREATE VIEW all_info_users AS 
            SELECT DISTINCT 
                usuarios.id_usuario, usuarios.apellido, usuarios.nombre, usuarios.email, usuarios.img, usuarios.estado_de_solicitud,
                usuarios.fecha_de_recepcion, usuarios.descripcion,
                datos_personales.curp, datos_personales.edad, datos_personales.fecha_nac AS fecha_nacimiento, datos_personales.domicilio_origen,
                datos_personales.sexo, datos_personales.estatura, datos_personales.peso, datos_personales.n_telefono,
                info_escolar.escolaridad, info_escolar.nombre_escuela, info_escolar.clave_escolar, info_escolar.modalidad, info_escolar.grado,
                info_escolar.ultima_calificacion,
                info_indigena.decendencia AS se_considera, info_indigena.pueblo_indigena, info_indigena.lengua_indigena, info_indigena.nivel_que_habla,
                info_indigena.nivel_que_escribe, info_indigena.nivel_que_pronuncia,
                responsables.parentesco  AS responsable_parentesco, responsables.es_tutor AS responsable_es_tutor, responsables.nombre AS responsable_nombre, 
                responsables.apellido AS responsable_apellido, responsables.curp AS responsable_curp, responsables.sexo AS responsable_sexo,
                responsables.n_telefono AS responsable_n_telefono, responsables.entidad_nac AS responsable_entidad_nacimiento,
                responsables.fecha_nac AS responsable_fecha_nacimiento
            FROM usuarios 
            LEFT JOIN datos_personales ON usuarios.id_usuario = datos_personales.id_usuario 
            LEFT JOIN info_escolar ON usuarios.id_usuario = info_escolar.id_usuario
            LEFT JOIN responsables ON usuarios.id_usuario = responsables.id_usuario
            LEFT JOIN info_indigena ON usuarios.id_usuario = info_indigena.id_usuario
            WHERE usuarios.tipo = 0 ORDER BY usuarios.apellido ASC');
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        DB::statement('DROP VIEW all_info_users');
    }
}
