"use client";

import { useEffect, useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import { toast } from "sonner";
import { ROUTES } from "@/routes";

const QuillEditor = dynamic(
  () => import("@/components/shared/QuillEditor").then((m) => m.QuillEditor),
  { ssr: false }
);

export default function EditBlogPage() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    imageKey: "",
    language: "en",
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch blog by ID
  useEffect(() => {
    async function fetchBlog() {
      try {
        const res = await fetch(`/api/blogs/${id}`);
        const data = await res.json();
        setForm({
          title: data.title,
          slug: data.slug,
          excerpt: data.excerpt,
          content: data.content,
          image: data.image,
          imageKey: data.imageKey,
          language: data.language
        });
      } catch {
        toast.error("Failed to load blog");
      } finally {
        setLoading(false);
      }
    }
    fetchBlog();
  }, [id]);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContentChange = (html: string) => {
    setForm({ ...form, content: html });
  };

  const handleLanguageChange = (value: string) => {
    setForm({ ...form, language: value });
  };

  // Handle image upload (replace old one)
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify({ fileName: file.name, fileType: file.type }),
      });
      const { url, key } = await res.json();

      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const imageUrl = url.split("?")[0];
      setForm({ ...form, image: imageUrl, imageKey: key });
      toast.success("Image uploaded");
    } catch (err) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Save changes
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);

    try {
      await fetch(`/api/blogs/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      toast.success("Blog updated successfully");
      router.push(ROUTES.DASHBOARD.BLOGS.LIST);
    } catch {
      toast.error("Failed to update blog");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto py-20 space-y-4">
        <Skeleton className="h-10 w-2/3" />
        <Skeleton className="h-8 w-full" />
        <Skeleton className="h-8 w-1/2" />
        <Skeleton className="h-[300px] w-full" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto py-10">
      <Card className="p-6 shadow-lg border-mafaaheem-gold/20">
        <CardHeader>
          <CardTitle className="text-3xl font-semibold text-mafaaheem-brown">
            Edit Blog
          </CardTitle>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <Input
              name="title"
              placeholder="Title"
              value={form.title}
              onChange={handleChange}
              required
            />
            <Input
              name="slug"
              placeholder="Slug"
              value={form.slug}
              onChange={handleChange}
              required
            />
            <Textarea
              name="excerpt"
              placeholder="Short excerpt"
              value={form.excerpt}
              onChange={handleChange}
            />

            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Language</label>
              <Select value={form.language} onValueChange={handleLanguageChange}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a language" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="en">English</SelectItem>
                  <SelectItem value="ur">Urdu</SelectItem>
                  <SelectItem value="ar">Arabic</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Image */}
            <div className="space-y-2">
              <label className="text-sm font-medium text-muted-foreground">Cover Image</label>
              <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
              {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}

              {form.image && (
                <div className="relative mt-2 border rounded-lg overflow-hidden">
                  <Image
                    src={form.image}
                    alt="Uploaded"
                    width={800}
                    height={400}
                    className="object-cover w-full h-56"
                  />
                </div>
              )}
            </div>

            <div>
              <label className="text-sm font-medium text-muted-foreground">Content</label>
              <QuillEditor value={form.content} onChange={handleContentChange} />
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-3">
            <Button
              type="button"
              variant="outline"
              onClick={() => router.push(ROUTES.DASHBOARD.BLOGS.LIST)}
            >
              Cancel
            </Button>
            <Button type="submit" disabled={saving}>
              {saving ? "Saving..." : "Save Changes"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
