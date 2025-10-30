import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

const PROTECTED_PATHS = ["/dashboard"];

export function proxy(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Only protect admin pages
    if (PROTECTED_PATHS.some((path) => pathname.startsWith(path))) {
        const token = req.cookies.get("token")?.value || req.headers.get("authorization")?.split(" ")[1];

        if (!token) {
            const url = req.nextUrl.clone();
            url.pathname = "/admin";
            return NextResponse.redirect(url);
        }

        try {
            jwt.verify(token, process.env.JWT_SECRET!);
            return NextResponse.next();
        } catch {
            const url = req.nextUrl.clone();
            url.pathname = "/admin";
            return NextResponse.redirect(url);
        }
    }

    return NextResponse.next();
}

// Limit middleware scope
export const config = {
    matcher: ["/admin/:path*"],
};
