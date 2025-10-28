"use client"

import { useEffect, useRef } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"
import { getObjectives, getValues, valuesContent } from "@/data/values"
import SectionHeader from "../shared/SectionHeader"

const Values = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { language, isRTL } = useLanguage()
  const content = valuesContent[language]
  const values = getValues(language)
  const objectives = getObjectives(language)

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
      id="values"
      className="py-20 sm:py-24 bg-gradient-to-b from-white to-mafaaheem-beige/5"
      ref={sectionRef}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className="text-center mb-14 sm:mb-16">
          <SectionHeader heading={content.valuesHeading} />
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-600 scroll-reveal stagger-1 mt-3 sm:mt-4 px-2">
            {content.valuesDescription}
          </p>
        </div>

        {/* Values Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 mb-16 sm:mb-20">
          {values.map((value, index) => (
            <div
              key={value.id}
              className={`p-6 sm:p-8 rounded-xl bg-gradient-to-br ${value.color} border ${value.borderColor} transition-all hover:shadow-lg hover:border-opacity-100 scroll-reveal group transform hover:scale-[1.03]`}
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <div className="mb-5 sm:mb-6 inline-flex items-center justify-center h-12 w-12 sm:h-14 sm:w-14 rounded-full bg-white shadow-md group-hover:shadow-lg transition-all">
                <value.icon className={`h-6 w-6 sm:h-7 sm:w-7 ${value.iconColor}`} />
              </div>
              <h3 className="text-xl sm:text-2xl font-bold text-mafaaheem-brown mb-1">
                {value.title}
              </h3>
              <p className="text-xs sm:text-sm font-semibold text-gray-500 mb-3 sm:mb-4 italic">
                {value.subtitle}
              </p>
              <p className="text-sm sm:text-base text-gray-700 leading-relaxed">
                {value.description}
              </p>
            </div>
          ))}
        </div>

        {/* Objectives */}
        <div className="bg-gradient-to-br from-mafaaheem-brown/5 to-mafaaheem-gold/5 rounded-2xl p-6 sm:p-10 lg:p-12 border border-mafaaheem-gold/20 scroll-reveal stagger-3">
          <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-12">
            <div className="flex-1 order-2 lg:order-1">
              <h3 className="text-2xl sm:text-3xl font-bold text-mafaaheem-brown mb-6 sm:mb-8">
                {content.objectiveHeading}
              </h3>
              <ul className="space-y-4 sm:space-y-5">
                {objectives.map((objective, index) => (
                  <li
                    key={index}
                    className="flex items-start gap-3 sm:gap-4 group"
                  >
                    <span className="h-2.5 w-2.5 sm:h-3 sm:w-3 rounded-full bg-mafaaheem-gold flex-shrink-0 mt-2 group-hover:scale-125 transition-transform"></span>
                    <div>
                      <h4 className="font-bold text-mafaaheem-brown text-sm sm:text-base">
                        {objective.title}
                      </h4>
                      <p className="text-gray-700 mt-1 text-sm sm:text-base leading-relaxed">
                        {objective.description}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            <div className="w-full sm:w-[90%] lg:w-96 h-56 sm:h-64 lg:h-72 relative rounded-xl overflow-hidden shadow-xl order-1 lg:order-2">
              <Image
                src="/images/strategic.png"
                alt="Strategic objectives"
                width={400}
                height={300}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-mafaaheem-brown/80 to-transparent flex items-end">
                <p className="text-white font-semibold p-4 sm:p-6 text-base sm:text-lg leading-snug">
                  {content.objectiveDescription}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Values
