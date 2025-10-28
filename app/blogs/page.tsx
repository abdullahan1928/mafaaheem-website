// "use client";

// import Image from "next/image";
// import Link from "next/link";

// const blogs = [
//     {
//         id: 1,
//         title: "The Light of Knowledge in a Confused Age",
//         excerpt:
//             "How divine knowledge nurtures clarity and tranquility amidst the chaos of modern life.",
//         image: "/blogs/knowledge.jpg",
//         slug: "light-of-knowledge",
//     },
//     {
//         id: 2,
//         title: "Balancing Spirituality and Productivity",
//         excerpt:
//             "A reflection on how the Prophet ﷺ balanced worship, family, and service to humanity.",
//         image: "/blogs/balance.jpg",
//         slug: "spirituality-productivity",
//     },
//     {
//         id: 3,
//         title: "The Power of Intention in Everyday Life",
//         excerpt:
//             "Discover how renewing your niyyah transforms even mundane actions into acts of worship.",
//         image: "/blogs/intention.jpg",
//         slug: "power-of-intention",
//     },
// ];

// export default function BlogsPage() {
//     return (
//         <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-6 md:px-12 lg:px-24">
//             {/* Header */}
//             <div className="text-center max-w-3xl mx-auto mb-16">
//                 <h1 className="text-4xl md:text-5xl font-bold text-mafaaheem-brown mb-4 tracking-tight">
//                     Reflections & Articles
//                 </h1>
//                 <p className="text-muted-foreground text-lg">
//                     Insights, reflections, and writings inspired by the Quran, Sunnah, and Islamic scholarship.
//                 </p>
//             </div>

//             {/* Blogs Grid */}
//             <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-3">
//                 {blogs.map((blog) => (
//                     <article
//                         key={blog.id}
//                         className="group flex flex-col bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden border border-mafaaheem-gold/10 hover:shadow-md transition-all"
//                     >
//                         {blog.image && (
//                             <div className="relative w-full h-56">
//                                 <Image
//                                     src={blog.image}
//                                     alt={blog.title}
//                                     fill
//                                     className="object-cover group-hover:scale-105 transition-transform duration-500"
//                                 />
//                             </div>
//                         )}
//                         <div className="p-6 flex flex-col flex-1">
//                             <h3 className="text-xl font-semibold mb-3 text-mafaaheem-brown group-hover:text-mafaaheem-gold transition-colors">
//                                 {blog.title}
//                             </h3>
//                             <p className="text-muted-foreground text-sm flex-1 leading-relaxed mb-4">
//                                 {blog.excerpt}
//                             </p>
//                             <Link
//                                 href={`/blogs/${blog.slug}`}
//                                 className="text-sm font-medium text-mafaaheem-gold hover:text-mafaaheem-brown transition-colors"
//                             >
//                                 Read More →
//                             </Link>
//                         </div>
//                     </article>
//                 ))}
//             </div>
//         </div>
//     );
// }


// app/blogs/page.tsx  (client component)
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
