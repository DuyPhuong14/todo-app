export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
}

export type StatusFilter = "all" | "active" | "done";