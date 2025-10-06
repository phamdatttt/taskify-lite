import { useEffect, useMemo, useState } from "react";
import type { Task } from "../types/task";
import BackButton from "../components/BackButton"; // ✅ thêm nút quay lại

// Gom theo ngày (7 ngày gần nhất)
function lastNDays(n: number) {
  const arr: string[] = [];
  const d = new Date();
  for (let i = n - 1; i >= 0; i--) {
    const x = new Date(d);
    x.setDate(d.getDate() - i);
    arr.push(x.toISOString().slice(0, 10));
  }
  return arr;
}

export default function Stats() {
  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("tasks");
      setTasks(raw ? (JSON.parse(raw) as Task[]) : []);
    } catch {
      setTasks([]);
    }
  }, []);

  const days = lastNDays(7);
  const byDay = useMemo(() => {
    const map = new Map<string, { created: number; completed: number }>();
    days.forEach((d) => map.set(d, { created: 0, completed: 0 }));
    for (const t of tasks) {
      const day = new Date(t.createdAt).toISOString().slice(0, 10);
      if (map.has(day)) map.get(day)!.created++;
      if (t.completed) {
        const cday = day; // đơn giản: coi ngày hoàn thành = ngày tạo
        if (map.has(cday)) map.get(cday)!.completed++;
      }
    }
    return days.map((d) => ({ day: d, ...map.get(d)! }));
  }, [tasks, days]);

  const total = tasks.length;
  const completed = tasks.filter((t) => t.completed).length;
  const rate = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="page">
      <BackButton /> {/* ✅ thêm nút quay lại */}
      <h2 className="page-title">📈 Thống kê</h2>

      <div className="card kpi-row">
        <div className="kpi mini">
          <div className="kpi-value">{total}</div>
          <div className="kpi-label">Tổng</div>
        </div>
        <div className="kpi mini">
          <div className="kpi-value">{completed}</div>
          <div className="kpi-label">Hoàn thành</div>
        </div>
        <div className="kpi mini">
          <div className="kpi-value">{rate}%</div>
          <div className="kpi-label">Tỉ lệ</div>
        </div>
      </div>

      <div className="card">
        <div className="card-head">
          <h3>7 ngày gần nhất</h3>
        </div>
        <div className="bars">
          {byDay.map(({ day, created }) => (
            <div key={day} className="bar">
              <div className="bar-inner" style={{ height: Math.min(created * 18, 120) }} />
              <span className="bar-x">{day.slice(5)}</span>
              <span className="bar-y">{created}</span>
            </div>
          ))}
        </div>
        <p className="muted">Cột thể hiện số công việc được tạo mỗi ngày.</p>
      </div>
    </div>
  );
}
