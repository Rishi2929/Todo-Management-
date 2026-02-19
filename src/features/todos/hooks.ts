import { useQuery, useMutation, useQueryClient, keepPreviousData } from "@tanstack/react-query";
import { fetchTodos, createTodoRequest, updateTodoRequest, deleteTodoRequest } from "./api";
import type { TodosResponse } from "./types";
import type { Todo } from "./types";

/* ------------------ QUERY ------------------ */

export const useTodos = (page: number, limit: number) => {
  return useQuery<TodosResponse>({
    queryKey: ["todos", page, limit],
    queryFn: () => fetchTodos(page, limit),
    placeholderData: keepPreviousData,
  });
};

/* ------------------ CREATE ------------------ */

export const useCreateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createTodoRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

/* ------------------ UPDATE ------------------ */

export const useUpdateTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Todo> }) => updateTodoRequest(id, updates),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};

/* ------------------ DELETE ------------------ */

export const useDeleteTodo = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteTodoRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });
};
