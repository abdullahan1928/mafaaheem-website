import { NextResponse } from "next/server";
import Event from "@/models/Event";
import connectDB from "@/lib/mongodb";

export async function GET() {
  try {
    await connectDB();
    const events = await Event.find().sort({ date: 1 });
    return NextResponse.json(events);
  } catch (error) {
    return NextResponse.json({ message: "Error getting events", error }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const event = await Event.create(body);
    return NextResponse.json(event);
  } catch (error) {
    return NextResponse.json({ message: "Error adding event", error }, { status: 500 });
  }
}
