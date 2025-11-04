"use client"

import { Button } from "@/components/ui/button"
import { CategoryLabels, courseContent, type ICourse } from "@/data/course"
import {
  Book,
  Calendar,
  CheckCircle2,
  Clock,
  FileText,
  GraduationCap,
  Monitor,
  Target,
  Users,
  ArrowRight,
  Zap,
  Award,
} from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { useLanguage } from "@/contexts/LanguageContext"
import { cn } from "@/lib/utils"
import Image from "next/image"

const CourseDetails = ({ course }: { course: ICourse }) => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [activeModule, setActiveModule] = useState(0)

  const { language, isRTL } = useLanguage()
  const content = courseContent[language]

  const { title, description, longDescription, image, duration, schedule, startDate, students, instructors, modules, features, objectives, category, enrollmentUrl } = course

  const titleText = title[language]
  const descriptionText = description[language]
  const longDescriptionText = longDescription[language]
  const durationText = duration[language]
  const scheduleText = schedule[language]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".scroll-reveal")
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("revealed")
              }, index * 100)
            })
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
    <div className="page-transition-wrapper" ref={sectionRef} dir={isRTL ? "rtl" : "ltr"}>
      <div className="relative h-96 overflow-hidden group">
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/60 to-black/30 z-10 group-hover:from-black/80 transition-all duration-500"></div>
        <Image
          src={image || "/placeholder.svg"}
          alt={titleText}
          width={1600}
          height={400}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
        />
        <div className={`absolute bottom-0 right-0 p-8 z-20 container mx-auto`}>
          <div className="max-w-4xl">
            <div className={`flex items-center gap-3 mb-4`}>
              <span className="inline-flex items-center gap-2 bg-gradient-to-r from-mafaaheem-gold to-mafaaheem-gold/70 text-mafaaheem-brown text-sm font-bold px-4 py-2 rounded-full shadow-lg">
                <Zap className="h-4 w-4" />
                {CategoryLabels[category][language]}
              </span>
              <span className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm text-white text-sm font-medium px-4 py-2 rounded-full border border-white/30">
                <Users className="h-4 w-4" />
                {students} {content.enrolledText}
              </span>
            </div>
            <h1 className={`text-4xl md:text-5xl font-bold text-white mb-3 leading-tight ${language === "ur" ? "urdu-italic" : ""}`}>
              {titleText}
            </h1>
            <p className="text-white/85 max-w-3xl text-lg leading-relaxed">{descriptionText}</p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className={`grid grid-cols-1 lg:grid-cols-3 gap-8 ${isRTL ? "lg:grid-cols-3" : ""}`}>
          <div className={`lg:col-span-2 ${isRTL ? "order-2 lg:order-2" : "order-2 lg:order-1"} space-y-12`}>
            {/* Overview Section */}
            <section className="scroll-reveal opacity-0">
              <div className={`flex items-center gap-3 mb-6`}>
                <div className="h-1 w-12 bg-gradient-to-r from-mafaaheem-gold to-mafaaheem-gold/50 rounded-full"></div>
                <h2 className="text-3xl font-bold text-mafaaheem-brown">
                  {content.overview}
                </h2>
              </div>
              <div className="bg-gradient-to-br from-mafaaheem-beige/30 to-mafaaheem-gold/10 rounded-2xl p-8 border border-mafaaheem-gold/20 backdrop-blur-sm">
                <p
                  className="prose w-full text-gray-700 leading-relaxed whitespace-pre-line text-lg max-w-full"
                  dangerouslySetInnerHTML={{ __html: longDescriptionText }}
                />
              </div>
            </section>

            {/* Learning Objectives */}
            <section className="scroll-reveal opacity-0">
              <div className={`flex items-center gap-3 mb-6`}>
                <div className="h-1 w-12 bg-gradient-to-r from-mafaaheem-green to-mafaaheem-green/50 rounded-full"></div>
                <h2
                  className={`text-3xl font-bold text-mafaaheem-brown flex items-center gap-2`}
                >
                  <Target className="h-6 w-6 text-mafaaheem-green" />
                  {content.objectives}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {objectives[language]?.map((objective, index) => (
                  <div
                    key={index}
                    className={`flex items-start gap-4 p-5 bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-md hover:border-mafaaheem-green/30 transition-all duration-300 group`}
                  >
                    <div className="shrink-0 mt-1">
                      <CheckCircle2 className="h-6 w-6 text-mafaaheem-green group-hover:scale-110 transition-transform" />
                    </div>
                    <span className="text-gray-700 leading-relaxed">{objective}</span>
                  </div>
                ))}
              </div>
            </section>

            {/* Course Modules - Interactive */}
            <section className="scroll-reveal opacity-0">
              <div className={`flex items-center gap-3 mb-6`}>
                <div className="h-1 w-12 bg-gradient-to-r from-mafaaheem-brown to-mafaaheem-brown/50 rounded-full"></div>
                <h2
                  className={`text-3xl font-bold text-mafaaheem-brown flex items-center gap-2`}
                >
                  <FileText className="h-6 w-6 text-mafaaheem-brown" />
                  {content.modules}
                </h2>
              </div>
              <div className="space-y-3">
                {modules.map((module, index) => {
                  const moduleTitle = module.title[language]
                  const moduleDuration = module.duration[language]
                  return (
                    <div
                      key={index}
                      onClick={() => setActiveModule(activeModule === index ? -1 : index)}
                      className="group cursor-pointer"
                    >
                      <div className="bg-gradient-to-r from-white to-mafaaheem-beige/20 border border-gray-200 rounded-xl overflow-hidden hover:border-mafaaheem-gold/50 transition-all duration-300 shadow-sm hover:shadow-md">
                        <div className={`p-6 flex items-center justify-between`}>
                          <div>
                            <h3 className="font-bold text-lg text-mafaaheem-brown mb-2">{moduleTitle}</h3>
                            <div
                              className={`flex items-center gap-6 text-sm text-gray-600`}
                            >
                              <div className={`flex items-center gap-2`}>
                                <Book className="h-4 w-4 text-mafaaheem-gold" />
                                <span>
                                  {module.lessons}{" "}
                                  {content.lessons}
                                </span>
                              </div>
                              <div className={`flex items-center gap-2`}>
                                <Clock className="h-4 w-4 text-mafaaheem-green" />
                                <span>{moduleDuration}</span>
                              </div>
                            </div>
                          </div>
                          <ArrowRight
                            className={cn(
                              "h-5 w-5 text-mafaaheem-brown transition-transform duration-300 flex-shrink-0",
                              isRTL ? "rotate-180" : "",
                              activeModule === index ? "rotate-90" : ""
                            )}
                          />
                        </div>
                        {activeModule === index && (
                          <div className="px-6 pb-6 border-t border-gray-100 bg-mafaaheem-beige/10">
                            <p className="text-gray-700 text-sm leading-relaxed">
                              {content.overviewDesc}
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>

            {/* Instructors */}
            <section className="scroll-reveal opacity-0">
              <div className={`flex items-center gap-3 mb-6`}>
                <div className="h-1 w-12 bg-gradient-to-r from-mafaaheem-gold to-mafaaheem-gold/50 rounded-full"></div>
                <h2
                  className={`text-3xl font-bold text-mafaaheem-brown flex items-center gap-2`}
                >
                  <GraduationCap className="h-6 w-6 text-mafaaheem-gold" />
                  {content.instructors}
                </h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {instructors.map((instructor, index) => {
                  const instructorRole = instructor.role[language]
                  const instructorName = instructor.name[language]

                  return (
                    <div
                      key={index}
                      className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-white to-mafaaheem-beige/20 border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-mafaaheem-gold/0 to-mafaaheem-gold/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className={`relative p-6 flex items-center gap-5`}>
                        <div className="relative flex-shrink-0">
                          <div className="absolute inset-0 bg-gradient-to-r from-mafaaheem-gold to-mafaaheem-green rounded-full blur-lg opacity-50 group-hover:opacity-75 transition-opacity"></div>
                          <Image
                            src={instructor.image || "/placeholder.svg"}
                            alt={instructorName}
                            width={80}
                            height={80}
                            className="relative h-20 w-20 rounded-full object-cover border-2 border-white shadow-md"
                          />
                        </div>
                        <div>
                          <h3 className="font-bold text-lg text-mafaaheem-brown group-hover:text-mafaaheem-gold transition-colors">
                            {instructorName}
                          </h3>
                          <p className="text-sm text-gray-600 group-hover:text-gray-700 transition-colors">
                            {instructorRole}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            </section>
          </div>

          <div className={`${isRTL ? "order-1 lg:order-1" : "order-1 lg:order-2"}`}>
            <div className="sticky top-24 space-y-4">
              {/* Course Details Card */}
              <div className="bg-gradient-to-br from-white to-mafaaheem-beige/20 rounded-2xl shadow-lg border border-gray-100 overflow-hidden scroll-reveal opacity-0">
                <div className="bg-gradient-to-r from-mafaaheem-brown to-mafaaheem-brown/80 p-6 text-white">
                  <h3 className="text-2xl font-bold mb-1">
                    {content.details}
                  </h3>
                  <p className="text-white/80 text-sm">
                    {content.detailsSubtitle}
                  </p>
                </div>
                <div className="p-6 space-y-5">
                  <div
                    className={`flex items-start gap-4 pb-5 border-b border-gray-100`}
                  >
                    <div className="bg-gradient-to-br from-mafaaheem-gold/20 to-mafaaheem-gold/10 p-3 rounded-lg flex-shrink-0">
                      <Clock className="h-5 w-5 text-mafaaheem-gold" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {content.duration}
                      </p>
                      <p className="font-bold text-mafaaheem-brown text-lg">{durationText}</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-start gap-4 pb-5 border-b border-gray-100`}
                  >
                    <div className="bg-gradient-to-br from-mafaaheem-green/20 to-mafaaheem-green/10 p-3 rounded-lg flex-shrink-0">
                      <Calendar className="h-5 w-5 text-mafaaheem-green" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {content.startDate}
                      </p>
                      <p className="font-bold text-mafaaheem-brown text-lg">{startDate[language]}</p>
                    </div>
                  </div>
                  <div
                    className={`flex items-start gap-4 pb-5 border-b border-gray-100`}
                  >
                    <div className="bg-gradient-to-br from-mafaaheem-brown/20 to-mafaaheem-brown/10 p-3 rounded-lg flex-shrink-0">
                      <Monitor className="h-5 w-5 text-mafaaheem-brown" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {content.schedule}
                      </p>
                      <p className="font-bold text-mafaaheem-brown text-lg">{scheduleText}</p>
                    </div>
                  </div>
                  <div className={`flex items-start gap-4`}>
                    <div className="bg-gradient-to-br from-blue-100 to-blue-50 p-3 rounded-lg flex-shrink-0">
                      <Users className="h-5 w-5 text-blue-600" />
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide">
                        {content.enrolledText}
                      </p>
                      <p className="font-bold text-mafaaheem-brown text-lg">
                        {students} {content.students}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Features Card */}
              <div className="bg-gradient-to-br from-white to-mafaaheem-beige/20 rounded-2xl shadow-lg border border-gray-100 overflow-hidden scroll-reveal opacity-0">
                <div className="bg-gradient-to-r from-mafaaheem-green to-mafaaheem-green/80 p-6 text-white">
                  <h3 className={`text-xl font-bold flex items-center gap-2`}>
                    <Award className="h-5 w-5" />
                    {content.features}
                  </h3>
                </div>
                <div className="p-6 space-y-3">
                  {features[language]?.map((feature, index) => (
                    <div key={index} className={`flex items-start gap-3 group`}>
                      <CheckCircle2 className="h-5 w-5 text-mafaaheem-green flex-shrink-0 mt-0.5 group-hover:scale-110 transition-transform" />
                      <span className="text-gray-700 text-sm leading-relaxed group-hover:text-mafaaheem-brown transition-colors">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* CTA Button */}
              <Button
                size="lg"
                className="w-full font-bold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 text-base scroll-reveal opacity-0 flex items-center justify-center gap-2"
                onClick={() => window.open(enrollmentUrl, "_blank")}
              >
                {content.enrollNow}
                <ArrowRight className={`h-5 w-5 ${isRTL ? "rotate-180" : ""}`} />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CourseDetails
