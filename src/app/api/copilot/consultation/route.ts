import { generateConsultationNotes } from "@/lib/copilot-runtime";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  console.log("📥 Reçu requête Copilot");

  try {
    const { symptoms } = await req.json();
    console.log("💬 Symptômes :", symptoms);

    const notes = await generateConsultationNotes(symptoms);
    console.log("🧠 Notes générées :", notes);

    return NextResponse.json({ notes });
  } catch (error) {
    console.error("❌ Erreur IA :", error);
    return NextResponse.json({ error: "Erreur IA" }, { status: 500 });
  }
}
