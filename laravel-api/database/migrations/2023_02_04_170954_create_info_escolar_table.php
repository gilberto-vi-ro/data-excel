<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;

class CreateInfoEscolarTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('info_escolar', function (Blueprint $table) {
            $table->id('id_info_escolar');
            $table->string('escolaridad', 50)->nullable();
            $table->string('nombre_escuela', 250)->nullable();
            $table->string('clave_escolar', 100)->nullable();
            $table->string('modalidad', 50)->nullable();
            $table->tinyInteger('grado')->length(2)->nullable();
            $table->double('ultima_calificacion')->length(2)->nullable();
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
        Schema::dropIfExists('info_escolar');
    }
}
