<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
{
    Schema::create('kalenders', function (Blueprint $table) {
        $table->id();
        $table->text('description'); // Menggunakan deskripsi saja
        $table->date('date');
        $table->time('time');
        $table->string('location');
        $table->string('image')->nullable(); // untuk menyimpan path gambar
        $table->timestamps();
    });
}


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('kalenders');
    }
};
