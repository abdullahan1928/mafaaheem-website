"use client";

import { useEffect, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { eventsContent } from "@/data/events";
import { ROUTES } from "@/routes";
import { cn } from "@/lib/utils";

interface IEvent {
  _id: string;
  title: string;
  description: string;
  image?: string;
  date?: string;
  language: string;
}

export default function EventsPage() {
  const { language } = useLanguage();
  const content = eventsContent[language];

  const [events, setEvents] = useState<IEvent[]>([]);
  const [loading, setLoading] = useState(true);


  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await fetch("/api/events", { cache: "no-store" });
        if (!res.ok) throw new Error("Failed to fetch events");
        const data = await res.json();
        setEvents(data);
      } catch (error) {
        console.error("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-6 md:px-12 lg:px-24">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto mb-16">
        <h1 className="text-4xl md:text-5xl font-bold text-mafaaheem-brown mb-4 tracking-tight">
          {content.heading}
        </h1>
        <p className="text-muted-foreground text-lg">{content.description}</p>
      </div>

      {/* Loading State */}
      {loading ? (
        <div className="flex flex-col gap-12">
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              className="flex flex-col md:flex-row items-center bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden border border-mafaaheem-gold/10"
            >
              <Skeleton className="w-full md:w-1/2 h-64 md:h-80" />
              <div className="p-8 md:w-1/2 space-y-3">
                <Skeleton className="w-24 h-4" />
                <Skeleton className="w-2/3 h-6" />
                <Skeleton className="w-full h-20" />
              </div>
            </div>
          ))}
        </div>
      ) : events.length === 0 ? (
        <p className="text-center text-muted-foreground">
          No events found at the moment.
        </p>
      ) : (
        <div className="flex flex-col gap-12">
          {events.map((event) => (
            <div
              key={event._id}
              className="flex flex-col md:flex-row items-center bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-mafaaheem-gold/10"
              dir={event.language === "ar" || event.language === "ur" ? "rtl" : "ltr"}
            >
              {event.image && (
                <div className="relative w-full md:w-1/2 h-64 md:h-80">
                  <Image
                    src={event.image}
                    alt={event.title}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <div className={cn(
                "p-8 md:w-1/2 flex flex-col justify-between",
                event.language === "ar" || event.language === "ur" ? "text-right" : "text-left"
              )}>
                {event.date && (
                  <p className="text-sm text-mafaaheem-gold mb-2">
                    {new Date(event.date).toLocaleDateString(language, {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>
                )}
                <h3
                  className={cn(
                    "!text-2xl font-semibold text-mafaaheem-brown leading-snug mb-4 line-clamp-2 urdu-italic",
                    event.language === "ur" ? "urdu" : "",
                    event.language === "ar" ? "arabic" : ""
                  )}
                  dangerouslySetInnerHTML={{ __html: event.title }}
                />

                <div
                  className={cn(
                    "prose text-muted-foreground leading-relaxed line-clamp-3 mb-4",
                    event.language === "ur" ? "urdu" : "",
                    event.language === "ar" ? "arabic" : ""
                  )}
                  dangerouslySetInnerHTML={{ __html: event.description }}
                />


                <div className="mt-6">
                  <Link href={ROUTES.PUBLIC.EVENTS.VIEW(event._id)}>
                    <Button>
                      {content.viewDetails}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
