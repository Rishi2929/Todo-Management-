interface Props {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
  userName: string;
}

export const DeleteUserModal = ({ open, onClose, onConfirm, userName }: Props) => {
  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-96 space-y-4">
        <h2 className="text-lg font-semibold">Delete User</h2>
        <p className="text-sm text-gray-600">
          Are you sure you want to delete <strong>{userName}</strong>?
        </p>

        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="px-3 py-1 border rounded">
            Cancel
          </button>

          <button onClick={onConfirm} className="px-3 py-1 bg-red-600 text-white rounded">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};
