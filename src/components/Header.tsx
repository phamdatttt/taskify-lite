import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const [dark, setDark] = useState(false);

  // Khi dark đổi, thêm hoặc bỏ class 'theme-dark' cho toàn trang
  useEffect(() => {
    const root = document.documentElement;
    if (dark) root.classList.add("theme-dark");
    else root.classList.remove("theme-dark");
  }, [dark]);

  return (
    <header className={`hdr ${dark ? "dark" : ""}`}>
      <div className="brand">
        <img src="/vite.svg" alt="Logo" className="logo" />
        <span>Taskify Lite</span>
      </div>

      <nav className="nav">
        <NavLink to="/home" className={({isActive}) => isActive ? "active" : ""}>Trang chủ</NavLink>
        <NavLink to="/tasks" className={({isActive}) => isActive ? "active" : ""}>Công việc</NavLink>
        <NavLink to="/stats" className={({isActive}) => isActive ? "active" : ""}>Thống kê</NavLink>
        <NavLink to="/settings" className={({isActive}) => isActive ? "active" : ""}>Cài đặt</NavLink>
      </nav>

      <button className="mode" onClick={() => setDark(v => !v)}>
        {dark ? "🌙" : "☀️"}
      </button>
    </header>
  );
}
