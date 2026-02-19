import { useState } from "react";
import { useDeleteTodo } from "../hooks";
import type { Todo } from "../types";
import { toast } from "react-hot-toast";

interface Props {
  todo: Todo;
}

export const TodoItem = ({ todo }: Props) => {
  const [confirmOpen, setConfirmOpen] = useState(false);
  const { mutateAsync } = useDeleteTodo();

  const handleDelete = async () => {
    try {
      await mutateAsync(todo._id);
      toast.success("Todo deleted");
      setConfirmOpen(false);
    } catch {
      toast.error("Delete failed");
    }
  };

  return (
    <div className="border rounded-md p-4 flex justify-between items-center">
      <div>
        <h3 className="font-semibold">{todo.title}</h3>
        <p className="text-sm text-gray-500">{todo.description}</p>
      </div>

      <button onClick={() => setConfirmOpen(true)} className="text-red-600 text-sm">
        Delete
      </button>

      {confirmOpen && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg space-y-4">
            <p>Are you sure you want to delete?</p>
            <div className="flex justify-end gap-3">
              <button onClick={() => setConfirmOpen(false)} className="px-3 py-1 border rounded">
                Cancel
              </button>
              <button onClick={handleDelete} className="px-3 py-1 bg-red-600 text-white rounded">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
