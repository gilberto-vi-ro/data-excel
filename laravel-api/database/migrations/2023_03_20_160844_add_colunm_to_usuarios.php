<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class AddColunmToUsuarios extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->string('estado_de_solicitud',20)->nullable()->default(NULL);
            $table->date('fecha_de_recepcion')->nullable()->default(NULL);
            $table->text('descripcion',500)->nullable()->default(NULL);
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::table('usuarios', function (Blueprint $table) {
            $table->dropColumn('estado_de_solicitud');
            $table->dropColumn('fecha_de_recepcion');
            $table->dropColumn('descripcion');
        });
    }
}
