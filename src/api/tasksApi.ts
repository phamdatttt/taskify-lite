// src/api/tasksApi.ts
import type { Task } from "../types/task";

const KEY = "tasks";

// độ trễ cho giống gọi API thật
const sleep = (ms = 400) => new Promise(res => setTimeout(res, ms));

function read(): Task[] {
  try { return JSON.parse(localStorage.getItem(KEY) || "[]") as Task[]; }
  catch { return []; }
}
function write(data: Task[]) {
  localStorage.setItem(KEY, JSON.stringify(data));
}

// ===== API =====
export async function getTasks(): Promise<Task[]> {
  await sleep(350);
  const data = read();
  // giả sắp xếp mới nhất
  return [...data].sort((a, b) => b.createdAt.localeCompare(a.createdAt));
}

export async function addTask(task: Task): Promise<void> {
  await sleep(250);
  const data = read();
  write([task, ...data]);
}

export async function toggleTask(id: string): Promise<void> {
  await sleep(200);
  const data = read().map(t => t.id === id ? { ...t, completed: !t.completed } : t);
  write(data);
}

export async function deleteTask(id: string): Promise<void> {
  await sleep(200);
  write(read().filter(t => t.id !== id));
}

export async function editTask(id: string, title: string): Promise<void> {
  await sleep(220);
  const data = read().map(t => t.id === id ? { ...t, title } : t);
  write(data);
}

export async function clearCompleted(): Promise<void> {
  await sleep(220);
  write(read().filter(t => !t.completed));
}
