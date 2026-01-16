import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";

const COLUMNS = [
  { id: "To Do", label: "To Do" },
  { id: "In Progress", label: "In Progress" },
  { id: "Done", label: "Done" },
  { id: "Cancelled", label: "Cancelled" },
];

export default function KanbanBoard({ tasks, onStatusChange, onReorderLocal }) {
  const grouped = COLUMNS.reduce((acc, col) => {
    acc[col.id] = tasks.filter((t) => t.status === col.id);
    return acc;
  }, {});

  const handleDragEnd = (result) => {
    const { source, destination, draggableId } = result;
    if (!destination) return;

    const fromCol = source.droppableId;
    const toCol = destination.droppableId;

    onReorderLocal(draggableId, fromCol, toCol, source.index, destination.index);

    if (fromCol !== toCol) {
      onStatusChange(draggableId, toCol);
    }
  };

  return (
    <div className="kanban card">
      <h3>Kanban</h3>
      <DragDropContext onDragEnd={handleDragEnd}>
        <div className="kanban-grid">
          {COLUMNS.map((col) => (
            <Droppable droppableId={col.id} key={col.id}>
              {(provided, snapshot) => (
                <div
                  className={`kanban-column ${snapshot.isDraggingOver ? "highlight" : ""}`}
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  <div className="kanban-header">{col.label}</div>

                  {grouped[col.id].map((t, index) => (
                    <Draggable key={String(t.id)} draggableId={String(t.id)} index={index}>
                      {(provided, snapshot) => (
                        <div
                          className={`kanban-card ${snapshot.isDragging ? "dragging" : ""}`}
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          style={provided.draggableProps.style}
                        >
                          <div className="kanban-title">{t.title}</div>
                          <div className="kanban-meta">
                            {t.priority} • {t.category}
                          </div>
                        </div>
                      )}
                    </Draggable>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}
