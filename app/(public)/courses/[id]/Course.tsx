"use client"

import { useEffect, useState } from "react"
import CourseDetails from "@/components/courses/CourseDetails"
import { Button } from "@/components/ui/button"
import { ArrowLeft, ArrowRight, BookOpen } from "lucide-react"
import { Category, courseContent, COURSES, type ICourse } from "@/data/course"
import { useLanguage } from "@/contexts/LanguageContext"
import { useParams, useRouter } from "next/navigation"
import { ROUTES } from "@/routes"

const Course = () => {
  const params = useParams()
  const courseId = params?.id as string
  const [course, setCourse] = useState<ICourse | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  const { language, isRTL } = useLanguage()
  const content = courseContent[language]

  useEffect(() => {
    async function fetchCourse() {
      try {
        const res = await fetch(`/api/courses/${courseId}`);
        if (!res.ok) throw new Error("Failed to fetch course");
        const data = await res.json();

        const { slug: s, image, students, category, featured, enrollmentUrl, translations, instructors, modules } = data;

        setCourse({
          id: s,
          image: image || "",
          students: students || 0,
          category: category || Category.Other,
          featured: featured || false,
          enrollmentUrl: enrollmentUrl || "",
          title: translations?.title || { en: "", ur: "", ar: "" },
          author: translations?.author || { en: "", ur: "", ar: "" },
          description: translations?.description || { en: "", ur: "", ar: "" },
          longDescription:
            translations?.longDescription || { en: "", ur: "", ar: "" },
          duration: translations?.duration || { en: "", ur: "", ar: "" },
          schedule: translations?.schedule || { en: "", ur: "", ar: "" },
          startDate: translations?.startDate || { en: "", ur: "", ar: "" },
          features: translations?.features || {
            en: [],
            ur: [],
            ar: [],
          },
          objectives: translations?.objectives || {
            en: [],
            ur: [],
            ar: [],
          },
          instructors: instructors || [],
          modules: modules || [],
        });

        setLoading(false)
      } catch (error) {
        console.error(error);
      }
    }

    if (courseId) fetchCourse();
  }, [courseId]);

  if (loading) {
    return (
      <div className="min-h-screen pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-mafaaheem-brown mb-4"></div>
          <p className="text-mafaaheem-brown font-medium">
            {content.loading}
          </p>
        </div>
      </div>
    )
  }

  if (!course) {
    return (
      <div className={`min-h-screen pt-24 pb-16 ${isRTL ? "rtl" : "ltr"}`}>
        <div className="container mx-auto px-4 md:px-6">
          <div
            className={`max-w-3xl mx-auto text-center bg-gradient-to-br from-mafaaheem-beige/20 to-mafaaheem-gold/10 p-12 rounded-2xl shadow-lg animate-fade-down border border-mafaaheem-gold/20 ${isRTL ? "text-right" : "text-left"}`}
          >
            <BookOpen className="h-16 w-16 text-mafaaheem-brown/30 mx-auto mb-4" />
            <h1 className="text-3xl font-bold text-mafaaheem-brown mb-4">
              {content.notFound}
            </h1>
            <p className="text-gray-600 mb-8 text-lg">
              {content.notFoundDescription}
            </p>
            <Button onClick={() => router.push(ROUTES.PUBLIC.COURSES.LIST)} variant="outline">
              {isRTL ?
                <ArrowRight className="mr-2 h-4 w-4" /> :
                <ArrowLeft className="mr-2 h-4 w-4" />
              }
              {content.backToCourses}
            </Button>
          </div>
        </div>
      </div>
    )
  }

  return (
    <main className={`min-h-screen pt-20 pb-16 ${isRTL ? "rtl" : "ltr"}`}>
      {/* Sticky Header */}
      <div className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-100 shadow-sm animate-fade-down">
        <div className="container mx-auto px-4 md:px-6 py-4">
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push(ROUTES.PUBLIC.COURSES.LIST)}
              className="hover:bg-primary/80"
            >
              {isRTL ?
                <ArrowRight className="mr-2 h-4 w-4" /> :
                <ArrowLeft className="mr-2 h-4 w-4" />
              }
              {content.backToCourses}
            </Button>
            <Button
              size="sm"
              className=""
              onClick={() => window.open(course.enrollmentUrl, "_blank")}
            >
              {content.enrollNow}
            </Button>
          </div>
        </div>
      </div>

      <CourseDetails course={course} />
    </main>
  )
}

export default Course
