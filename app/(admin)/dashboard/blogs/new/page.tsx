"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Image from "next/image";
import { ROUTES } from "@/routes";
import { S3_FOLDER } from "@/lib/s3";

const QuillEditor = dynamic(
  () => import("@/components/shared/QuillEditor").then((m) => m.QuillEditor),
  { ssr: false }
);

export default function NewBlogPage() {
  const [form, setForm] = useState({
    title: "",
    slug: "",
    excerpt: "",
    content: "",
    image: "",
    imageKey: "",
    language: "en",
  });
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);

  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContentChange = (html: string) => {
    setForm({ ...form, content: html });
  };

  const handleLanguageChange = (value: string) => {
    setForm({ ...form, language: value });
  };

  // Upload image to S3 using presigned URL
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);

    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileType: file.type, folderName: S3_FOLDER.BLOGS }),
      });
      const { url, key } = await res.json();

      // Upload to S3 directly
      await fetch(url, {
        method: "PUT",
        headers: { "Content-Type": file.type },
        body: file,
      });

      const imageUrl = url.split("?")[0];
      setForm({ ...form, image: imageUrl, imageKey: key });
    } catch (err) {
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  const handleCancelUpload = async () => {
    if (!form.imageKey) return;

    setDeleting(true);
    try {
      await fetch("/api/upload", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ key: form.imageKey }),
      });

      setForm({ ...form, image: "", imageKey: "" });
    } catch (err) {
      console.error("Delete error:", err);
    } finally {
      setDeleting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/blogs", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push(ROUTES.DASHBOARD.BLOGS.LIST);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
      <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>

      <Input name="title" placeholder="Title" onChange={handleInputChange} required />
      <Input name="slug" placeholder="Slug" onChange={handleInputChange} required />
      <Textarea name="excerpt" placeholder="Short excerpt" onChange={handleInputChange} />

      {/* ✅ Language Dropdown */}
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

      {/* Image upload */}
      <div className="space-y-2">
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
            <div className="absolute top-2 right-2">
              <Button
                type="button"
                size="sm"
                variant="destructive"
                onClick={handleCancelUpload}
                disabled={deleting}
              >
                {deleting ? "Removing..." : "Remove"}
              </Button>
            </div>
          </div>
        )}
      </div>

      <QuillEditor value={form.content} onChange={handleContentChange} />
      <Button type="submit">Create Blog</Button>
    </form>
  );
}
