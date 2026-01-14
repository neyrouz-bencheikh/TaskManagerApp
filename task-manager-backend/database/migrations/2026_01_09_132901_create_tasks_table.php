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
            $table->enum('status', ['To Do','In Progress','Done','Cancelled'])->default('To Do');
            $table->enum('priority', ['High','Medium','Low'])->default('Medium');            
            $table->enum('category', ['Personal','Work','Other'])->default('Other');            $table->dateTime('due_date')->nullable(); 
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
