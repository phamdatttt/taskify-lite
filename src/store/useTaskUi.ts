// src/store/useTaskUi.ts
import { create, type StateCreator } from "zustand";
import { devtools, persist } from "zustand/middleware";

export type Filter = "all" | "active" | "completed";
export type SortBy = "createdAt" | "priority";

export type TaskUiState = {
  filter: Filter;
  search: string;
  sortBy: SortBy;
  setFilter: (v: Filter) => void;
  setSearch: (v: string) => void;
  setSortBy: (v: SortBy) => void;
};

const creator: StateCreator<TaskUiState> = (set) => ({
  filter: "all",
  search: "",
  sortBy: "createdAt",
  setFilter: (v) => set({ filter: v }),
  setSearch: (v) => set({ search: v }),
  setSortBy: (v) => set({ sortBy: v }),
});

export const useTaskUi = create<TaskUiState>()(
  devtools(
    persist<TaskUiState>(creator, { name: "taskify-ui" }),
    { name: "TaskUiStore" }
  )
);
