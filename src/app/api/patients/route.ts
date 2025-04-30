import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const patients = await prisma.patient.findMany();
  return NextResponse.json(patients);
}

export async function POST(req: Request) {
  const data = await req.json();

  const newPatient = await prisma.patient.create({
    data: {
      name: data.name,
      email: data.email,
      birthDate: new Date(data.birthDate),
    },
  });

  return NextResponse.json(newPatient);
}
     