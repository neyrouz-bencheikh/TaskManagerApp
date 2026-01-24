<?php

use Illuminate\Support\Facades\Schedule;
use Illuminate\Support\Facades\Artisan;
use App\Models\Task;
use App\Notifications\TaskDueSoonNotification;
use App\Notifications\TaskExpiredNotification;

// Exemple par défaut
Artisan::command('inspire', function () {
    $this->comment(\Illuminate\Foundation\Inspiring::quote());
})->purpose('Display an inspiring quote');

Schedule::call(function () {
    $tomorrow = now()->addDay()->toDateString();
    $today = now()->toDateString();

    // Rappel : tâches qui expirent demain
    $dueSoonTasks = Task::whereDate('due_date', $tomorrow)->get();
    foreach ($dueSoonTasks as $task) {
        if ($task->user && filter_var($task->user->email, FILTER_VALIDATE_EMAIL)) {
            $task->user->notify(new TaskDueSoonNotification($task));
        }
    }

    // Notification : tâches expirées
    $expiredTasks = Task::whereDate('due_date', '<=', $today)
        ->where('status', '!=', 'Done') // ou 'Terminé' si c’est bien ce que tu utilises
        ->get();
    foreach ($expiredTasks as $task) {
        if ($task->user && filter_var($task->user->email, FILTER_VALIDATE_EMAIL)) {
            $task->user->notify(new TaskExpiredNotification($task));
        }
    }
})->dailyAt('00:00');
