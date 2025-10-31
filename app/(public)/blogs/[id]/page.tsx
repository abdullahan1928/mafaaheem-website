"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { IBlog } from "@/models/Blog";
import { Language } from "@/contexts/LanguageContext"

export default function BlogDetailPage() {
  const { id } = useParams();
  const [blog, setBlog] = useState<IBlog | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        console.log("data", data)
        setBlog(data);

        if (data.language !== "en") {
          setIsRTL(true)
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        Loading article...
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-muted-foreground">
        <p>Blog not found.</p>
        <Link
          href="/blogs"
          className="mt-4 text-mafaaheem-gold hover:text-mafaaheem-brown transition-colors"
        >
          ← Back to Blogs
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-6 md:px-12 lg:px-32">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1
          className={`text-3xl md:text-5xl font-bold text-mafaaheem-brown mb-6 leading-tight ${blog.language === "ur" && "urdu"} ${blog.language === "ar" && "arabic"}`}
          dangerouslySetInnerHTML={{ __html: blog.title }}
        />
        <p className="text-sm text-muted-foreground">
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Featured Image */}
      {blog.image && (
        <div className="max-w-4xl mx-auto mb-12 rounded-3xl overflow-hidden shadow-md border border-mafaaheem-gold/10">
          <Image
            src={blog.image}
            alt="Featured"
            width={1200}
            height={600}
            className="object-cover w-full h-auto"
            priority
          />
        </div>
      )}

      {/* Blog Content */}
      <article
        className={`prose max-w-4xl mx-auto text-justify leading-relaxed prose-headings:text-mafaaheem-brown prose-p:text-muted-foreground prose-a:text-mafaaheem-gold hover:prose-a:text-mafaaheem-brown prose-img:rounded-2xl prose-img:shadow-sm ${isRTL && "!text-right"} ${blog.language === "ur" && "urdu"} ${blog.language === "ar" && "arabic"}`}
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />

      {/* Back link */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <Link
          href="/blogs"
          className="text-mafaaheem-gold hover:text-mafaaheem-brown transition-colors font-medium"
        >
          ← Back to all blogs
        </Link>
      </div>
    </div>
  );
}
