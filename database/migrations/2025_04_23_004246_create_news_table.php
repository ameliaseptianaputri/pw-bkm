<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('news', function (Blueprint $table) {
            $table->id();
            $table->string('title'); // card title
            $table->text('content'); // card preview
            $table->string('image')->nullable(); // card image
        
            $table->string('detail_title'); // full title di modal
            $table->text('detail_description'); // detail content
            $table->string('detail_image')->nullable(); // img di see more
            $table->date('event_date')->nullable(); // optional, bisa kosong
        
            $table->timestamps();
        });        
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('news');
    }
};
