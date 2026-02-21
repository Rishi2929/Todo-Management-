export type TodoStatus = "pending" | "in_progress" | "completed";
export type TodoPriority = "low" | "medium" | "high";

export interface Todo {
  _id: string;
  title: string;
  description: string;
  priority: TodoPriority;
  status: TodoStatus;
  owner: string;
  createdAt: string;
  updatedAt: string;
}

export interface TodosResponse {
  data: Todo[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}
