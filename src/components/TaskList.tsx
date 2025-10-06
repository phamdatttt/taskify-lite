import TaskItem from "./TaskItem";
import type { Task } from "../types/task";

type Filter = "all" | "active" | "completed";
type SortBy = "createdAt" | "priority";

type Props = {
  items: Task[];
  filter: Filter;
  search: string;
  sortBy: SortBy;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, title: string) => void;
};

export default function TaskList({
  items,
  filter,
  search,
  sortBy,
  onToggle,
  onDelete,
  onEdit,
}: Props) {
  const filtered = items
    .filter((t) => (filter === "active" ? !t.completed : filter === "completed" ? t.completed : true))
    .filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === "createdAt") return b.createdAt.localeCompare(a.createdAt);
    const score = { high: 3, medium: 2, low: 1 } as const;
    return score[b.priority] - score[a.priority];
    });

  const activeCount = items.filter((t) => !t.completed).length;
  const completedCount = items.length - activeCount;

  return (
    <>
      <div className="stats">
        Đang làm: {activeCount} · Hoàn thành: {completedCount} · Tổng cộng: {items.length}
      </div>

      <ul className="todo-list">
        {sorted.map((t) => (
          <TaskItem
            key={t.id}
            task={t}
            onToggle={onToggle}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
        {sorted.length === 0 && <p className="empty">Không có công việc nào</p>}
      </ul>
    </>
  );
}
