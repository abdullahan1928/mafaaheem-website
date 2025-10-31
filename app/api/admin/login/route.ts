import { NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import Admin from "@/models/Admin";
import connectDB from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    await connectDB();
    const { email, password } = await req.json();
    const admin = await Admin.findOne({ email });
    console.log("admin", admin)
    if (!admin) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

    const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET!, { expiresIn: "1d" });

    return NextResponse.json({ token });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Something went wrong" }, { status: 500 });
  }
}
