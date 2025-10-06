import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import App from "./App";                // trang Công việc (Taskify)
import Dashboard from "./pages/Dashboard";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
  <Route path="/" element={<Navigate to="/tasks" replace />} />
  <Route path="/home" element={<Dashboard />} />
  <Route path="/tasks" element={<App />} />
  <Route path="/stats" element={<Stats />} />
  <Route path="/settings" element={<Settings />} />
  <Route path="*" element={<Navigate to="/tasks" replace />} />
</Routes>
    </BrowserRouter>
  </React.StrictMode>
);
