import { NextResponse } from "next/server";
import Blog from "@/models/Blogs";
import jwt from "jsonwebtoken";

export async function POST(req: Request) {
  try {
    const token = req.headers.get("authorization")?.split(" ")[1];
    if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    jwt.verify(token, process.env.JWT_SECRET!);

    const body = await req.json();
    const blog = await Blog.create(body);
    return NextResponse.json(blog);
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "Failed to create blog" }, { status: 500 });
  }
}

export async function GET() {
  try {
    const blogs = await Blog.find().sort({ date: -1 });
    return NextResponse.json(blogs);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch blogs" }, { status: 500 });
  }
}