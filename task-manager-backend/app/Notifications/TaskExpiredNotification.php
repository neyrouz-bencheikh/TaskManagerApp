<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;
use Illuminate\Notifications\Messages\MailMessage;

class TaskExpiredNotification extends Notification
{
    use Queueable;
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
            ->subject('Notification: Task Expired')
            ->line('The task "' . $this->task->title . '" has expired.')
            ->line('Deadline : ' . $this->task->due_date)
            ->action('View Task', url('/tasks/' . $this->task->id));
    }
}
