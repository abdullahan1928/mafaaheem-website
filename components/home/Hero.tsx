"use client"

import { Button } from "../ui/button"
import { ChevronDown, Sparkles } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"
import { ROUTES } from "@/routes"
import { useRouter } from "next/navigation"
import { heroContent } from "@/data/hero"

const HeroSection = () => {
  const router = useRouter()
  const { isRTL, language } = useLanguage()
  const content = heroContent[language]

  const scrollToNextSection = () => {
    const aboutSection = document.getElementById("about")
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden pt-16"
      aria-label="Hero section - Mafaaheem Institute"
    >
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-b from-mafaaheem-brown/20 via-transparent to-background"></div>
        <Image
          src="/images/background.jpg"
          alt="Islamic architectural background"
          width={1920}
          height={1080}
          className="w-full h-full object-cover opacity-50"
          priority
        />
      </div>

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-mafaaheem-gold/10 border border-mafaaheem-gold/30 mb-4">
                <Sparkles className="h-4 w-4 text-mafaaheem-gold" />
                <span className="text-sm font-semibold text-mafaaheem-brown">
                  {content.welcome}
                </span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-mafaaheem-brown leading-tight sm:leading-snug animate-fade-down text-balance">
                {content.title}
              </h1>

              <p
                className={`text-xl sm:text-2xl md:text-3xl font-semibold text-mafaaheem-green animate-fade-up ${isRTL ? "text-right" : "text-center sm:text-left"}`}
              >
                <span className="arabic">{content.subtitle}</span>
              </p>
            </div>

            <p
              className={`text-base sm:text-lg md:text-xl text-foreground/70 max-w-2xl mx-auto sm:mx-0 animate-fade-up leading-relaxed ${isRTL ? "text-right" : "text-center sm:text-left"}`}
              style={{ animationDelay: "100ms" }}
            >
              {content.description}
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4 justify-center sm:justify-start animate-fade-up" style={{ animationDelay: "200ms" }}>
              <Button
                size="lg"
                onClick={() => document.getElementById("programs")?.scrollIntoView({ behavior: "smooth" })}
                className="font-semibold px-6 sm:px-8 py-4 sm:py-6 text-base rounded-lg transition-all hover:shadow-lg"
              >
                {content.explore}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => router.push(ROUTES.PUBLIC.COURSES.LIST)}
                className="border-2 border-mafaaheem-green text-mafaaheem-green hover:bg-mafaaheem-green/5 font-semibold px-6 sm:px-8 py-4 sm:py-6 text-base rounded-lg transition-all"
              >
                {content.browse}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer group"
        onClick={scrollToNextSection}
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs font-semibold text-mafaaheem-brown/60 group-hover:text-mafaaheem-brown transition-colors">
            {content.scroll}
          </span>
          <ChevronDown className="h-6 w-6 text-mafaaheem-brown opacity-60 group-hover:opacity-100 transition-opacity" />
        </div>
      </div>
    </section>
  )
}

export default HeroSection
