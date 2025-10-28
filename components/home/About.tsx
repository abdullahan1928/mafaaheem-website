"use client"

import { useEffect, useRef } from "react"
import { CheckCircle2 } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"
import { aboutContent } from "@/data/about"
import SectionHeader from "../shared/SectionHeader"

const AboutSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { language, isRTL } = useLanguage()
  const content = aboutContent[language]

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
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => {
      if (sectionRef.current) observer.unobserve(sectionRef.current)
    }
  }, [])

  return (
    <section
      id="about"
      ref={sectionRef}
      dir={isRTL ? "rtl" : "ltr"}
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-white to-mafaaheem-beige/10 sm:px-10"
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12 sm:mb-16">
          <SectionHeader heading={content.heading} />
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-600 scroll-reveal stagger-1 mt-4 leading-relaxed">
            {content.description}
          </p>
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center`}>
          <div className={`order-2 lg:order-1 space-y-6 ${isRTL ? "lg:pl-10" : "lg:pr-10"}`}>
            <div className="bg-white p-6 sm:p-8 rounded-xl border border-mafaaheem-gold/20 shadow-sm hover:shadow-md transition-all scroll-reveal group">
              <div className="flex items-start gap-3 sm:gap-4">
                <CheckCircle2 className="h-6 w-6 text-mafaaheem-gold flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-mafaaheem-brown mb-2 sm:mb-3">
                    {content.visionTitle}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{content.visionText}</p>
                </div>
              </div>
            </div>

            <div className="bg-white p-6 sm:p-8 rounded-xl border border-mafaaheem-green/20 shadow-sm hover:shadow-md transition-all scroll-reveal stagger-1 group">
              <div className="flex items-start gap-3 sm:gap-4">
                <CheckCircle2 className="h-6 w-6 text-mafaaheem-green flex-shrink-0 group-hover:scale-110 transition-transform" />
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-mafaaheem-green mb-2 sm:mb-3">
                    {content.missionTitle}
                  </h3>
                  <ul className="text-gray-700 space-y-2 leading-relaxed">
                    {content.missionPoints.map((point, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-mafaaheem-green font-bold mt-1">•</span>
                        <span>
                          <strong>{point.title}:</strong> {point.text}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-br from-mafaaheem-brown to-mafaaheem-brown/80 p-6 sm:p-8 rounded-xl text-white shadow-lg scroll-reveal stagger-2">
              <h3 className="text-xl sm:text-2xl font-bold mb-3">{content.mottoHeading}</h3>
              <p className="text-base sm:text-lg font-semibold italic leading-relaxed">{content.motto}</p>
            </div>
          </div>

          <div className="order-1 lg:order-2 scroll-reveal relative">
            <div className="relative">
              <div className="absolute -inset-3 sm:-inset-4 bg-gradient-to-br from-mafaaheem-gold/20 to-mafaaheem-green/20 rounded-2xl blur-2xl opacity-50"></div>
              <Image
                src="/images/youth-studying.jpeg"
                alt="Students learning at Mafaaheem Institute"
                width={600}
                height={500}
                className="relative rounded-2xl shadow-2xl object-cover w-full h-80 sm:h-96 md:h-[500px]"
              />
              <div className="absolute -bottom-6 sm:-bottom-8 right-0 sm:-right-8 bg-white p-4 sm:p-6 rounded-xl shadow-xl max-w-[90%] sm:max-w-lg border border-mafaaheem-gold/20 scroll-reveal stagger-3">
                <p className="text-mafaaheem-brown font-medium text-sm sm:text-base">
                  {`"${content.pictureSubtitle}"`}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default AboutSection
