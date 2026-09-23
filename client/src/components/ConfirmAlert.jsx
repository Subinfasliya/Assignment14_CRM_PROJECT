import Button from "./ui/Button";

const ConfirmAlert = ({
  open,
  title,
  message,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  loading = false,
}) => {
  if (!open) {
    return null;
  }

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget && !loading) {
          onCancel();
        }
      }}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 shadow-xl"
        role="alertdialog"
        aria-modal="true"
        aria-labelledby="confirm-alert-title"
        aria-describedby="confirm-alert-message"
      >
        <h2 id="confirm-alert-title" className="text-xl font-bold text-gray-900">
          {title}
        </h2>
        <p id="confirm-alert-message" className="mt-2 text-gray-600">
          {message}
        </p>

        <div className="mt-6 flex justify-end gap-3">
          <Button
            variant="secondary"
            onClick={onCancel}
            disabled={loading}
          >
            {cancelLabel}
          </Button>
          <Button
            variant="danger"
            onClick={onConfirm}
            disabled={loading}
          >
            {loading ? "Signing out..." : confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmAlert;
