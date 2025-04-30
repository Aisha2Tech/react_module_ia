"use client";

type ConfirmModalProps = {
  isOpen: boolean;
  patientName: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmModal({
  isOpen,
  patientName,
  onConfirm,
  onCancel,
}: ConfirmModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div
        className="bg-white p-6 rounded-xl shadow-lg max-w-sm w-full animate-fade-in-slide-up"
      >
        <h2 className="text-lg font-semibold mb-4">
          ❗️ Supprimer {patientName} ?
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Cette action est irréversible. Confirmez-vous la suppression ?
        </p>
        <div className="flex justify-end gap-3">
          <button
            onClick={onCancel}
            className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300"
          >
            Annuler
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 rounded bg-red-600 text-white hover:bg-red-700"
          >
            Supprimer
          </button>
        </div>
      </div>
    </div>
  );
}
