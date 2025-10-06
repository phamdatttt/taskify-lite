import { useEffect, useState } from "react";
import BackButton from "../components/BackButton"; // ✅ thêm nút quay lại

export default function Settings() {
  const [dark, setDark] = useState<boolean>(() =>
    document.documentElement.classList.contains("theme-dark")
  );

  useEffect(() => {
    const root = document.documentElement;
    dark ? root.classList.add("theme-dark") : root.classList.remove("theme-dark");
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  function clearAll() {
    if (!confirm("Xoá toàn bộ dữ liệu Taskify (localStorage)?")) return;
    localStorage.removeItem("tasks");
    location.reload();
  }

  function exportJSON() {
    const blob = new Blob([localStorage.getItem("tasks") ?? "[]"], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "tasks.json";
    a.click();
    URL.revokeObjectURL(url);
  }

  function importJSON(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    file.text().then((txt) => {
      try {
        JSON.parse(txt);
        localStorage.setItem("tasks", txt);
        alert("Nhập dữ liệu thành công!");
        location.reload();
      } catch {
        alert("File không hợp lệ.");
      }
    });
  }

  return (
    <div className="page">
      <BackButton /> {/* ✅ thêm nút quay lại */}
      <h2 className="page-title">⚙️ Cài đặt</h2>

      <div className="card">
        <h3>Giao diện</h3>
        <div className="row">
          <label className="switch">
            <input type="checkbox" checked={dark} onChange={() => setDark((v) => !v)} />
            <span /> Bật chế độ nền tối
          </label>
        </div>
      </div>

      <div className="card">
        <h3>Dữ liệu</h3>
        <div className="row gap">
          <button onClick={exportJSON}>Xuất JSON</button>
          <label className="btn">
            Nhập JSON
            <input type="file" accept="application/json" onChange={importJSON} hidden />
          </label>
          <button className="danger" onClick={clearAll}>
            Xoá toàn bộ
          </button>
        </div>
        <p className="muted">
          Dữ liệu được lưu cục bộ bằng localStorage trên trình duyệt của bạn.
        </p>
      </div>
    </div>
  );
}
