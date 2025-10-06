import { useState } from "react";
import type { Task } from "../types/task";

type Props = {
  task: Task;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
};

export default function TaskItem({ task, onToggle, onDelete, onEdit }: Props) {
  const [editing, setEditing] = useState(false);
  const [val, setVal] = useState(task.title);

  const save = () => {
    const t = val.trim();
    if (!t || t === task.title) { setEditing(false); setVal(task.title); return; }
    onEdit(task.id, t);
    setEditing(false);
  };

  return (
    <li className="todo">
      <input className="toggle" type="checkbox" checked={task.completed} onChange={() => onToggle(task.id)} />

      {editing ? (
        <div className="editing">
          <input
            autoFocus
            value={val}
            onChange={(e) => setVal(e.target.value)}
            onBlur={save}
            onKeyDown={(e) => e.key === "Enter" && save()}
          />
        </div>
      ) : (
        <div onDoubleClick={() => setEditing(true)}>
          <span className={`label ${task.completed ? "done" : ""}`}>{task.title}</span>
          <span className={`badge ${task.priority}`}>
            {task.priority === "low" ? "thấp" : task.priority === "medium" ? "trung bình" : "cao"}
          </span>
          {task.description && (
            <div style={{ fontSize: 13, color: "#6b7280", marginTop: 2 }}>{task.description}</div>
          )}
        </div>
      )}

      <div className="row-actions">
        {!editing && <button className="btn ghost" onClick={() => setEditing(true)}>Sửa</button>}
        <button className="btn danger" onClick={() => onDelete(task.id)}>Xóa</button>
      </div>
    </li>
  );
}
