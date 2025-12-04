"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/routes";
import { Trash2, Edit2, X } from "lucide-react";
import { ICourse } from "@/models/Course";
import { Input } from "@/components/ui/input";
import { DashboardPagination } from "@/components/dashboard/dashboard-pagination";

export default function AdminCoursesList() {
  const [courses, setCourses] = useState<ICourse[]>([]);
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [limit] = useState(12);
  const [loading, setLoading] = useState(false);

  // Fetch all courses (for frontend filtering & pagination)
  useEffect(() => {
    const fetchCourses = async () => {
      setLoading(true);
      const res = await fetch("/api/courses");
      const data = await res.json();
      console.log('Fetch courses response status:', data);
      setCourses(data || []);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setPage(1);
  }, [search]);

  // Filter courses based on search query
  const filtered = useMemo(() => {
    return courses.filter((c) =>
      (c.translations?.title?.en || c.slug)
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [courses, search]);

  // Paginate filtered courses
  const paginated = useMemo(() => {
    const start = (page - 1) * limit;
    return filtered.slice(start, start + limit);
  }, [filtered, page, limit]);

  // async function handleDelete(slug: string) {
  //   if (!confirm("Delete this course?")) return;
  //   await fetch(`/api/courses/${slug}`, { method: "DELETE" });
  //   setCourses((prev) => prev.filter((c) => c.slug !== slug));
  // }

  return (
    <div className="">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
        <h1 className="text-3xl font-bold text-mafaaheem-brown">Courses</h1>
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-auto">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search courses..."
              className="input pr-10 w-full sm:w-64"
            />
            {search && (
              <button
                onClick={() => setSearch("")}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                <X size={16} />
              </button>
            )}
          </div>
          <Link href={ROUTES.DASHBOARD.COURSES.NEW}>
            <Button>Add Course</Button>
          </Link>
        </div>
      </div>

      {/* Courses Grid */}
      {loading ? (
        <div className="text-center py-20 text-gray-500">Loading courses...</div>
      ) : paginated.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3">
          {paginated.map((c) => (
            <div
              key={c.id}
              className="border rounded-2xl overflow-hidden bg-white shadow-md hover:shadow-xl transition-shadow duration-300 group relative"
            >
              <div className="relative w-full h-48">
                {c.image ? (
                  <Image
                    src={c.image}
                    alt={c.translations?.title?.en || c.slug}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                ) : (
                  <div className="w-full h-full bg-mafaaheem-beige/20 flex items-center justify-center text-gray-400">
                    No image
                  </div>
                )}
                <div className="absolute inset-0 bg-black/20 flex items-end p-3">
                  <h3 className="text-white font-semibold text-lg line-clamp-1">
                    {c.translations?.title?.en || c.slug}
                  </h3>
                </div>
              </div>

              <div className="p-4 flex flex-col justify-between h-[180px]">
                <p className="text-sm text-muted-foreground line-clamp-4">
                  {(c.translations?.description?.en || "").slice(0, 160)}
                </p>

                <div className="flex items-center justify-between mt-3">
                  <div className="flex flex-col text-xs text-muted-foreground">
                    <span>{new Date(c.createdAt).toLocaleDateString()}</span>
                    <span>{c.category}</span>
                  </div>

                  <div className="flex gap-2 transition-opacity">
                    <Link href={ROUTES.DASHBOARD.COURSES.EDIT(c.slug)}>
                      <Button variant="ghost" size="sm" title="Edit">
                        <Edit2 />
                      </Button>
                    </Link>
                    {/* <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(c.slug)}
                      title="Delete"
                    >
                      <Trash2 />
                    </Button> */}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20 text-gray-500">No courses found.</div>
      )}

      {/* Pagination */}
      <DashboardPagination
        page={page}
        limit={limit}
        total={filtered.length}
        onPageChange={setPage}
      />
    </div>
  );
}
