import { useState } from "react";
import { useTodos } from "../hooks";
import { TodoList } from "../components/TodoList";

export const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);

  const { data, isLoading, isError } = useTodos(page, limit);

  const totalPages = data?.pagination.totalPages ?? 1;

  return (
    <div className="p-8 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-bold">Todos</h1>

      {/* Limit Selector */}
      <div className="flex items-center gap-3">
        <span className="text-sm">Items per page:</span>
        <select
          value={limit}
          onChange={(e) => {
            setLimit(Number(e.target.value));
            setPage(1);
          }}
          className="border rounded-md px-2 py-1 text-sm"
        >
          <option value={5}>5</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      {/* List */}
      <TodoList todos={data?.data ?? []} isLoading={isLoading} isError={isError} />

      {/* Pagination Controls */}
      <div className="flex justify-between items-center">
        <button disabled={page === 1} onClick={() => setPage((p) => p - 1)} className="px-3 py-1 rounded border disabled:opacity-50">
          Previous
        </button>

        <span className="text-sm">
          Page {page} of {totalPages}
        </span>

        <button
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};
