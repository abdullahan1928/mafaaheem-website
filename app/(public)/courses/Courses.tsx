"use client"

import { useEffect, useState } from "react"
import CourseCard from "@/components/courses/CourseCard"
import { Button } from "@/components/ui/button"
import { BookOpen, Filter, Search, Sparkles } from "lucide-react"
import { CategoryLabels } from "@/data/course"
import { useLanguage } from "@/contexts/LanguageContext"
import { coursesContent } from "@/data/courses"
import { ICourse, ICourseDTO } from "@/models/Course"

interface CoursesProps {
  initialCourses: ICourseDTO[]
}

const Courses = ({ initialCourses }: CoursesProps) => {
  const [courses, setCourses] = useState<ICourseDTO[]>(initialCourses)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const { language, isRTL } = useLanguage()
  const content = coursesContent[language]

  const allCategoryLabels: Record<string, string> = {
    en: "All",
    ur: "تمام",
    ar: "الكل",
  }
  const allCategoryLabel = allCategoryLabels[language] || allCategoryLabels.en

  /** Fetch Courses */
  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/courses")
        if (!res.ok) throw new Error("Failed to fetch courses")
        const data = await res.json()
        setCourses(data.data)
      } catch (err: any) {
        setError(err.message || "Error loading courses")
      } finally {
        setLoading(false)
      }
    }
    fetchCourses()
  }, [])

  /** Get category labels dynamically */
  const categories = [
    allCategoryLabel,
    ...new Set(
      courses.map((course) => CategoryLabels[course.category as keyof typeof CategoryLabels]?.[language])
    ),
  ]

  /** Apply filtering */
  const filteredCourses = courses.filter((course) => {
    const matchesSearch =
      course.translations.title[language]
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      course.translations.description[language]
        .toLowerCase()
        .includes(searchTerm.toLowerCase())

    const courseCategory = CategoryLabels[course.category as keyof typeof CategoryLabels]?.[language]
    const matchesCategory =
      selectedCategory === null ||
      selectedCategory === allCategoryLabel ||
      courseCategory === selectedCategory

    return matchesSearch && matchesCategory
  })

  /** Reset selected category when language changes */
  useEffect(() => {
    if (selectedCategory !== null) {
      setSelectedCategory(null)
    }
  }, [language])

  /** Loading State */
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-mafaaheem-brown text-lg font-medium">
          {content.loading || "Loading courses..."}
        </p>
      </div>
    )
  }

  /** Error State */
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-6">
        <div>
          <BookOpen className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-mafaaheem-brown mb-2">
            {content.errorTitle || "Something went wrong"}
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
        </div>
      </div>
    )
  }

  return (
    <main className={`min-h-screen pt-24 pb-16`}>
      <div className="container mx-auto px-4 md:px-6">
        {/* Hero Section */}
        <div className={`max-w-4xl mx-auto text-center mb-16`}>
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-mafaaheem-gold/20 to-mafaaheem-brown/20 px-4 py-2 rounded-full mb-6 border border-mafaaheem-gold/30">
            <BookOpen className="h-4 w-4 text-mafaaheem-brown" />
            <span className="text-sm font-medium text-mafaaheem-brown">
              {content.heading}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-mafaaheem-brown mb-4">
            {content.exploreTitle}
          </h1>
          <p className="text-lg text-gray-600">{content.exploreSubTitle}</p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-12">
          <div className="flex flex-col gap-6">
            {/* Search */}
            <div className="relative">
              <div
                className={`absolute inset-y-0 ${isRTL ? "right-0 pr-4" : "left-0 pl-4"
                  } flex items-center pointer-events-none`}
              >
                <Search className="h-5 w-5 text-mafaaheem-brown/40" />
              </div>
              <input
                type="text"
                placeholder={content.searchCoursePlaceholder}
                className={`block w-full ${isRTL ? "pr-12 pl-4" : "pl-12 pr-4"
                  } py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-mafaaheem-gold focus:border-transparent focus:outline-none transition`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter */}
            <div className="border-t pt-6">
              <div className="flex items-center gap-3 mb-4">
                <Filter className="h-5 w-5 text-mafaaheem-brown" />
                <span className="text-sm font-semibold text-gray-700">
                  {content.filterCategory}
                </span>
              </div>
              <div className="flex flex-wrap gap-3">
                {categories.map((category) => (
                  <Button
                    key={category}
                    size="sm"
                    variant={
                      selectedCategory === category ||
                        (category === allCategoryLabel && selectedCategory === null)
                        ? "default"
                        : "outline"
                    }
                    onClick={() =>
                      setSelectedCategory(
                        category === allCategoryLabel ? null : category
                      )
                    }
                    className="transition-all duration-200"
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Courses Grid */}
        {filteredCourses.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredCourses.map((course, index) => (
              <div key={course.slug}>
                <CourseCard {...course} />
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gradient-to-br from-mafaaheem-beige/20 to-mafaaheem-gold/10 rounded-2xl border border-mafaaheem-gold/20">
            <BookOpen className="h-16 w-16 text-mafaaheem-brown/30 mx-auto mb-4" />
            <h3 className="text-2xl font-bold text-mafaaheem-brown mb-2">
              {content.noCourseFound}
            </h3>
            <p className="text-gray-600 mb-6">{content.tryAdjustFilter}</p>
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm("")
                setSelectedCategory(null)
              }}
            >
              {content.clearFilter}
            </Button>
          </div>
        )}

        {/* CTA */}
        <div className="mt-20 bg-gradient-to-r from-mafaaheem-brown/10 to-mafaaheem-gold/10 rounded-2xl p-12 text-center border border-mafaaheem-gold/20">
          <div className="inline-flex items-center gap-2 bg-white px-4 py-2 rounded-full mb-6 border border-mafaaheem-gold/30">
            <Sparkles className="h-4 w-4 text-mafaaheem-gold" />
            <span className="text-sm font-medium text-mafaaheem-brown">
              {content.specialRequest}
            </span>
          </div>
          <h2 className="text-3xl font-bold text-mafaaheem-brown mb-4">
            {content.dontSee}
          </h2>
          <p className="text-gray-600 mb-8 max-w-2xl mx-auto text-lg">
            {content.expanding}
          </p>
          <Button size="lg">{content.requestCourse}</Button>
        </div>
      </div>
    </main>
  )
}

export default Courses
