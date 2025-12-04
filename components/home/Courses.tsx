"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "../ui/button"
import { BookText, Clock, Calendar, ArrowRight, ArrowLeft } from "lucide-react"
import { useLanguage } from "@/contexts/LanguageContext"
import { CategoryLabels, COURSES } from "@/data/course"
import Link from "next/link"
import Image from "next/image"
import { ROUTES } from "@/routes"
import { programContent } from "@/data/programs"
import SectionHeader from "../shared/SectionHeader"
import { ICourseDTO } from "@/models/Course"

const CourseSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { language, isRTL } = useLanguage()
  const content = programContent[language]

  const [courses, setCourses] = useState<ICourseDTO[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

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

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/courses")
        if (!res.ok) throw new Error("Failed to fetch courses")
        const data = await res.json()
        setCourses(data)
      } catch (err: any) {
        setError(err.message || "Error loading courses")
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  return (
    <section id="programs" className="py-24 bg-white" ref={sectionRef}>
      <div className="container mx-auto px-4 sm:px-6 md:px-8">
        <div className={`text-center mb-16 ${isRTL ? "rtl" : "ltr"}`}>
          <SectionHeader heading={content.heading} />
          <p className="max-w-3xl mx-auto text-base sm:text-lg text-gray-600 scroll-reveal stagger-1 mt-4 px-2">
            {content.descriptionText}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-12">
          {courses.map((course, index) => (
            <div
              key={course.id}
              className="bg-white rounded-2xl overflow-hidden shadow-lg border border-gray-100 transition-all hover:shadow-2xl hover:border-mafaaheem-gold/30 scroll-reveal group transform hover:scale-105"
              style={{ animationDelay: `${index * 200}ms` }}
            >
              <div className="relative h-56 sm:h-64 md:h-72 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-black/20 z-10 group-hover:from-black/80 transition-all duration-300"></div>
                <Image
                  src={course.image || "/placeholder.svg"}
                  alt={course.translations.title[language]}
                  width={600}
                  height={400}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className={`absolute top-4 sm:top-6 z-20 ${isRTL ? "right-4 sm:right-6" : "left-4 sm:left-6"}`}>
                  <span className="bg-mafaaheem-gold/95 text-white text-[10px] sm:text-xs font-bold uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full shadow-lg">
                    {CategoryLabels[course.category][language]}
                  </span>
                </div>
                <div className={`absolute bottom-4 sm:bottom-6 z-20 ${isRTL ? "right-6 left-6 text-right" : "left-6 right-6"}`}>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white mb-1 sm:mb-2">
                    {course.translations.title[language]}
                  </h3>
                </div>
              </div>

              <div className="p-5 sm:p-8">
                <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-6 pb-6 border-b border-gray-100">
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                    <Clock className="h-4 w-4 sm:h-5 sm:w-5 text-mafaaheem-brown" />
                    <span>{course.translations.duration[language]}</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs sm:text-sm font-semibold text-gray-700">
                    <Calendar className="h-4 w-4 sm:h-5 sm:w-5 text-mafaaheem-green" />
                    <span>{content.ongoingText}</span>
                  </div>
                </div>

                <p className="text-gray-600 mb-6 leading-relaxed text-sm sm:text-base">
                  {course.translations.description[language]}
                </p>

                <div className="mb-8">
                  <h4 className="font-bold text-mafaaheem-brown mb-4 flex items-center gap-2 text-sm sm:text-base">
                    <BookText className="h-4 w-4 sm:h-5 sm:w-5" />
                    {content.featuresText}
                  </h4>
                  <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
                    {course.translations.features[language].map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-2 sm:gap-3 text-xs sm:text-sm text-gray-700"
                      >
                        <span className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-mafaaheem-gold shrink-0 mt-2"></span>
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link href={ROUTES.PUBLIC.COURSES.VIEW(course.slug)} className="block">
                  <Button className="w-full text-white font-semibold py-5 sm:py-6 rounded-lg flex items-center justify-center gap-2 transition-all text-sm sm:text-base">
                    {content.viewText}
                    {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
                  </Button>
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link href={ROUTES.PUBLIC.COURSES.LIST}>
            <Button
              variant="outline"
              size="lg"
              className="scroll-reveal stagger-1 border-2 border-mafaaheem-green text-mafaaheem-green hover:bg-mafaaheem-green font-semibold px-6 sm:px-8 py-5 sm:py-6 rounded-lg bg-transparent text-sm sm:text-base"
            >
              {content.viewAllText}
              {isRTL ? <ArrowLeft className="h-4 w-4" /> : <ArrowRight className="h-4 w-4" />}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CourseSection
