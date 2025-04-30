"use client";
import ConfirmModal from "@/components/ConfirmModal";
import { useEffect, useState } from "react";

type Patient = {
  id: string;
  name: string;
  email: string;
  birthDate: string;
};

export default function PatientsPage() {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [form, setForm] = useState({ name: "", email: "", birthDate: "" });
  const [showModal, setShowModal] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState<Patient | null>(null);


  const fetchPatients = async () => {
    const res = await fetch("/api/patients");
    const data = await res.json();
    setPatients(data);
  };

  const addPatient = async () => {
    await fetch("/api/patients", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setForm({ name: "", email: "", birthDate: "" });
    fetchPatients();
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  return (
    <>
      <main className="p-8 max-w-xl mx-auto">
        <h1 className="text-2xl font-bold text-blue-700 mb-6">📋 Liste des patients</h1>
  
        <ul className="space-y-2 mb-8">
          {patients.map((p) => (
            <li key={p.id} className="border p-3 rounded bg-gray-50 flex justify-between items-center">
              <span>
                <strong>{p.name}</strong> – {p.email} – {new Date(p.birthDate).toLocaleDateString()}
              </span>
              <button
                onClick={() => {
                  setSelectedPatient(p);
                  setShowModal(true);
                }}
                className="text-red-600 hover:text-red-800 text-sm"
              >
                🗑 Supprimer
              </button>
            </li>
          ))}
        </ul>
  
        <h2 className="text-xl font-semibold mb-4">➕ Ajouter un patient</h2>
        <div className="space-y-3 mb-4">
          <input
            className="border p-2 w-full rounded"
            placeholder="Nom"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
          />
          <input
            className="border p-2 w-full rounded"
            placeholder="Email"
            type="email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            className="border p-2 w-full rounded"
            type="date"
            value={form.birthDate}
            onChange={(e) => setForm({ ...form, birthDate: e.target.value })}
          />
        </div>
        <button
          onClick={addPatient}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Enregistrer
        </button>
      </main>
  
      {/* ✅ Inclure la modale ici dans le JSX */}
      <ConfirmModal
        isOpen={showModal}
        patientName={selectedPatient?.name || ""}
        onCancel={() => {
          setShowModal(false);
          setSelectedPatient(null);
        }}
        onConfirm={async () => {
          if (selectedPatient) {
            await fetch(`/api/patients/${selectedPatient.id}`, { method: "DELETE" });
            setShowModal(false);
            setSelectedPatient(null);
            fetchPatients();
          }
        }}
      />
    </>
  );
  
}
