<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateDatosPersonalesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('datos_personales', function (Blueprint $table) {
            $table->id('id_dato_personal');
            $table->string('curp', 22);
            $table->tinyInteger('edad')->length(2);
            $table->dateTime('fecha_nac');
            $table->text('domicilio_origen')->length(500);
            $table->string('sexo', 20);
            $table->double('estatura')->length(2);
            $table->double('peso')->length(2);
            $table->string('n_telefono', 14);
            $table->timestamp('created_at')->nullable()->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->nullable();
            $table->unsignedBigInteger('id_usuario');
            $table->foreign('id_usuario')
                    ->references('id_usuario')
                    ->on('usuarios')
                    ->onUpdate('cascade')
                    ->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('datos_personales');
    }
}
