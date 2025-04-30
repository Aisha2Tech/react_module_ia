import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function DELETE(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  await prisma.consultation.delete({ where: { id } });
  return NextResponse.json({ success: true });
}

export async function PATCH(
  req: Request,
  context: { params: { id: string } }
) {
  const { id } = context.params;
  const body = await req.json();

  const updated = await prisma.consultation.update({
    where: { id },
    data: {
      notes: body.notes,
      date: new Date(body.date),
    },
  });

  return NextResponse.json(updated);
}
