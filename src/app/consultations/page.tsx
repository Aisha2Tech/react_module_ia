"use client";
import EditConsultationModal from "@/components/EditConsultationModal";
import { useEffect, useState } from "react";
import { generateConsultationNotes } from "@/lib/copilot-runtime";
import IaThinkingModal from "@/components/IaThinkingModal";


type Patient = {
  id: string;
  name: string;
};

type Consultation = {
  id: string;
  date: string;
  notes: string;
  patient: Patient;
};

export default function ConsultationsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [form, setForm] = useState({ patientId: "", date: "", notes: "" });
  const [showEditModal, setShowEditModal] = useState(false);
  const [consultationToEdit, setConsultationToEdit] = useState<Consultation | null>(null);
  const [loadingIa, setLoadingIa] = useState(false);
  const [ficheIA, setFicheIA] = useState({
    diagnostic: "",
    observations: "",
    recommandation: ""
  });
  

  useEffect(() => {
    fetchPatients();
    fetchConsultations();
  }, []);

  const fetchPatients = async () => {
    const res = await fetch("/api/patients");
    const data = await res.json();
    setPatients(data);
  };

  const fetchConsultations = async () => {
    const res = await fetch("/api/consultations");
    const data = await res.json();
    setConsultations(data);
  };

  const addConsultation = async () => {
    

    const finalNotes = form.notes || `
    Diagnostic : ${ficheIA.diagnostic}

    Observations : ${ficheIA.observations}

    Recommandation : ${ficheIA.recommandation}
    `.trim();

    await fetch("/api/consultations", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...form, notes: finalNotes }),
    });

  };

  return (
    <main className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold text-indigo-700 mb-6">📖 Consultations</h1>

      <ul className="space-y-4 mb-8">
      {consultations.map((c) => (
        <li key={c.id} className="p-4 border rounded bg-white shadow-sm flex justify-between items-start">
            <div>
            <p>
                <strong>🧑 {c.patient.name}</strong> – 🗓 {new Date(c.date).toLocaleDateString()}
            </p>
            <p className="text-gray-700 mt-1">📝 {c.notes}</p>
            </div>
            <button
            onClick={async () => {
                const confirmed = window.confirm(`Supprimer la consultation du ${new Date(c.date).toLocaleDateString()} ?`);
                if (!confirmed) return;

                await fetch(`/api/consultations/${c.id}`, {
                method: "DELETE",
                });
                fetchConsultations();
            }}
            className="text-red-500 hover:text-red-700 text-sm"
            >
            🗑
            </button>
                        <button
            onClick={() => {
                setConsultationToEdit(c);
                setShowEditModal(true);
            }}
            className="text-blue-500 hover:text-blue-700 text-sm mr-2"
            >
            ✏️
            </button>

        </li>
        ))}

      </ul>

      <h2 className="text-xl font-semibold mb-3">➕ Nouvelle consultation</h2>

      <div className="space-y-3 mb-4">
        <select
          className="border p-2 w-full rounded"
          value={form.patientId}
          onChange={(e) => setForm({ ...form, patientId: e.target.value })}
        >
          <option value="">-- Sélectionner un patient --</option>
          {patients.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          className="border p-2 w-full rounded"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />

<div className="space-y-1">
  <textarea
    className="border p-2 w-full rounded"
    placeholder="Notes de consultation"
    value={form.notes}
    onChange={(e) => setForm({ ...form, notes: e.target.value })}
  />

<p className="text-sm mt-2 bg-gray-50 p-2 rounded">
  <strong>🔎 Aperçu IA :</strong><br />
  {form.notes || "Aucune note générée"}
</p>

{ficheIA.diagnostic || ficheIA.observations || ficheIA.recommandation ? (
  <div className="mt-4 p-4 border rounded bg-gray-50 space-y-2 text-sm">
    <p><strong>🧠 Diagnostic :</strong><br />{ficheIA.diagnostic}</p>
    <p><strong>📝 Observations :</strong><br />{ficheIA.observations}</p>
    <p><strong>💊 Recommandation :</strong><br />{ficheIA.recommandation}</p>
  </div>
) : (
  <p className="text-sm text-gray-500">Aucune fiche IA générée.</p>
)}


<button
 onClick={async () => {
  const symptoms = prompt("Décris les symptômes");
  if (!symptoms) return;

  try {
    setLoadingIa(true);
    //const notes = await generateConsultationNotes(symptoms);
    const response = await generateConsultationNotes(symptoms);
    setFicheIA(response);

    //setForm({ ...form, notes });
  } catch (err) {
    alert("Erreur IA : voir console");
  } finally {
    setLoadingIa(false);
  }
}}
  className="text-sm text-blue-600 hover:underline"
>
  🧠 Générer fiche consultation IA
</button>



</div>

      </div>

      <button
        onClick={addConsultation}
        className="bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700"
      >
        Enregistrer
      </button>

      <EditConsultationModal
  isOpen={showEditModal}
  consultation={consultationToEdit}
  onCancel={() => {
    setShowEditModal(false);
    setConsultationToEdit(null);
  }}
  onConfirm={async (updated) => {
    if (consultationToEdit) {
      await fetch(`/api/consultations/${consultationToEdit.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updated),
      });
      setShowEditModal(false);
      setConsultationToEdit(null);
      fetchConsultations();
    }
  }}
/>
<IaThinkingModal isOpen={loadingIa} message="🤖 L'IA réfléchit à la fiche médicale..." />

    </main>
  );
}
