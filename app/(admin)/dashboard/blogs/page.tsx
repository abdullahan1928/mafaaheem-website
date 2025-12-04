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
import { DashboardPagination } from "@/components/dashboard/dashboard-pagination";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "published" | "draft">("all");
  const [deleteBlog, setDeleteBlog] = useState<IBlog | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(6);

  // Fetch blogs
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

  // Reset page when search or filter changes
  useEffect(() => {
    setPage(1);
  }, [search, statusFilter]);

  // Filter blogs
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

  // Paginate filtered blogs
  const paginatedBlogs = useMemo(() => {
    const start = (page - 1) * limit;
    return filteredBlogs.slice(start, start + limit);
  }, [filteredBlogs, page, limit]);

  // Delete blog
  const confirmDelete = async () => {
    if (!deleteBlog) return;
    setDeleting(true);
    try {
      await fetch(`/api/blogs/${deleteBlog.slug}`, { method: "DELETE" });
      setBlogs((prev) => prev.filter((b) => b.slug !== deleteBlog.slug));
      setDeleteBlog(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-mafaaheem-brown">Blogs</h1>
          <Link href={ROUTES.DASHBOARD.BLOGS.NEW}>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Blog
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search blogs..."
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
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3">
          {paginatedBlogs.map((blog) => {
            const isRTL = blog.language === "ur" || blog.language === "ar";

            return (
              <Card
                key={blog._id}
                className="overflow-hidden hover:shadow-lg transition-all flex flex-col"
                dir={isRTL ? "rtl" : "ltr"}
              >
                {blog.image && (
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={blog.image}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}

                <CardHeader className={cn(isRTL && "text-right")}>
                  <CardTitle
                    className={cn(
                      "prose text-lg line-clamp-2 urdu-italic text-mafaaheem-brown",
                      blog.language === "ur" ? "urdu" : "",
                      blog.language === "ar" ? "arabic" : ""
                    )}
                    dangerouslySetInnerHTML={{ __html: blog.title }}
                  />
                </CardHeader>

                <CardContent className="flex flex-col justify-between flex-1 space-y-4">
                  <p className="text-xs text-mafaaheem-gold">
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

                  <div className="flex justify-between border-t pt-4 mt-auto">
                    <Link href={ROUTES.DASHBOARD.BLOGS.EDIT(blog.slug)}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteBlog(blog)}
                    >
                      Delete
                    </Button>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-20">No blogs found.</p>
      )}

      {/* Pagination */}
      <DashboardPagination
        page={page}
        limit={limit}
        total={filteredBlogs.length}
        onPageChange={setPage}
      />

      {/* Delete Dialog */}
      <Dialog open={!!deleteBlog} onOpenChange={() => setDeleteBlog(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Blog</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this blog? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteBlog(null)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDelete}
              disabled={deleting}
            >
              {deleting ? "Deleting..." : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
