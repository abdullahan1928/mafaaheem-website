"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";
import dynamic from "next/dynamic";

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
  });
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleContentChange = (html: string) => {
    setForm({ ...form, content: html });
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
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-4">
      <h1 className="text-2xl font-bold mb-4">Create New Blog</h1>
      <Input name="title" placeholder="Title" onChange={handleInputChange} required />
      <Input name="slug" placeholder="Slug" onChange={handleInputChange} required />
      <Input name="image" placeholder="Image URL (optional)" onChange={handleInputChange} />
      <Textarea name="excerpt" placeholder="Short excerpt" onChange={handleInputChange} />
      <QuillEditor value={form.content} onChange={handleContentChange} />
      <Button type="submit">Create Blog</Button>
    </form>
  );
}
