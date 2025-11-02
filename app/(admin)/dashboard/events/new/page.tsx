"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/routes";
import { S3_FOLDER } from "@/lib/s3";
import { DatePicker } from "@/components/ui/date-picker";
import { format } from "date-fns";
import dynamic from "next/dynamic";

const QuillEditor = dynamic(
  () => import("@/components/shared/QuillEditor").then((m) => m.QuillEditor),
  { ssr: false }
);

export default function NewEventPage() {
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    imageKey: "",
    date: "",
    language: "en",
  });
  const [uploading, setUploading] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const router = useRouter();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLanguageChange = (value: string) => {
    setForm({ ...form, language: value });
  };

  const handleDateChange = (selectedDate: Date | undefined) => {
    setForm({
      ...form,
      date: selectedDate ? format(selectedDate, "yyyy-MM-dd") : "",
    });
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      const res = await fetch("/api/upload", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ fileName: file.name, fileType: file.type, folderName: S3_FOLDER.EVENTS }),
      });
      const { url, key } = await res.json();
      await fetch(url, { method: "PUT", headers: { "Content-Type": file.type }, body: file });
      const imageUrl = url.split("?")[0];
      setForm({ ...form, image: imageUrl, imageKey: key });
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
    } finally {
      setDeleting(false);
    }
  };

  const handleContentChange = (html: string) => {
    setForm({ ...form, description: html });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch("/api/events", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    router.push(ROUTES.DASHBOARD.EVENTS.LIST);
  };


  const selectedDate = form.date ? new Date(form.date) : undefined;

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-5">
      <h1 className="text-2xl font-bold mb-4">Create New Event</h1>

      <Input name="title" placeholder="Event title" onChange={handleInputChange} required />

      <QuillEditor value={form.description} onChange={handleContentChange} />

      <DatePicker value={selectedDate} onChange={handleDateChange} className="w-full hover:!text-white" />

      <div className="space-y-2">
        <label className="text-sm font-medium text-muted-foreground">Language</label>
        <Select value={form.language} onValueChange={handleLanguageChange}>
          <SelectTrigger>
            <SelectValue placeholder="Select language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ur">Urdu</SelectItem>
            <SelectItem value="ar">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Input type="file" accept="image/*" onChange={handleFileUpload} disabled={uploading} />
        {uploading && <p className="text-sm text-muted-foreground">Uploading...</p>}
        {form.image && (
          <div className="relative mt-2 border rounded-lg overflow-hidden">
            <Image src={form.image} alt="Uploaded" width={800} height={400} className="object-cover w-full h-56" />
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

      <Button type="submit">Create Event</Button>
    </form>
  );
}
