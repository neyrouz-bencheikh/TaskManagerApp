<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class TaskDueSoonNotification extends Notification
{
    use Queueable; //Permet d’utiliser les fonctionnalités de mise en file d’attente pour envoyer les mails plus tard
    protected $task;

    public function __construct($task)
    {
        $this->task = $task;
    }

    public function via($notifiable)
    {
        return ['mail'];
    }

    public function toMail($notifiable)
    {
        return (new MailMessage)
            ->subject('Reminder: Task Expiring Soon')
            ->line('The task "' . $this->task->title . '" expires tomorrow.')
            ->line('Deadline: ' . $this->task->due_date)
            ->line('This task is overdue by' . now()->diffInDays($this->task->due_date) . ' days')
            ->action('View Task', url('/tasks/' . $this->task->id));

    }
}
