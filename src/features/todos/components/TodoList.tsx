import type { Todo } from "../types";
import { TodoItem } from "./TodoItem";

interface Props {
  todos: Todo[];
  isLoading: boolean;
  isError: boolean;
}

export const TodoList = ({ todos, isLoading, isError }: Props) => {
  if (isLoading) {
    return (
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="h-16 bg-gray-200 animate-pulse rounded-md" />
        ))}
      </div>
    );
  }

  if (isError) {
    return <p className="text-red-500">Failed to load todos</p>;
  }

  if (!todos.length) {
    return <p>No todos found.</p>;
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem key={todo._id} todo={todo} />
      ))}
    </div>
  );
};
