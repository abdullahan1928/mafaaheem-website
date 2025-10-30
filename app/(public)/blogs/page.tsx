"use client";

import { useEffect, useState } from "react";
  import Image from "next/image";
import Link from "next/link";

interface BlogPost {
  id: number;
  title: string;
  excerpt: string;
  slug: string;
  image?: string | null;
  date: string;
  url?: string | null;
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<BlogPost[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  useEffect(() => {
    let mounted = true;
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        if (mounted) setBlogs(data);
      } catch (e: any) {
        console.error(e);
        if (mounted) setErr("Unable to load articles right now");
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchBlogs();
    return () => {
      mounted = false;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-4 md:px-8 lg:px-12">
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-mafaaheem-brown mb-4">Reflections & Articles</h1>
        <p className="text-lg text-muted-foreground">Insights and writings from the Mafaaheem Institute.</p>
      </div>

      {loading && (
        <div className="flex items-center justify-center py-16">
          <div className="text-muted-foreground">Loading articles...</div>
        </div>
      )}

      {err && (
        <div className="text-center text-red-600 py-8">
          {err}
        </div>
      )}

      {!loading && blogs && blogs.length === 0 && (
        <div className="text-center text-muted-foreground py-16">No blogs found.</div>
      )}

      {!loading && blogs && blogs.length > 0 && (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {blogs.map((blog) => (
            <article key={blog.id} className="group flex flex-col bg-white rounded-2xl overflow-hidden border border-mafaaheem-gold/10 hover:shadow-md transition-all">
              {blog.image ? (
                <div className="relative w-full h-48">
                  <Image
                    src={blog.image}
                    alt={stripHtml(blog.title) || "article image"}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
              ) : (
                <div className="w-full h-48 bg-mafaaheem-beige/30 flex items-center justify-center text-muted-foreground">
                  No image
                </div>
              )}

              <div className="p-5 flex flex-col gap-3 flex-1">
                <h3 className="text-lg font-semibold text-mafaaheem-brown">
                  <span dangerouslySetInnerHTML={{ __html: blog.title }} />
                </h3>
                <div className="text-muted-foreground text-sm flex-1 leading-relaxed" dangerouslySetInnerHTML={{ __html: blog.excerpt }} />
                <div className="flex items-center justify-between mt-4">
                  <time className="text-sm text-muted-foreground">{formatDate(blog.date)}</time>
                  <Link href={`/blogs/${blog.slug}`} className="text-mafaaheem-brown font-semibold">
                    Read more
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      )}
    </div>
  );
}

// Helpers
function formatDate(iso?: string) {
  if (!iso) return "";
  try {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, { year: "numeric", month: "short", day: "numeric" });
  } catch {
    return iso;
  }
}

function stripHtml(html = "") {
  if (!html) return "";
  return html.replace(/<[^>]+>/g, "");
}
