import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { name, phone, attending, guests, message } = body;

    if (!name || !phone) {
      return NextResponse.json(
        { error: "Name and phone are required" },
        { status: 400 }
      );
    }

    const rsvp = await prisma.rSVP.create({
      data: {
        name,
        phone,
        attending,
        guests: attending ? guests : 0,
        message,
      },
    });

    return NextResponse.json({ success: true, rsvp });
  } catch (error) {
    console.error("RSVP Error:", error);
    return NextResponse.json(
      { error: "Failed to submit RSVP" },
      { status: 500 }
    );
  }
}
