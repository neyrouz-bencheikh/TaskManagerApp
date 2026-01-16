import { useState, useEffect } from "react";

export default function TaskForm({ initial, onSubmit, onCancel }) {
  const [form, setForm] = useState({
    title: "",
    description: "",
    status: "To Do",
    priority: "Low",
    category: "Work",
    due_date: "",
  });

  useEffect(() => {
    if (initial) {
      setForm({ ...initial });
    }
  }, [initial]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const submit = (e) => {
    e.preventDefault();

    const payload = {
      ...form,
      due_date: new Date(form.due_date).toISOString().slice(0, 10), // ← format YYYY-MM-DD
    };

    console.log("Payload envoyé :", payload); // ← vérifie dans la console
    onSubmit(payload);
  };

  return (
    <form className="card" onSubmit={submit}>
      <h2>{initial ? "Edit Task" : "Add Task"}</h2>

      <input
        className="input"
        name="title"
        placeholder="Title"
        value={form.title}
        onChange={handleChange}
      />

      <input
        className="input"
        type="date"
        name="due_date"
        value={form.due_date}
        onChange={handleChange}
      />

      <select className="input" name="status" value={form.status} onChange={handleChange}>
        <option>To Do</option>
        <option>In Progress</option>
        <option>Done</option>
        <option>Cancelled</option>
      </select>

      <select className="input" name="priority" value={form.priority} onChange={handleChange}>
        <option>Low</option>
        <option>Medium</option>
        <option>High</option>
      </select>

      <select className="input" name="category" value={form.category} onChange={handleChange}>
        <option>Work</option>
        <option>Personal</option>
        <option>Other</option>
      </select>

      <textarea
        className="input"
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
      />

      <div style={{ display: "flex", gap: "1rem" }}>
        <button className="btn primary" type="submit">Create</button>
        <button className="btn" type="button" onClick={onCancel}>Cancel</button>
      </div>
    </form>
  );
}
