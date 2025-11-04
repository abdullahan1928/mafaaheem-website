import { NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import Course from "@/models/Course";

export async function GET(request: Request) {
  try {
    await connectDB();
    const url = new URL(request.url);
    const page = Math.max(1, Number(url.searchParams.get("page") || 1));
    const limit = Math.min(50, Number(url.searchParams.get("limit") || 12));
    const q = url.searchParams.get("q") || "";
    const category = url.searchParams.get("category") || null;
    const lang = url.searchParams.get("lang") || null;

    const filter: any = {};
    if (category) filter.category = category;
    if (q) {
      // search in translations.title.en etc, simple regex search
      filter.$or = [
        { "translations.title.en": { $regex: q, $options: "i" } },
        { "translations.title.ur": { $regex: q, $options: "i" } },
        { "translations.title.ar": { $regex: q, $options: "i" } },
        { "translations.description.en": { $regex: q, $options: "i" } },
        { "translations.description.ur": { $regex: q, $options: "i" } },
        { "translations.description.ar": { $regex: q, $options: "i" } },
      ];
    }

    const total = await Course.countDocuments(filter);
    const courses = await Course.find(filter)
      .sort({ featured: -1, createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .lean();

    return NextResponse.json({ data: courses, meta: { total, page, limit } });
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
