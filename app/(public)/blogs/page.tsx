"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CalendarDays, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useLanguage } from "@/contexts/LanguageContext";
import type { IBlog } from "@/models/Blog";
import { blogsContent } from "@/data/blogs";
import { formatDateWithLanguage } from "@/lib/date";

export default function BlogsPage() {
  const { language, isRTL } = useLanguage();
  const content = blogsContent[language];

  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // UI local filters
  const [search, setSearch] = useState("");
  const [filterLanguage, setFilterLanguage] = useState<"all" | "en" | "ur" | "ar">("all");

  useEffect(() => {
    let mounted = true;
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        if (!res.ok) throw new Error("Failed to fetch blogs");
        const data = await res.json();
        if (mounted) setBlogs(data);
      } catch (e: any) {
        console.error(e);
        if (mounted) setErr(content.noBlogs);
      } finally {
        if (mounted) setLoading(false);
      }
    };
    fetchBlogs();
    return () => {
      mounted = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // fetch once

  // filter + search (client-side)
  const filteredBlogs = useMemo(() => {
    return blogs.filter((b) => {
      const matchesLang = filterLanguage === "all" || b.language === filterLanguage;
      const searchable = (stripHtml(b.title) + " " + stripHtml(b.excerpt || b.content || ""))
        .toLowerCase();
      const matchesSearch = searchable.includes(search.trim().toLowerCase());
      return matchesLang && matchesSearch;
    });
  }, [blogs, filterLanguage, search]);

  return (
    <div
      className="min-h-screen bg-gradient-to-b from-mafaaheem-beige/10 via-background to-background text-foreground pt-24 pb-20 px-6 md:px-10 lg:px-16"
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="max-w-5xl mx-auto text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-extrabold text-mafaaheem-brown mb-3 urdu-italic">
          {content.heading}
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          {content.subtitle}
        </p>
      </div>

      {/* Search & Filters */}
      <div className="max-w-4xl mx-auto mb-10 flex flex-col sm:flex-row items-center gap-4 justify-between">
        <div className="relative w-full sm:w-2/3">
          <Search className={`absolute left-3 top-3 h-4 w-4 text-muted-foreground`} />
          <Input
            type="text"
            placeholder={content.searchPlaceholder}
            className={`pl-9 ${isRTL ? "text-right" : "text-left"}`}
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            aria-label={content.searchPlaceholder}
          />
        </div>

        <div className="flex gap-2">
          {[
            { key: "all", label: content.filterAll },
            { key: "en", label: content.filterEnglish },
            { key: "ar", label: content.filterArabic },
            { key: "ur", label: content.filterUrdu },
          ].map((opt) => (
            <Button
              key={opt.key}
              size="sm"
              variant={filterLanguage === (opt.key as any) ? "default" : "outline"}
              onClick={() => setFilterLanguage(opt.key as any)}
              className="capitalize"
            >
              {opt.label}
            </Button>
          ))}
        </div>
      </div>

      {/* States */}
      {loading && (
        <div className="flex items-center justify-center py-20 text-muted-foreground">
          {content.loadingAll}
        </div>
      )}

      {err && <div className="text-center text-red-600 py-8">{err}</div>}

      {!loading && filteredBlogs.length === 0 && (
        <div className="text-center text-muted-foreground py-20 text-lg">
          {content.noBlogs}
        </div>
      )}

      {/* Blog Grid */}
      {!loading && filteredBlogs.length > 0 && (
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {filteredBlogs.map((blog) => (
            <article
              key={blog._id}
              className="flex flex-col bg-white dark:bg-muted rounded-3xl overflow-hidden border border-mafaaheem-gold/10 shadow-sm"
              dir={blog.language === "ar" || blog.language === "ur" ? "rtl" : "ltr"}
            >
              {/* Image */}
              <div className="relative w-full h-56 overflow-hidden">
                {blog.image ? (
                  <Image
                    src={blog.image}
                    alt={stripHtml(blog.title) || "article image"}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-mafaaheem-beige/30 to-mafaaheem-brown/10 flex items-center justify-center text-muted-foreground">
                    No image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className={`p-5 flex flex-col flex-1 ${blog.language === "ar" || blog.language === "ur" ? "text-right" : "text-left"}`}>
                <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
                  <CalendarDays className="w-4 h-4" />
                  <time aria-label={content.dateAria}>{formatDateWithLanguage(blog.createdAt, blog.language)}</time>
                </div>

                <h3
                  className={`!text-2xl font-semibold text-mafaaheem-brown leading-snug mb-4 line-clamp-2 urdu-italic ${blog.language === "ur" && "urdu italic"} ${blog.language === "ar" && "arabic"}`}
                  dangerouslySetInnerHTML={{ __html: blog.title }}
                />

                <div
                  className={`prose !text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4 ${blog.language === "ur" && "urdu"} ${blog.language === "ar" && "arabic"}`}
                  dangerouslySetInnerHTML={{ __html: blog.content }}
                />

                <div className="mt-auto pt-3 border-t border-muted/20 flex justify-between items-center">
                  <Link
                    href={`/blogs/${blog.slug}`}
                    className={`text-mafaaheem-brown font-semibold hover:underline w-full ${isRTL && "text-left"}`}
                  >
                    {content.readMore}
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

function stripHtml(html = "") {
  return (html || "").replace(/<[^>]+>/g, "");
}
