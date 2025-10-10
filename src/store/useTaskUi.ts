import { create } from "zustand";
import { persist, devtools } from "zustand/middleware";

type Filter = "all" | "active" | "completed";
type SortBy = "createdAt" | "priority";

type TaskUiState = {
  filter: Filter;
  search: string;
  sortBy: SortBy;
  setFilter: (v: Filter) => void;
  setSearch: (v: string) => void;
  setSortBy: (v: SortBy) => void;
};

export const useTaskUi = create<TaskUiState>()(
  devtools(
    persist(
      (set) => ({
        filter: "all",
        search: "",
        sortBy: "createdAt",
        setFilter: (v) => set({ filter: v }),
        setSearch: (v) => set({ search: v }),
        setSortBy: (v) => set({ sortBy: v }),
      }),
      { name: "task-ui" } // localStorage key
    ),
    { name: "TaskUiStore" }
  )
);
