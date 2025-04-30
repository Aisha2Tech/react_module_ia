"use client";
import { useEffect, useState } from "react";

type Props = {
  isOpen: boolean;
  consultation: {
    id: string;
    patient: { name: string };
    notes: string;
    date: string;
  } | null;
  onCancel: () => void;
  onConfirm: (updated: { notes: string; date: string }) => void;
};

export default function EditConsultationModal({ isOpen, consultation, onCancel, onConfirm }: Props) {
  if (!isOpen || !consultation) return null;

  const [notes, setNotes] = useState(consultation.notes);
  const [date, setDate] = useState(consultation.date.split("T")[0]);

  return (
    <div className="fixed inset-0 bg-black/30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-xl shadow-lg max-w-md w-full">
        <h2 className="text-lg font-bold mb-2">📝 Modifier la consultation</h2>
        <p className="text-sm text-gray-600 mb-4">
          Patient : <strong>{consultation.patient.name}</strong>
        </p>
        <div className="space-y-3">
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full border rounded p-2"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            className="w-full border rounded p-2"
            rows={4}
          />
        </div>
        <div className="flex justify-end gap-3 mt-6">
          <button onClick={onCancel} className="px-4 py-2 rounded bg-gray-200 hover:bg-gray-300">
            Annuler
          </button>
          <button
            onClick={() => onConfirm({ notes, date })}
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
