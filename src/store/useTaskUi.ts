// src/store/useTaskUi.ts
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Filter = "all" | "active" | "completed";
export type SortBy = "createdAt" | "priority";

type TaskUiState = {
  filter: Filter;
  search: string;
  sortBy: SortBy;
  setFilter: (v: Filter) => void;
  setSearch: (v: string) => void;
  setSortBy: (v: SortBy) => void;
};

// Kiểu cho hàm set của zustand để tránh 'any'
type SetFn = (
  partial:
    | Partial<TaskUiState>
    | ((state: TaskUiState) => Partial<TaskUiState>),
  replace?: boolean
) => void;

export const useTaskUi = create<TaskUiState>()(
  devtools(
    persist<TaskUiState>(
      (set: SetFn) => ({
        filter: "all",
        search: "",
        sortBy: "createdAt",
        setFilter: (v) => set({ filter: v }),
        setSearch: (v) => set({ search: v }),
        setSortBy: (v) => set({ sortBy: v }),
      }),
      { name: "taskify-ui" }
    ),
    { name: "TaskUiStore" }
  )
);
