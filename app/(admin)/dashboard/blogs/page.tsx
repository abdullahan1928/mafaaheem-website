"use client";

import { useEffect, useState, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import Link from "next/link";
import { IBlog } from "@/models/Blog";
import { ROUTES } from "@/routes";
import { Plus, Search, Filter } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [currentPage, setCurrentPage] = useState(1);

  const blogsPerPage = 6;

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await fetch("/api/blogs");
        const data = await res.json();
        setBlogs(data);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      }
    };
    fetchBlogs();
  }, []);

  const filteredBlogs = useMemo(() => {
    return blogs.filter((blog) => {
      const matchesSearch = blog.title.toLowerCase().includes(search.toLowerCase());
      const matchesStatus =
        statusFilter === "all"
          ? true
          : statusFilter === "published"
            ? blog.published
            : !blog.published;
      return matchesSearch && matchesStatus;
    });
  }, [blogs, search, statusFilter]);

  const totalPages = Math.ceil(filteredBlogs.length / blogsPerPage);
  const paginatedBlogs = filteredBlogs.slice(
    (currentPage - 1) * blogsPerPage,
    currentPage * blogsPerPage
  );

  const handlePrev = () => setCurrentPage((prev) => Math.max(prev - 1, 1));
  const handleNext = () => setCurrentPage((prev) => Math.min(prev + 1, totalPages));

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="sticky top-0 z-10 bg-background/80 backdrop-blur-md border-b pb-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Manage Blogs</h1>
            <p className="text-sm text-muted-foreground">
              View, edit, and publish your blog posts.
            </p>
          </div>
          <Link href={ROUTES.DASHBOARD.BLOGS.NEW}>
            <Button size="sm" className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add New Blog
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="mt-4 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search by title..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select
            value={statusFilter}
            onValueChange={(value) =>
              setStatusFilter(value as "all" | "published" | "draft")
            }
          >
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              <SelectItem value="published">Published</SelectItem>
              <SelectItem value="draft">Draft</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Blog Grid */}
      {paginatedBlogs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedBlogs.map((blog) => {
            const isRTL = blog.language === 'ur' || blog.language === 'ar';

            return (
              <Card
                key={blog._id}
                className={`overflow-hidden border border-border/60 hover:shadow-md transition-all duration-200 ${isRTL && "text-right"}`}
              >
                {/* Image */}
                {blog.image && (
                  <div className="relative h-40 overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      width={100}
                      height={100}
                      className="object-cover w-full h-full transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle
                    className={cn(
                      "prose text-lg line-clamp-2 urdu-italic",
                      blog.language === "ur" ? "urdu" : "",
                      blog.language === "ar" ? "arabic" : ""
                    )}
                    dangerouslySetInnerHTML={{ __html: blog.title }}
                  />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-2">
                    {new Date(blog.createdAt).toLocaleDateString()}
                  </p>
                  <p
                    className={cn(
                      "prose text-sm text-muted-foreground line-clamp-3 mb-4",
                      blog.language === "ur" ? "urdu" : "",
                      blog.language === "ar" ? "arabic" : ""
                    )}
                    dangerouslySetInnerHTML={{ __html: blog.content }}
                  />
                  <div className="flex justify-between items-center">
                    <Link href={ROUTES.DASHBOARD.BLOGS.EDIT(blog.slug)}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      size="sm"
                      variant={blog.published ? "default" : "secondary"}
                      className={cn(
                        "capitalize px-3",
                        blog.published
                          ? "bg-emerald-500/90 hover:bg-emerald-500"
                          : "bg-muted"
                      )}
                    >
                      {blog.published ? "Published" : "Draft"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-20 text-center opacity-70">
          <p className="text-lg font-medium mb-1">No blogs found</p>
          <p className="text-sm text-muted-foreground mb-4">
            Try adjusting your filters or create a new blog.
          </p>
          <Link href={ROUTES.DASHBOARD.BLOGS.NEW}>
            <Button size="sm">
              <Plus className="w-4 h-4 mr-2" /> Create Blog
            </Button>
          </Link>
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center items-center gap-3 pt-6 border-t">
          <Button
            size="sm"
            variant="outline"
            onClick={handlePrev}
            disabled={currentPage === 1}
          >
            Previous
          </Button>
          <p className="text-sm">
            Page <span className="font-semibold">{currentPage}</span> of{" "}
            <span className="font-semibold">{totalPages}</span>
          </p>
          <Button
            size="sm"
            variant="outline"
            onClick={handleNext}
            disabled={currentPage === totalPages}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  );
}
