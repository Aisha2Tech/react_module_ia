import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET : liste toutes les consultations (avec nom du patient)
export async function GET() {
  const consultations = await prisma.consultation.findMany({
    include: {
      patient: true,
    },
    orderBy: { date: "desc" },
  });

  return NextResponse.json(consultations);
}

// POST : ajoute une consultation
export async function POST(req: Request) {
  const data = await req.json();

  const newConsultation = await prisma.consultation.create({
    data: {
      date: new Date(),
      notes: data.notes || "...",
      diagnostic: data.diagnostic || "",
      observations: data.observations || "",
      recommandation: data.recommandation || "",
      patientId: data.patientId,
    },
  });

  return NextResponse.json(newConsultation);
}


