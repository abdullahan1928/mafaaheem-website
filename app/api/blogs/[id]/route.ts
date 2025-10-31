import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string; }> }
) {
    try {
        const { id } = await params;
        console.log("id", id)
        const response = await fetch(
            `https://public-api.wordpress.com/wp/v2/sites/${process.env.WP_SITE_SLUG}/posts?slug=${id}&_embed`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.WP_ACCESS_TOKEN}`,
                },
            }
        );

        if (!response.ok) {
            throw new Error("Failed to fetch blog");
        }

        const post = (await response.json())[0];

        console.log("post", post)

        const formatted = {
            id: post.id,
            title: post.title.rendered,
            content: post.content.rendered,
            date: post.date,
            image: post.jetpack_featured_media_url,
        };

        return NextResponse.json(formatted);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
    }
}
