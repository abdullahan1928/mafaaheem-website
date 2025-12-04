import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Course from "@/models/Course";

export async function GET(request: Request) {
  try {
    await connectDB();
    const courses = await Course.find().sort({ date: -1 });
    return NextResponse.json(courses);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error getting courses", error: String(err) }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    // TODO: protect this route, require admin auth
    await connectDB();
    const body = await request.json();

    // Basic validation
    if (!body.slug || !body.translations?.title?.en || !body.category) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 });
    }

    const created = await Course.create(body);
    return NextResponse.json(created);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error creating course", error: String(err) }, { status: 500 });
  }
}
