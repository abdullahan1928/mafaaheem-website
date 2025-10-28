"use client";

import Image from "next/image";

const events = [
    {
        id: 1,
        title: "Understanding the Heart – A Journey Through Purification",
        description:
            "An immersive session exploring the purification of the soul (Tazkiyah) through Quranic principles and Prophetic guidance.",
        image: "/events/heart.jpg",
        date: "November 15, 2025",
    },
    {
        id: 2,
        title: "Fiqh of Worship: From Knowledge to Action",
        description:
            "A detailed seminar on the jurisprudence of worship, connecting understanding with practical implementation.",
        image: "/events/fiqh.jpg",
        date: "December 8, 2025",
    },
    {
        id: 3,
        title: "Seerah Reflections: Lessons for Modern Life",
        description:
            "Revisiting the Seerah to extract timeless lessons for our daily lives, guided by love and wisdom.",
        image: "/events/seerah.jpg",
        date: "January 12, 2026",
    },
];

export default function EventsPage() {
    return (
        <div className="min-h-screen bg-background text-foreground pt-24 pb-16 px-6 md:px-12 lg:px-24">
            {/* Header */}
            <div className="text-center max-w-3xl mx-auto mb-16">
                <h1 className="text-4xl md:text-5xl font-bold text-mafaaheem-brown mb-4 tracking-tight">
                    Events & Gatherings
                </h1>
                <p className="text-muted-foreground text-lg">
                    A collection of programs, workshops, and spiritual gatherings dedicated to learning, reflection, and connection.
                </p>
            </div>

            {/* Events List */}
            <div className="flex flex-col gap-12">
                {events.map((event) => (
                    <div
                        key={event.id}
                        className="flex flex-col md:flex-row items-center bg-white dark:bg-neutral-900 rounded-3xl overflow-hidden shadow-sm hover:shadow-md transition-all border border-mafaaheem-gold/10"
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
                        <div className="p-8 md:w-1/2">
                            <p className="text-sm text-mafaaheem-gold mb-2">{event.date}</p>
                            <h3 className="text-2xl font-semibold mb-3 text-mafaaheem-brown">
                                {event.title}
                            </h3>
                            <p className="text-muted-foreground leading-relaxed">
                                {event.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
