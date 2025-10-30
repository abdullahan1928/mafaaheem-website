"use client"

import { Button } from "@/components/ui/button"
import { useEffect, useRef } from "react"
import { ArrowRight, Sparkles } from "lucide-react"
import { useContactModal } from "@/contexts/ContactModalContext"
import { useLanguage } from "@/contexts/LanguageContext"
import { useRouter } from "next/navigation"
import { ROUTES } from "@/routes"
import { ctaContent } from "@/data/cta"

const CTASection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { openContactModal } = useContactModal()
  const router = useRouter()

  const { language, isRTL } = useLanguage()
  const content = ctaContent[language]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".scroll-reveal")
            elements.forEach((el) => el.classList.add("revealed"))
          }
        })
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [])

  return (
    <section
      className="py-20 sm:py-24 bg-mafaaheem-brown text-center"
      ref={sectionRef}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-white/10 border border-white/20 mb-5 sm:mb-6 scroll-reveal">
            <Sparkles className="h-4 w-4 text-mafaaheem-gold" />
            <span className="text-xs sm:text-sm font-semibold text-white">
              {content.heading}
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 scroll-reveal leading-tight px-2">
            {content.badge}
          </h2>

          <p className="text-base sm:text-lg md:text-xl text-white/80 mb-8 sm:mb-10 scroll-reveal stagger-1 max-w-2xl mx-auto leading-relaxed px-2">
            {content.description}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center scroll-reveal stagger-2">
            <Button
              size="lg"
              className="w-full sm:!w-auto bg-white text-mafaaheem-brown hover:bg-mafaaheem-gold hover:text-white font-semibold px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
              onClick={() => router.push(ROUTES.PUBLIC.COURSES.LIST)}
            >
              {content.explore}
              <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:!w-auto border-2 border-white text-white bg-transparent hover:bg-white/10 font-semibold px-6 sm:px-8 py-4 sm:py-6 text-sm sm:text-base rounded-lg transition-all flex items-center justify-center gap-2"
              onClick={openContactModal}
            >
              {content.contact}
              <ArrowRight className={`h-4 w-4 ${isRTL ? "rotate-180" : ""}`} />
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default CTASection
