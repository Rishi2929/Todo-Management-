import { useState } from "react";
import { useTodos, useCreateTodo, useUpdateTodo, useDeleteTodo } from "../hooks";
import { useForm } from "react-hook-form";
import { Loader2, Pencil, Trash2, Plus, ChevronLeft, ChevronRight, CheckCircle2, Circle } from "lucide-react";
import { toast } from "react-hot-toast";
import type { TodoStatus, Todo } from "../types";

interface TodoForm {
  title: string;
  description: string;
  priority: "low" | "medium" | "high";
}

const PRIORITY_STYLES: Record<"low" | "medium" | "high", string> = {
  low: "bg-green-50 text-green-700 border-green-200",
  medium: "bg-yellow-50 text-yellow-700 border-yellow-200",
  high: "bg-red-50 text-red-700 border-red-200",
};

export const DashboardPage = () => {
  const [page, setPage] = useState(1);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [togglingId, setTogglingId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const { data, isLoading } = useTodos(page, 5);
  const createMutation = useCreateTodo();

  const editMutation = useUpdateTodo();
  const toggleMutation = useUpdateTodo();
  const deleteMutation = useDeleteTodo();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<TodoForm>({
    defaultValues: { priority: "low" },
    mode: "onBlur",
  });

  const todos: Todo[] = data?.data ?? [];
  const totalPages = data?.pagination.pages ?? 1;
  console.log("Pagination:", data?.pagination);

  const pendingCount = todos.filter((t) => t.status === "pending").length;

  const doneCount = todos.filter((t) => t.status === "completed").length;

  const onSubmit = async (formData: TodoForm) => {
    try {
      if (editingId) {
        await editMutation.mutateAsync({
          id: editingId,
          updates: formData,
        });
        toast.success("Todo updated");
        setEditingId(null);
      } else {
        await createMutation.mutateAsync(formData);
        toast.success("Todo created");
      }
      reset({
        title: "",
        description: "",
        priority: "low",
      });
    } catch {
      toast.error("Operation failed");
    }
  };

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteMutation.mutateAsync(id);
      toast.success("Todo deleted");
    } catch {
      toast.error("Delete failed");
    } finally {
      setDeletingId(null);
    }
  };

  const handleToggleStatus = async (todo: Todo) => {
    setTogglingId(todo._id);
    try {
      const nextStatus: TodoStatus = todo.status === "completed" ? "pending" : "completed";

      await toggleMutation.mutateAsync({
        id: todo._id,
        updates: { status: nextStatus },
      });
    } catch {
      toast.error("Update failed");
    } finally {
      setTogglingId(null);
    }
  };

  const handleEdit = (todo: Todo) => {
    setEditingId(todo._id);

    reset({
      title: todo.title,
      description: todo.description,
      priority: todo.priority,
    });

    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-gray-50 min-h-full">
      <header className="border-b border-gray-200 bg-white/70 backdrop-blur sticky top-0 z-10">
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-lg bg-indigo-600 flex items-center justify-center">
              <CheckCircle2 className="w-4 h-4 text-white" />
            </div>
            <span className="font-semibold text-gray-900 text-sm tracking-tight">Focus</span>
          </div>
          <div className="flex items-center gap-5 text-sm">
            <span className="text-red-700">
              <span className="font-semibold text-red-700">{pendingCount}</span> Pending
            </span>
            <span className="text-green-700">
              <span className="font-semibold text-green-700">{doneCount}</span> Completed
            </span>
          </div>
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12 space-y-10">
        <div className="space-y-1">
          <h1 className="text-5xl font-bold tracking-tight text-gray-900">My Todos</h1>
          <p className="text-gray-500 text-base">Structured. Clean. Focused.</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="px-6 pt-5 pb-3 border-b border-gray-200 flex items-center justify-between">
            <span className="text-xs font-semibold uppercase tracking-widest text-gray-500">{editingId ? "Edit task" : "New task"}</span>
            {editingId && (
              <button
                onClick={() => {
                  setEditingId(null);
                  reset({ priority: "low" });
                }}
                className="text-xs text-gray-500 hover:text-gray-900 transition"
              >
                Cancel
              </button>
            )}
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="p-6 space-y-4">
            {/* ------------------ TITLE INPUT FIELD ------------------  */}
            <input
              {...register("title", { required: "Title is required" })}
              placeholder="Task title"
              className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
            {errors.title && <p className="text-xs text-red-500 mt-1">{errors.title.message}</p>}
            {/* ------------------ DESCRIPTION INPUT FIELD ------------------  */}
            <textarea
              {...register("description", {
                required: "Description is required",
                minLength: {
                  value: 3,
                  message: "Title must be at least 3 characters",
                },
              })}
              placeholder="Description"
              rows={2}
              className="w-full px-4 py-3 text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition resize-none"
            />
            {errors.description && <p className="text-xs text-red-500 ">{errors.description.message}</p>}

            <div className="flex items-center gap-4">
              {/* ------------------ OPTIONS  ------------------  */}

              <select
                {...register("priority")}
                className="flex-1 px-4 py-3 text-sm rounded-xl border border-gray-300 bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
              >
                <option value="low">Low priority</option>
                <option value="medium">Medium priority</option>
                <option value="high">High priority</option>
              </select>
              {/* ------------------ BUTTON  ------------------  */}

              <button
                type="submit"
                disabled={createMutation.isPending || editMutation.isPending}
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-60"
              >
                {createMutation.isPending || editMutation.isPending ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : editingId ? (
                  <>
                    <Pencil className="h-4 w-4" /> Update task
                  </>
                ) : (
                  <>
                    <Plus className="h-4 w-4" /> Add task
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        <div className="space-y-3">
          {isLoading ? (
            <div className="text-center py-16">
              <Loader2 className="w-6 h-6 animate-spin mx-auto text-indigo-600" />
            </div>
          ) : todos.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Circle className="w-8 h-8 mx-auto mb-3 opacity-30" />
              <p className="text-sm">No tasks yet. Add one above.</p>
            </div>
          ) : (
            todos.map((todo) => (
              <div
                key={todo._id}
                className={`bg-white border border-gray-200 rounded-2xl px-5 py-4 flex items-start gap-4 ${
                  todo.status === "completed" ? "opacity-60" : ""
                }`}
              >
                {/* ------------------ TOGGLE BUTTON ------------------  */}
                <button
                  onClick={() => handleToggleStatus(todo)}
                  disabled={togglingId === todo._id}
                  className="mt-0.5 text-gray-400 hover:text-indigo-600 transition"
                >
                  {togglingId === todo._id ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : todo.status === "completed" ? (
                    <CheckCircle2 className="w-5 h-5 text-indigo-600" />
                  ) : (
                    <Circle className="w-5 h-5" />
                  )}
                </button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-start gap-3 flex-wrap">
                    <h2 className={`font-semibold text-sm ${todo.status === "completed" ? "line-through text-gray-400" : "text-gray-900"}`}>
                      {todo.title}
                    </h2>
                    <span
                      className={`text-[10px] font-semibold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                        PRIORITY_STYLES[todo.priority]
                      }`}
                    >
                      {todo.priority}
                    </span>
                  </div>
                  {todo.description && <p className="text-gray-500 text-xs mt-1 truncate">{todo.description}</p>}
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleEdit(todo)}
                    className="inline-flex items-center gap-1 rounded-lg border border-gray-300 px-3 py-1.5 text-xs font-medium hover:bg-gray-50"
                  >
                    <Pencil className="h-3 w-3" /> Edit
                  </button>
                  <button
                    onClick={() => handleDelete(todo._id)}
                    disabled={deletingId == todo._id}
                    className="inline-flex items-center gap-1 rounded-lg border border-red-200 bg-red-50 px-3 py-1.5 text-xs font-medium text-red-600 hover:bg-red-100"
                  >
                    {deletingId == todo._id ? (
                      <Loader2 className="h-3 w-3 animate-spin" />
                    ) : (
                      <>
                        <Trash2 className="h-3 w-3" /> Delete
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 pt-6">
          <button
            disabled={page === 1}
            onClick={() => setPage((p) => p - 1)}
            className="inline-flex items-center gap-1 rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-40"
          >
            {" "}
            <ChevronLeft className="h-4 w-4" /> Prev{" "}
          </button>

          <span className="text-xs text-gray-500 font-medium">
            Page <span className="font-semibold text-gray-900">{page}</span> of{" "}
            <span className="font-semibold text-gray-900">{totalPages}</span>
          </span>

          <button
            disabled={page === totalPages}
            onClick={() => setPage((p) => p + 1)}
            className="inline-flex items-center gap-1 rounded-xl border border-gray-300 px-4 py-2 text-sm hover:bg-gray-50 disabled:opacity-40"
          >
            {" "}
            Next <ChevronRight className="h-4 w-4" />{" "}
          </button>
        </div>
      </main>
    </div>
  );
};
