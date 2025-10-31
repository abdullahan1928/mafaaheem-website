import connectDB from "@/lib/mongodb";
import Blog from "@/models/Blog";
import { NextResponse } from "next/server";

// export async function GET(
//   request: Request,
//   { params }: { params: Promise<{ id: string; }> }
// ) {
//   try {
//     const { id } = await params;
//     console.log("id", id)
//     const response = await fetch(
//       `https://public-api.wordpress.com/wp/v2/sites/${process.env.WP_SITE_SLUG}/posts?slug=${id}&_embed`,
//       {
//         headers: {
//           Authorization: `Bearer ${process.env.WP_ACCESS_TOKEN}`,
//         },
//       }
//     );

//     if (!response.ok) {
//       throw new Error("Failed to fetch blog");
//     }

//     const post = (await response.json())[0];

//     console.log("post", post)

//     const formatted = {
//       id: post.id,
//       title: post.title.rendered,
//       content: post.content.rendered,
//       date: post.date,
//       image: post.jetpack_featured_media_url,
//     };

//     return NextResponse.json(formatted);
//   } catch (error) {
//     console.error(error);
//     return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
//   }
// }

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string; }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const blog = await Blog.findOne({ slug: id });

    if (!blog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(blog);
  } catch (error) {
    return NextResponse.json(
      { message: "Error fetching blog", error },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string; }> }
) {
  try {
    await connectDB();
    const { id } = await params;
    const data = await request.json();

    const updatedBlog = await Blog.findOneAndUpdate(
      { slug: id },
      data,
      { new: true }
    );

    if (!updatedBlog) {
      return NextResponse.json({ message: "Blog not found" }, { status: 404 });
    }

    return NextResponse.json(updatedBlog);
  } catch (error) {
    return NextResponse.json(
      { message: "Error updating blog", error },
      { status: 500 }
    );
  }
}