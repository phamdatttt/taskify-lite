import { useState } from "react";
import AddTaskForm from "./components/AddTaskForm";
import TaskList from "./components/TaskList";
import type { Task } from "./types/task";
import "./index.css";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getTasks, addTask, toggleTask, deleteTask, editTask, clearCompleted as apiClearCompleted } from "./api/tasksApi";

type Filter = "all" | "active" | "completed";
type SortBy = "createdAt" | "priority";

export default function App() {
  const [filter, setFilter] = useState<Filter>("all");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState<SortBy>("createdAt");

  const qc = useQueryClient();

  // Query: lấy danh sách task
  const { data: tasks = [], isLoading, isError } = useQuery({
    queryKey: ["tasks"],
    queryFn: getTasks,
  });

  // Mutations
  const mAdd = useMutation({
    mutationFn: (t: Task) => addTask(t),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const mToggle = useMutation({
    mutationFn: (id: string) => toggleTask(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const mDelete = useMutation({
    mutationFn: (id: string) => deleteTask(id),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const mEdit = useMutation({
    mutationFn: ({ id, title }: { id: string; title: string }) => editTask(id, title),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });

  const mClear = useMutation({
    mutationFn: () => apiClearCompleted(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["tasks"] }),
  });

  // bridge cho AddTaskForm & TaskList
  function addTaskHandler(t: Task) { mAdd.mutate(t); }
  function toggleTaskHandler(id: string) { mToggle.mutate(id); }
  function deleteTaskHandler(id: string) { mDelete.mutate(id); }
  function editTaskHandler(id: string, title: string) { mEdit.mutate({ id, title }); }
  function clearCompletedHandler() { mClear.mutate(); }

  if (isLoading) return <div className="page"><p className="muted">Đang tải dữ liệu…</p></div>;
  if (isError)   return <div className="page"><p className="muted">Lỗi tải dữ liệu. Thử tải lại trang.</p></div>;

  return (
    <main>
      <div className="todo-app">
        <AddTaskForm onAdd={addTaskHandler} onClearCompleted={clearCompletedHandler} />

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

        <TaskList
          items={tasks}
          filter={filter}
          search={search}
          sortBy={sortBy}
          onToggle={toggleTaskHandler}
          onDelete={deleteTaskHandler}
          onEdit={editTaskHandler}
        />
      </div>
    </main>
  );
}
