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
import Image from "next/image";
import { IEvent } from "@/models/Event";
import { Plus, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/routes";
import { extractS3Key } from "@/lib/s3";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { formatDateWithLanguage } from "@/lib/date";
import { DashboardPagination } from "@/components/dashboard/dashboard-pagination";

export default function AdminEventsPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState<"all" | "en" | "ur" | "ar">("all");
  const [deleteEvent, setDeleteEvent] = useState<IEvent | null>(null);
  const [deleting, setDeleting] = useState(false);

  const [page, setPage] = useState(1);
  const [limit] = useState(8);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  useEffect(() => {
    setPage(1);
  }, [search, language]);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
      const matchesLang = language === "all" ? true : e.language === language;
      return matchesSearch && matchesLang;
    });
  }, [events, search, language]);

  const paginatedEvents = useMemo(() => {
    const start = (page - 1) * limit;
    const end = start + limit;
    return filtered.slice(start, end);
  }, [filtered, page, limit]);


  const confirmDelete = async () => {
    if (!deleteEvent) return;
    setDeleting(true);

    try {
      const key = deleteEvent.image ? extractS3Key(deleteEvent.image) : null;

      if (key) {
        await fetch("/api/upload", {
          method: "DELETE",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ key }),
        });
      }

      await fetch(`/api/events/${deleteEvent._id}`, {
        method: "DELETE",
      });

      setEvents((prev) => prev.filter((e) => e._id !== deleteEvent._id));
      setDeleteEvent(null);
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="space-y-10">
      <div className="space-y-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-3xl font-bold text-mafaaheem-brown">Events</h1>
          <Link href={ROUTES.DASHBOARD.EVENTS.NEW}>
            <Button className="flex items-center gap-2">
              <Plus className="w-4 h-4" /> Add Event
            </Button>
          </Link>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search events..."
              className="pl-9"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <Select
            value={language}
            onValueChange={(v) => setLanguage(v as any)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Languages</SelectItem>
              <SelectItem value="en">English</SelectItem>
              <SelectItem value="ur">Urdu</SelectItem>
              <SelectItem value="ar">Arabic</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Grid */}
      {paginatedEvents.length > 0 ? (
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {paginatedEvents.map((event) => {
            const isRTL = event.language === "ur" || event.language === "ar";

            return (
              <Card
                key={event._id}
                className="overflow-hidden hover:shadow-lg transition-all flex flex-col"
                dir={event.language === "ar" || event.language === "ur" ? "rtl" : "ltr"}
              >
                {event.image && (
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}

                <CardHeader className={cn(isRTL && "text-right")}>
                  <CardTitle
                    className={cn(
                      "prose text-lg line-clamp-2 urdu-italic text-mafaaheem-brown",
                      event.language === "ur" ? "urdu" : "",
                      event.language === "ar" ? "arabic" : ""
                    )}
                    dangerouslySetInnerHTML={{ __html: event.title }}
                  />
                </CardHeader>

                <CardContent className="flex flex-col justify-between flex-1 space-y-4">
                  <p className="text-xs text-mafaaheem-gold">
                    {formatDateWithLanguage(event.date, event.language)}
                  </p>

                  <p
                    className={cn(
                      "text-sm text-muted-foreground line-clamp-3",
                      event.language === "ur" && "urdu",
                      event.language === "ar" && "arabic"
                    )}
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />

                  <div className="flex justify-between border-t pt-4 mt-auto">
                    <Link href={ROUTES.DASHBOARD.EVENTS.EDIT(event._id)}>
                      <Button variant="outline" size="sm">Edit</Button>
                    </Link>

                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => setDeleteEvent(event)}
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
        <p className="text-muted-foreground text-center py-20">
          No events found.
        </p>
      )}

      <DashboardPagination
        page={page}
        limit={limit}
        total={filtered.length}
        onPageChange={setPage}
      />

      {/* Delete Dialog */}
      <Dialog open={!!deleteEvent} onOpenChange={() => setDeleteEvent(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Event</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this event? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter className="mt-4 flex justify-end gap-3">
            <Button variant="outline" onClick={() => setDeleteEvent(null)}>
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
