import dayjs from "dayjs";
import EditIcon from "../assets/icons/edit.png";
import TrashIcon from "../assets/icons/trash.png";

const PC = {
  High: "#e53935",
  Medium: "#fb8c00",
  Low: "#43a047",
};

export default function TaskList({ tasks, onEdit, onDelete }) {
  return (
    <div className="card">
      <h3>Tasks List</h3>
      <table className="table">
        <thead>
          <tr>
            <th>Title</th><th>Description</th><th>Status</th><th>Priority</th><th>Category</th><th>Is_overdue</th><th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.map((t) => {
            const overdue = t.due_date && dayjs(t.due_date).isBefore(dayjs()) && !["Done", "Cancelled"].includes(t.status);
            return (
              <tr key={t.id} className={overdue ? "overdue" : ""}>
                <td>{t.title}</td>
                <td className="truncate">{t.description}</td>
                <td>{t.status}</td>
                <td style={{ color: PC[t.priority] }}>{t.priority}</td>
                <td>{t.category}</td>
                <td>{t.due_date ? dayjs(t.due_date).format("YYYY-MM-DD") : "-"}</td>
                <td>
                  <button className="icon-btn" onClick={() => onEdit(t)}>
                    <img src={EditIcon} alt="Edit" />
                  </button>

                  <button className="icon-btn danger" onClick={() => onDelete(t.id)}>
                    <img src={TrashIcon} alt="Delete" />
                  </button>


                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
