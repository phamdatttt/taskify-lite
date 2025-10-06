import { useState } from "react";
import type { Task } from "../types/task";

type Props = { onAdd: (t: Task) => void; onClearCompleted: () => void };

export default function AddTaskForm({ onAdd, onClearCompleted }: Props) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState<"low" | "medium" | "high">("low");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const trimmed = title.trim();
    if (!trimmed) return;

    onAdd({
      id: crypto.randomUUID(),
      title: trimmed,
      description: description.trim() || undefined,
      priority,
      completed: false,
      createdAt: new Date().toISOString(),
    });

    setTitle("");
    setDescription("");
    setPriority("low");
  }

  return (
    <>
      <form className="new-row" onSubmit={handleSubmit}>
        <input
          className="title-input"
          placeholder="Tiêu đề công việc…"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value as any)}>
          <option value="low">Ưu tiên thấp</option>
          <option value="medium">Ưu tiên trung bình</option>
          <option value="high">Ưu tiên cao</option>
        </select>
        <button type="submit">Thêm</button>
      </form>

      <input
        className="desc-input"
        placeholder="Mô tả chi tiết (tùy chọn)…"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />

      <div style={{ display: "flex", justifyContent: "flex-end", margin: "6px 0 10px" }}>
        <button type="button" className="clear-btn" onClick={onClearCompleted}>
          Xóa công việc đã hoàn thành
        </button>
      </div>
    </>
  );
}
