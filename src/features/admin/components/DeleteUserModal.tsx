import { Loader2 } from "lucide-react";

interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
  isLoading: boolean;
}

export const DeleteUserModal = ({ open, onClose, onConfirm, userName, isLoading }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-96 space-y-4">
        <h2 className="text-lg font-semibold">Delete User</h2>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete <strong>{userName}</strong>?
        </p>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} disabled={isLoading} className="px-3 py-1 border rounded disabled:opacity-50">
            Cancel
          </button>

          <button
            onClick={onConfirm}
            disabled={isLoading}
            className="px-3 py-1 bg-red-600 text-white rounded inline-flex items-center gap-2 disabled:opacity-60"
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : "Delete"}
          </button>
        </div>
      </div>
    </div>
  );
};
