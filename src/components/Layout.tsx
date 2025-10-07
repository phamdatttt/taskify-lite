import { Outlet, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { applyTheme, getTheme, type Theme } from "../lib/theme";
import { LayoutGrid, ClipboardList, BarChart3, Settings as Cog, Moon, Sun } from "lucide-react";
import "./layout.css";

export default function Layout() {
  const [theme, setTheme] = useState<Theme>(() => getTheme());

  useEffect(() => { applyTheme(theme); }, [theme]);

  return (
    <div className="shell">
      <aside className="sidebar">
        <div className="brand">
          <img src="/vite.svg" className="logo" alt="logo" />
          <span>Taskify Lite</span>
        </div>

        <nav className="menu">
          <NavLink to="/home" className={({isActive}) => isActive ? "item active" : "item"}>
            <LayoutGrid size={18} /> <span>Trang chủ</span>
          </NavLink>
          <NavLink to="/tasks" className={({isActive}) => isActive ? "item active" : "item"}>
            <ClipboardList size={18} /> <span>Công việc</span>
          </NavLink>
          <NavLink to="/stats" className={({isActive}) => isActive ? "item active" : "item"}>
            <BarChart3 size={18} /> <span>Thống kê</span>
          </NavLink>
          <NavLink to="/settings" className={({isActive}) => isActive ? "item active" : "item"}>
            <Cog size={18} /> <span>Cài đặt</span>
          </NavLink>
        </nav>
      </aside>

      <div className="content">
        <header className="topbar">
          <div className="grow" />
          <button
            className="icon-btn"
            aria-label="Đổi theme"
            onClick={() => setTheme(t => t === "dark" ? "light" : "dark")}
            title={theme === "dark" ? "Chuyển sáng" : "Chuyển tối"}
          >
            {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
          </button>
        </header>

        <main className="main">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
