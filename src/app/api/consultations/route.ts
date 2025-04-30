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
      patientId: data.patientId,
      date: new Date(data.date),
      notes: data.notes,
    },
  });

  return NextResponse.json(newConsultation);
}
