<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateTutoresTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('tutores', function (Blueprint $table) {
            $table->id('id_tutor');
            $table->string('apellido', 100);
            $table->string('nombre', 100);
            $table->string('curp', 22);
            $table->string('sexo', 20);
            $table->string('n_telefono', 14)->nullable();
            $table->timestamp('created_at')->nullable()->default(now());
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
        Schema::dropIfExists('tutores');
    }
}
