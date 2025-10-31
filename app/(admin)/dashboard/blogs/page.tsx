"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import { IBlog } from "@/models/Blog";
import { ROUTES } from "@/routes";

export default function AdminBlogsPage() {
  const [blogs, setBlogs] = useState<IBlog[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await fetch("/api/blogs");
      const data = await res.json();
      setBlogs(data);
    };
    fetchBlogs();
  }, []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">Manage Blogs</h1>
        <Link href={ROUTES.DASHBOARD.BLOGS.NEW}>
          <Button>Add New Blog</Button>
        </Link>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {blogs.map((blog) => (
          <Card key={blog.id} className="border-mafaaheem-gold/20">
            <CardHeader>
              <CardTitle className="text-lg">{blog.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                {blog.excerpt || blog.content.slice(0, 100) + "..."}
              </p>
              <div className="flex justify-between">
                <Link href={ROUTES.DASHBOARD.BLOGS.VIEW(blog.slug)}>
                  <Button variant="outline" size="sm">Edit</Button>
                </Link>
                <Button variant={blog.published ? "default" : "secondary"} size="sm">
                  {blog.published ? "Published" : "Draft"}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
