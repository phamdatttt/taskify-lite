import { useEffect, useMemo, useState } from "react";
import type { Task } from "../types/task";
import BackButton from "../components/BackButton"; // ✅ thêm nút quay lại

type KPI = { label: string; value: number; hint?: string };

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tasks");
      setTasks(raw ? (JSON.parse(raw) as Task[]) : []);
    } catch {
      setTasks([]);
    }
  }, []);

  const kpis: KPI[] = useMemo(() => {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const active = total - completed;
    const high = tasks.filter((t) => t.priority === "high").length;
    const rate = total ? Math.round((completed / total) * 100) : 0;
    return [
      { label: "Tổng công việc", value: total },
      { label: "Đang làm", value: active },
      { label: "Hoàn thành", value: completed, hint: `${rate}%` },
      { label: "Ưu tiên cao", value: high },
    ];
  }, [tasks]);

  const latest = useMemo(
    () => [...tasks].sort((a, b) => b.createdAt.localeCompare(a.createdAt)).slice(0, 5),
    [tasks]
  );

  return (
    <div className="page">
      <BackButton /> {/* ✅ thêm nút quay lại ở đầu trang */}
      <h2 className="page-title">📊 Trang chủ</h2>

      <section className="kpi-grid">
        {kpis.map((k) => (
          <div key={k.label} className="card kpi">
            <div className="kpi-value">{k.value}</div>
            <div className="kpi-label">{k.label}</div>
            {k.hint && <div className="kpi-hint">{k.hint}</div>}
          </div>
        ))}
      </section>

      <section className="card">
        <div className="card-head">
          <h3>Công việc gần đây</h3>
        </div>
        {latest.length === 0 ? (
          <p className="muted">Chưa có công việc nào. Vào mục “Công việc” để thêm.</p>
        ) : (
          <ul className="simple-list">
            {latest.map((t) => (
              <li key={t.id}>
                <span className={`dot ${t.completed ? "done" : "active"}`} />
                <span className="title">{t.title}</span>
                <span className={`pill ${t.priority}`}>{t.priority}</span>
                <span className="time">
                  {new Date(t.createdAt).toLocaleString("vi-VN")}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
