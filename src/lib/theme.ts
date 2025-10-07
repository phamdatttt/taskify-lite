const KEY = "theme";
export type Theme = "light" | "dark";

export function getTheme(): Theme {
  const cached = localStorage.getItem(KEY) as Theme | null;
  if (cached === "light" || cached === "dark") return cached;
  const prefersDark = window.matchMedia?.("(prefers-color-scheme: dark)").matches;
  return prefersDark ? "dark" : "light";
}

export function applyTheme(theme: Theme) {
  const root = document.documentElement;
  root.classList.toggle("theme-dark", theme === "dark");
  localStorage.setItem(KEY, theme);
}
