import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import Layout from "./components/Layout";
import { applyTheme, getTheme } from "./lib/theme";
import "./index.css";

// Áp theme sớm để tránh "flash" sáng/tối
applyTheme(getTheme());

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="/home" element={<Dashboard />} />
          <Route path="/tasks" element={<App />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/tasks" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);
