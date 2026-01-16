export default function FiltersBar({ query, setQuery, filters, setFilters }) {
  return (
    <div className="filters">
      <input className="input" placeholder="Search..." value={query} onChange={(e) => setQuery(e.target.value)} />
      <select
        className="select"
        value={filters.status}
        onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
      >
        <option value="All">All status</option>
        <option value="To Do">To Do</option>
        <option value="In Progress">In Progress</option>
        <option value="Done">Done</option>
        <option value="Cancelled">Cancelled</option>
      </select>
      <select
        className="select"
        value={filters.priority}
        onChange={(e) => setFilters((f) => ({ ...f, priority: e.target.value }))}
      >
        <option value="All">All priorities</option>
        <option value="High">High</option>
        <option value="Medium">Medium</option>
        <option value="Low">Low</option>
      </select>
      <select
        className="select"
        value={filters.category}
        onChange={(e) => setFilters((f) => ({ ...f, category: e.target.value }))}
      >
        <option value="All">All categories</option>
        <option value="Personal">Personal</option>
        <option value="Work">Work</option>
        <option value="Other">Other</option>
      </select>
    </div>
  );
}
