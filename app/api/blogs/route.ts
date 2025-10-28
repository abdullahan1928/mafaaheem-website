// app/api/blogs/route.ts  (App Router server route)
// or pages/api/blogs.ts with minor export change
import { NextResponse } from "next/server";

const CACHE_TTL_SECONDS = Number(process.env.WP_BLOGS_CACHE_TTL || 300); // 5 minutes default

// Very small in-memory cache. Suitable for dev or simple deployments.
// For production use Redis or a DB-backed cache.
let cache: { ts: number; data: any } | null = null;

function normalizeSiteSlug(raw?: string) {
    if (!raw) return "";
    // remove protocol, trailing slash, and space
    return raw.trim().replace(/^https?:\/\//, "").replace(/\/+$/, "");
}

export async function GET() {
    try {
        // Return cached copy if fresh
        if (cache && Date.now() - cache.ts < CACHE_TTL_SECONDS * 1000) {
            return NextResponse.json(cache.data);
        }

        const token = process.env.WP_ACCESS_TOKEN;
        const rawSite = process.env.WP_SITE_SLUG;
        if (!token || !rawSite) {
            return NextResponse.json(
                { error: "WP_ACCESS_TOKEN or WP_SITE_SLUG not configured on server" },
                { status: 500 },
            );
        }

        console.log("token", token)
        console.log("rawSite", rawSite)

        const site = normalizeSiteSlug(rawSite);
        // Use WP REST API v2 endpoint for posts
        const url =
            `https://public-api.wordpress.com/wp/v2/sites/${encodeURIComponent(site)}/posts?per_page=20&_fields=id,date,slug,title,excerpt,content,jetpack_featured_media_url,link`;

        const res = await fetch(url, {
            headers: {
                Authorization: `Bearer ${token}`,
                Accept: "application/json",
            },
        });

        if (!res.ok) {
            const text = await res.text();
            console.error("WP API error", res.status, text);
            return NextResponse.json({ error: "Failed to fetch posts from WP" }, { status: res.status });
        }

        const posts = await res.json();

        // Transform and sanitize basic shape. Do not remove HTML from content here, return content raw,
        // but sanitize on server or carefully on client when injecting into DOM.
        const formatted = posts.map((p: any) => ({
            id: p.id,
            title: p.title?.rendered || "",
            excerpt: p.excerpt?.rendered || "",
            content: p.content?.rendered || "",
            date: p.date,
            slug: p.slug,
            image: p.jetpack_featured_media_url || null,
            url: p.link || null,
        }));

        // Cache it
        cache = { ts: Date.now(), data: formatted };

        const response = NextResponse.json(formatted);
        // Add cache-control header for proxies, browsers
        response.headers.set("Cache-Control", `public, s-maxage=${CACHE_TTL_SECONDS}, stale-while-revalidate=60`);
        return response;
    } catch (err) {
        console.error("Error in /api/blogs", err);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
