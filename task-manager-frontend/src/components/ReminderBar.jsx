import dayjs from "dayjs";

export default function ReminderBar({ tasks }) {
  const soon = tasks.filter((t) => {
    if (!t.due_date) return false;
    const due = dayjs(t.due_date);
    const hours = due.diff(dayjs(), "hour");
    return hours <= 24 && hours >= 0 && !["Done", "Cancelled"].includes(t.status);
  });

  if (soon.length === 0) return null;

  return (
    <div className="reminder">
      <strong>Rappels:</strong>
      {soon.map((t) => (
        <span key={t.id} className="reminder-item">
          {t.title} — due {dayjs(t.due_date).format("YYYY-MM-DD HH:mm")}
        </span>
      ))}
    </div>
  );
}
