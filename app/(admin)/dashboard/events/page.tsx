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

export default function AdminEventsPage() {
  const [events, setEvents] = useState<IEvent[]>([]);
  const [search, setSearch] = useState("");
  const [language, setLanguage] = useState<"all" | "en" | "ur" | "ar">("all");

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await fetch("/api/events");
      const data = await res.json();
      setEvents(data);
    };
    fetchEvents();
  }, []);

  const filtered = useMemo(() => {
    return events.filter((e) => {
      const matchesSearch = e.title.toLowerCase().includes(search.toLowerCase());
      const matchesLang = language === "all" ? true : e.language === language;
      return matchesSearch && matchesLang;
    });
  }, [events, search, language]);

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Manage Events</h1>
          <p className="text-sm text-muted-foreground">
            Add, view, or edit upcoming events.
          </p>
        </div>
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
          onValueChange={(v) => setLanguage(v as "all" | "en" | "ur" | "ar")}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by language" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Languages</SelectItem>
            <SelectItem value="en">English</SelectItem>
            <SelectItem value="ur">Urdu</SelectItem>
            <SelectItem value="ar">Arabic</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filtered.map((event) => {
            const isRTL = event.language === 'ur' || event.language === 'ar';
            console.log("isRLT", isRTL)

            return (
              <Card
                key={event._id}
                className={cn(
                  "overflow-hidden border border-border/60 hover:shadow-md transition-all duration-200",
                  isRTL && "text-right"
                )}
              >
                {event.image && (
                  <div className="relative h-40 w-full overflow-hidden">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover transition-transform duration-300 hover:scale-105"
                    />
                  </div>
                )}
                <CardHeader>
                  <CardTitle
                    className={cn(
                      "prose text-lg line-clamp-2 urdu-italic",
                      event.language === "ur" ? "urdu" : "",
                      event.language === "ar" ? "arabic" : ""
                    )}
                    dangerouslySetInnerHTML={{ __html: event.title }}
                  />
                </CardHeader>
                <CardContent>
                  <p className="text-xs text-muted-foreground mb-2">
                    {new Date(event.date).toLocaleDateString()}
                  </p>

                  <p
                    className={cn(
                      "prose text-sm text-muted-foreground line-clamp-3 mb-4",
                      event.language === "ur" ? "urdu" : "",
                      event.language === "ar" ? "arabic" : ""
                    )}
                    dangerouslySetInnerHTML={{ __html: event.description }}
                  />

                  <div className="flex justify-between">
                    <Link href={ROUTES.DASHBOARD.EVENTS.EDIT(event._id)}>
                      <Button variant="outline" size="sm">
                        Edit
                      </Button>
                    </Link>
                    <Button
                      variant={event.published ? "default" : "secondary"}
                      size="sm"
                      className={cn(
                        "capitalize px-3",
                        event.published ? "bg-emerald-500/90" : "bg-muted"
                      )}
                    >
                      {event.published ? "Published" : "Draft"}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          }
          )}
        </div>
      ) : (
        <p className="text-muted-foreground text-center py-20">
          No events found.
        </p>
      )}
    </div>
  );
}
