import { todoApi } from "../../lib/axios";
import type { Todo, TodosResponse } from "./types";

export const fetchTodos = async (page: number, limit: number): Promise<TodosResponse> => {
  const response = await todoApi.get(`/?page=${page}&limit=${limit}`);

  return {
    data: response.data.data,
    pagination: response.data.pagination,
  };
};

export const createTodoRequest = async (payload: { title: string; description: string; priority?: string }): Promise<Todo> => {
  const response = await todoApi.post("/add", payload);
  return response.data.data;
};

export const updateTodoRequest = async (id: string, updates: Partial<Todo>): Promise<Todo> => {
  const response = await todoApi.patch(`/update/${id}`, updates);
  return response.data.data;
};

export const deleteTodoRequest = async (id: string): Promise<void> => {
  await todoApi.delete(`/delete/${id}`);
};
