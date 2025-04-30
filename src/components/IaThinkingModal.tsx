"use client";

type Props = {
  isOpen: boolean;
  message?: string;
};

export default function IaThinkingModal({ isOpen, message }: Props) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-2xl shadow-xl flex flex-col items-center animate-fade-in-slide-up">
        <div className="w-10 h-10 border-4 border-blue-500 border-dashed rounded-full animate-spin mb-4"></div>
        <p className="text-sm text-gray-700 text-center">
          {message || "Génération de la fiche en cours..."}
        </p>
      </div>
    </div>
  );
}
