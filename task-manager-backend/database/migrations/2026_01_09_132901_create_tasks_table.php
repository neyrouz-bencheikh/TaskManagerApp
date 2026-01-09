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
        Schema::create('tasks', function (Blueprint $table) {
            $table->id();
            $table->string('title'); 
            $table->text('description')->nullable(); 
            $table->enum('status', ['TODO','IN_PROGRESS','DONE','CANCELLED'])->default('TODO'); 
            $table->enum('priority', ['HIGH','MEDIUM','LOW'])->default('MEDIUM');
            $table->enum('category', ['PERSONAL','WORK','OTHER'])->default('OTHER'); 
            $table->dateTime('due_date')->nullable(); 
            $table->boolean('is_overdue')->default(false);
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
