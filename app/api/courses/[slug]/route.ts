import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Course from "@/models/Course";

export async function GET(request: Request, { params }: { params: Promise<{ slug: string; }> }) {
  try {
    await connectDB();
    const { slug } = await params;
    const course = await Course.findOne({ slug }).lean();
    if (!course) return NextResponse.json({ message: "Course not found" }, { status: 404 });
    return NextResponse.json(course);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error fetching course", error: String(err) }, { status: 500 });
  }
}

export async function PUT(request: Request, { params }: { params: Promise<{ slug: string; }> }) {
  try {
    await connectDB();
    const { slug } = await params;
    const body = await request.json();
    const updated = await Course.findOneAndUpdate({ slug }, body, { new: true });
    if (!updated) return NextResponse.json({ message: "Course not found" }, { status: 404 });
    return NextResponse.json(updated);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error updating course", error: String(err) }, { status: 500 });
  }
}

export async function DELETE(request: Request, { params }: { params: Promise<{ slug: string; }> }) {
  try {
    await connectDB();
    const { slug } = await params;
    const removed = await Course.findOneAndDelete({ slug });
    if (!removed) return NextResponse.json({ message: "Course not found" }, { status: 404 });
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Error deleting course", error: String(err) }, { status: 500 });
  }
}
