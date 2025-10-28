"use client"

import { ROUTES } from "@/routes"
import Link from "next/link"
import { useEffect } from "react"
import { ArrowLeftCircle } from "lucide-react"

const NotFound = () => {
  useEffect(() => {
    console.error("404 Error: User attempted to access a non-existent route")
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-white via-mafaaheem-gold/10 to-mafaaheem-brown/10 text-center overflow-hidden px-6">
      {/* Decorative floating shapes */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-10 w-24 h-24 bg-mafaaheem-gold/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-32 right-16 w-32 h-32 bg-mafaaheem-brown/10 rounded-full blur-2xl animate-pulse" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 bg-mafaaheem-green/10 rounded-full blur-3xl opacity-50 animate-[float_6s_ease-in-out_infinite]" />
      </div>

      {/* 404 Content */}
      <div className="relative z-10 max-w-lg w-full bg-white/70 backdrop-blur-xl border border-mafaaheem-gold/20 shadow-2xl rounded-3xl p-10 md:p-14 animate-in fade-in zoom-in-50 duration-500">
        <h1 className="text-[80px] md:text-[100px] font-bold text-mafaaheem-brown leading-none mb-4 tracking-tight">
          404
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-mafaaheem-brown mb-3">
          Page Not Found
        </h2>
        <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
          It seems you’ve wandered off the path. Don’t worry, even the best explorers lose their way sometimes.
        </p>

        <Link
          href={ROUTES.HOME}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 text-base md:text-lg font-semibold rounded-xl bg-mafaaheem-gold text-white shadow-md hover:bg-mafaaheem-brown hover:shadow-lg transition-all duration-300"
        >
          <ArrowLeftCircle className="h-5 w-5" />
          Return to Home
        </Link>
      </div>

      {/* Subtle Animated Background */}
      <div className="absolute bottom-0 w-full h-40 bg-gradient-to-t from-mafaaheem-brown/10 via-transparent to-transparent" />
    </section>
  )
}

export default NotFound
