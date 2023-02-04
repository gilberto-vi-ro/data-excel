<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id('id_usuario');
            $table->string('nombre_completo', 200);
            $table->string('email', 200);
            $table->text('pwd')->length(500);
            $table->text('img')->nullable()->length(500);
            $table->tinyInteger('tipo')->length(2);
            $table->dateTime('ultima_vez');
            $table->timestamp('created_at')->default(now());
            //$table->timestamp('created_at')->useCurrent();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}
