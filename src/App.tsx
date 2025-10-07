import { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./types/task";
import { useLocalStorage } from "./hooks/useLocalStorage";
import "./index.css";

type Filter = "all" | "active" | "completed";
type SortBy = "createdAt" | "priority";

export default function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>("tasks", []);
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("createdAt");

  function addTask(t: Task) {
    setTasks([t, ...tasks]);
  }
  function toggleTask(id: string) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t)));
  }
  function deleteTask(id: string) {
    setTasks(tasks.filter((t) => t.id !== id));
  }
  function editTask(id: string, title: string) {
    setTasks(tasks.map((t) => (t.id === id ? { ...t, title } : t)));
  }
  function clearCompleted() {
    setTasks(tasks.filter((t) => !t.completed));
  }

  return (
    <main>
      <div className="todo-app">
        {/* Form thêm công việc */}
        <AddTaskForm onAdd={addTask} onClearCompleted={clearCompleted} />

        {/* Bộ lọc + tìm kiếm + sắp xếp */}
        <div className="secondary-actions">
          <div className="filters">
            {(["all", "active", "completed"] as const).map((f) => (
              <button
                key={f}
                className={filter === f ? "active" : ""}
                onClick={() => setFilter(f)}
              >
                {f === "all" ? "Tất cả" : f === "active" ? "Đang làm" : "Hoàn thành"}
              </button>
            ))}
          </div>

          <div className="search-sort">
            <input
              type="text"
              placeholder="Tìm kiếm công việc…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <select value={sortBy} onChange={(e) => setSortBy(e.target.value as SortBy)}>
              <option value="createdAt">Mới nhất</option>
              <option value="priority">Theo ưu tiên</option>
            </select>
          </div>
        </div>

        {/* Danh sách công việc */}
        <TaskList
          items={tasks}
          filter={filter}
          search={search}
          sortBy={sortBy}
          onToggle={toggleTask}
          onDelete={deleteTask}
          onEdit={editTask}
        />
      </div>
    </main>
  );
}
