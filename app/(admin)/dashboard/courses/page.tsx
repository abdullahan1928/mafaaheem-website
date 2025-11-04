"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes";
import { Trash2, Edit2 } from "lucide-react";
import { ICourse } from "@/models/Course";

export default function AdminCoursesList() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [total, setTotal] = useState(0);
  const [q, setQ] = useState("");

  async function fetchList() {
    const url = new URL("/api/courses", location.origin);
    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", String(limit));
    if (q) url.searchParams.set("q", q);
    const res = await fetch(url.toString());
    if (!res.ok) return;
    const data = await res.json();
    setCourses(data.data || []);
    setTotal(data.meta?.total || 0);
  }

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    fetchList();
  }, [page, q]);

  async function handleDelete(slug: string) {
    if (!confirm("Delete this course?")) return;
    await fetch(`/api/courses/${slug}`, { method: "DELETE" });
    fetchList();
  }

  const pages = Math.ceil(total / limit) || 1;

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Courses</h1>
        <div className="flex gap-3">
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder="Search" className="input" />
          <Link href={ROUTES.DASHBOARD.COURSES.NEW}>
            <Button>Add Course</Button>
          </Link>
        </div>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {courses.map((c) => (
          <div key={c.id} className="border rounded-2xl overflow-hidden bg-white shadow-sm">
            <div className="relative w-full h-44">
              {c.image ? (
                <Image src={c.image} alt={c.translations?.title?.en || c.slug} fill className="object-cover" />
              ) : (
                <div className="w-full h-full bg-mafaaheem-beige/30 flex items-center justify-center">No image</div>
              )}
            </div>

            <div className="p-4">
              <h3 className="font-semibold text-mafaaheem-brown">{c.translations?.title?.en || c.slug}</h3>
              <p className="text-sm text-muted-foreground line-clamp-3 my-2">
                {(c.translations?.description?.en || "").slice(0, 160)}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">{new Date(c.createdAt).toLocaleDateString()}</span>
                  <span className="text-xs text-muted-foreground px-2">•</span>
                  <span className="text-xs text-muted-foreground">{c.category}</span>
                </div>

                <div className="flex items-center gap-2">
                  <Link href={ROUTES.DASHBOARD.COURSES.EDIT(c.slug)}>
                    <Button variant="ghost" size="sm"><Edit2 /></Button>
                  </Link>
                  <Button variant="destructive" size="sm" onClick={() => handleDelete(c.slug)}><Trash2 /></Button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center justify-between mt-6">
        <div>{total} courses</div>
        <div className="flex gap-2">
          <Button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page === 1}>Prev</Button>
          <div className="px-3 py-2 rounded-md bg-muted/50">{page} / {pages}</div>
          <Button onClick={() => setPage((p) => Math.min(pages, p + 1))} disabled={page === pages}>Next</Button>
        </div>
      </div>
    </div>
  );
}
