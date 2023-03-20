<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateInfoIndigenaTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('info_indigena', function (Blueprint $table) {
            $table->id('id_info_indigena');
            $table->string('decendencia', 20)->nullable();
            $table->string('pueblo_indigena', 50)->nullable();
            $table->string('lengua_indigena', 50)->nullable();
            $table->string('nivel_que_habla', 20)->nullable();
            $table->string('nivel_que_escribe', 20)->nullable();
            $table->string('nivel_que_pronuncia', 20)->nullable();
            $table->timestamp('created_at')->nullable();
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
        Schema::dropIfExists('info_indigena');
    }
}
