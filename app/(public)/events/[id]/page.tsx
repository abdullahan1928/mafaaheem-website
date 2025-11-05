"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { ROUTES } from "@/routes";
import { useLanguage } from "@/contexts/LanguageContext";
import { eventsContent } from "@/data/events";
import { cn } from "@/lib/utils";
import { IEvent } from "@/models/Event";
import { formatDateWithLanguage } from "@/lib/date";

export default function EventDetailsPage() {
  const { language } = useLanguage();
  const content = eventsContent[language];

  const { id } = useParams();
  const [event, setEvent] = useState<IEvent | null>(null);
  const [loading, setLoading] = useState(true);
  const [isRTL, setIsRTL] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(`/api/events/${id}`);
        if (!res.ok) throw new Error("Failed to fetch event");
        const data = await res.json();
        setEvent(data);

        if (data.language !== "en") setIsRTL(true);
      } catch (error) {
        console.error("Error fetching event:", error);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-muted-foreground">
        {content.loadingSingle}
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center text-muted-foreground text-center">
        <p>{content.eventNotFound}</p>
        <Link
          href={ROUTES.PUBLIC.EVENTS.LIST}
          className="mt-4 text-mafaaheem-gold hover:text-mafaaheem-brown transition-colors inline-flex items-center gap-2"
        >
          {isRTL ? (
            <>
              {content.backToEvents}
              <ArrowRight size={18} />
            </>
          ) : (
            <>
              <ArrowLeft size={18} />
              {content.backToEvents}
            </>
          )}
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-6 md:px-12 lg:px-32">
      {/* Header */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1
          className={cn(
            "text-3xl md:text-5xl font-bold text-mafaaheem-brown mb-6 leading-tight urdu-italic",
            event.language === "ur" ? "urdu" : "",
            event.language === "ar" ? "arabic" : ""
          )}
          dangerouslySetInnerHTML={{ __html: event.title }}
        />
        {event.date && (
          <p className="text-sm text-muted-foreground">
            {formatDateWithLanguage(event.date)}
          </p>
        )}
      </div>

      {/* Event Image */}
      {event.image && (
        <div className="max-w-4xl mx-auto mb-12 rounded-3xl overflow-hidden shadow-md border border-mafaaheem-gold/10">
          <Image
            src={event.image}
            alt={event.title}
            width={1200}
            height={600}
            className="object-cover w-full h-auto"
            priority
          />
        </div>
      )}

      {/* Event Description */}
      <article
        className={cn(
          "prose max-w-4xl mx-auto text-justify leading-relaxed prose-headings:text-mafaaheem-brown prose-p:text-muted-foreground prose-a:text-mafaaheem-gold hover:prose-a:text-mafaaheem-brown prose-img:rounded-2xl prose-img:shadow-sm",
          isRTL && "!text-right",
          event.language === "ur" && "urdu",
          event.language === "ar" && "arabic"
        )}
        dangerouslySetInnerHTML={{ __html: event.description }}
      />

      {/* Back Link */}
      <div className="max-w-4xl mx-auto mt-16 text-center">
        <Link
          href={ROUTES.PUBLIC.EVENTS.LIST}
          className="text-mafaaheem-gold hover:text-mafaaheem-brown transition-colors font-medium inline-flex items-center gap-2"
        >
          {isRTL ? (
            <>
              {content.backToEvents}
              <ArrowRight size={18} />
            </>
          ) : (
            <>
              <ArrowLeft size={18} />
              {content.backToEvents}
            </>
          )}
        </Link>
      </div>
    </div>
  );
}
