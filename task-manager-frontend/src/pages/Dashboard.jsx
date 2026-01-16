import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useEffect, useMemo, useState } from "react";
import { getTasks, createTask, updateTask, deleteTask } from "../services/taskService";
import ThemeToggle from "../components/ThemeToggle";
import ReminderBar from "../components/ReminderBar";
import FiltersBar from "../components/FiltersBar";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import KanbanBoard from "../components/KanbanBoard";

export default function Dashboard() {
  const { logout } = useContext(AuthContext);
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [tasks, setTasks] = useState([]);
  const [query, setQuery] = useState("");
  const [filters, setFilters] = useState({ status: "All", priority: "All", category: "All" });
  const [editing, setEditing] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const fetchTasks = async () => {
    const { data } = await getTasks();
    setTasks(data);
  };

  useEffect(() => {
    fetchTasks(); //charge les tâches dès l’ouverture du dashboard
  }, []);

  const filtered = useMemo(() => { //optimise le calcul des tâches filtrées
    return tasks
      .filter((t) => (filters.status === "All" ? true : t.status === filters.status))
      .filter((t) => (filters.priority === "All" ? true : t.priority === filters.priority))
      .filter((t) => (filters.category === "All" ? true : t.category === filters.category))
      .filter((t) => {
        const q = query.trim().toLowerCase();
        if (!q) return true;
        return (
          t.title.toLowerCase().includes(q) ||
          (t.description || "").toLowerCase().includes(q) ||
          (t.category || "").toLowerCase().includes(q)
        );
      });
  }, [tasks, filters, query]);

  const handleCreate = async (payload) => {
    await createTask(payload);
    setEditing(null);
    fetchTasks();
  };

  const handleUpdate = async (payload) => {
    await updateTask(editing.id, payload);
    setEditing(null);
    fetchTasks();
  };

  const handleDelete = async (id) => {
    await deleteTask(id);
    fetchTasks();
  };

  // Mise à jour backend du statut
  const handleStatusChange = async (id, status) => {
    await updateTask(id, { status });
    fetchTasks();
  };

  // Réordonnancement local pour feedback visuel immédiat
  const handleReorderLocal = (taskId, fromCol, toCol, fromIndex, toIndex) => {
    setTasks((prev) => {
      const next = [...prev];
      const movingIndex = next.findIndex((t) => String(t.id) === String(taskId));
      if (movingIndex === -1) return prev;

      const moving = { ...next[movingIndex] };
      // Retirer de l’ancienne position
      next.splice(movingIndex, 1);

      // Mettre à jour le statut si colonne différente
      if (fromCol !== toCol) {
        moving.status = toCol;
      }

      // Calculer l’index d’insertion dans la vue (basé sur toIndex dans la colonne cible)
      // On reconstruit la liste cible pour trouver la position globale
      const targetIds = next
        .filter((t) => t.status === toCol)
        .map((t) => t.id);

      // Trouver l’index global où insérer
      let insertAfterId = targetIds[toIndex - 1];
      if (toIndex === 0) {
        // insérer avant la première tâche de la colonne cible
        const firstIndex = next.findIndex((t) => t.status === toCol);
        const insertIndex = firstIndex === -1 ? next.length : firstIndex;
        next.splice(insertIndex, 0, moving);
      } else {
        const afterIndex = next.findIndex((t) => t.id === insertAfterId);
        next.splice(afterIndex + 1, 0, moving);
      }

      return next;
    });
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Task Manager</h1>
        <div style={{ display: "flex", gap: "0.5rem" }}>
          <ThemeToggle theme={theme} setTheme={setTheme} />
          <button className="btn danger" onClick={logout}>Logout</button>
        </div>
      </header>

      <ReminderBar tasks={tasks} />

      <div className="toolbar">
        <FiltersBar query={query} setQuery={setQuery} filters={filters} setFilters={setFilters} />
        <button className="btn primary" onClick={() => setEditing({})}>+ New Task</button>
      </div>

      {editing && (
        <TaskForm
          initial={editing.id ? editing : null}
          onSubmit={editing.id ? handleUpdate : handleCreate}
          onCancel={() => setEditing(null)}
        />
      )}

      <TaskList tasks={filtered} onEdit={setEditing} onDelete={handleDelete} />

      <KanbanBoard
        tasks={tasks}
        onStatusChange={handleStatusChange}
        onReorderLocal={handleReorderLocal}
      />
    </div>
  );
}
