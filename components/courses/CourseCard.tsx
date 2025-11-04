import { Button } from "@/components/ui/button"
import { Calendar, Clock, Users, ArrowRight, ArrowLeft } from "lucide-react"
import { CategoryLabels, courseContent } from "@/data/course"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/contexts/LanguageContext"
import Link from "next/link"
import Image from "next/image"
import { ROUTES } from "@/routes"
import { ICourseDTO } from "@/models/Course"

const CourseCard = (course: ICourseDTO) => {
  const { isRTL, language } = useLanguage()
  const content = courseContent[language]

  const { slug, image, students, featured = false, translations } = course;

  const { title, author, description, duration, startDateText: startDate } = translations;

  return (
    <div
      className={cn(
        "group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-500 border",
        featured
          ? "border-mafaaheem-gold/30 ring-1 ring-mafaaheem-gold/20"
          : "border-gray-100 hover:border-mafaaheem-gold/50",
      )}
    >
      {/* Image Section */}
      <div className="relative overflow-hidden">
        {featured && (
          <div className={`absolute top-3 ${isRTL ? "left-3" : "right-3"} z-20 animate-pulse`}>
            <span className="bg-gradient-to-r from-mafaaheem-gold to-mafaaheem-green text-white text-xs font-bold px-3 py-1 rounded-full shadow-lg">
              {content.featured}
            </span>
          </div>
        )}
        <div className={`absolute top-3 ${isRTL ? "right-3" : "left-3"} z-20`}>
          <span className="bg-white/90 backdrop-blur-sm text-mafaaheem-brown text-xs font-medium px-3 py-1 rounded-full shadow-md">
            {CategoryLabels[course.category]?.[language]}
          </span>
        </div>

        <div className="h-48 overflow-hidden relative">
          <Image
            src={image || "/placeholder.svg"}
            alt={title[language]}
            width={400}
            height={192}
            className="w-full h-full object-cover transform transition-transform duration-700 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </div>

      {/* Text Section */}
      <div className="p-5 flex flex-col h-full">
        {/* Title */}
        <h3 className="text-lg font-bold text-mafaaheem-brown group-hover:text-mafaaheem-gold transition-colors duration-300">
          {title[language]}
        </h3>

        {/* Author */}
        {author && author[language] !== "" && (
          <div className="flex items-center gap-1 text-sm italic mb-2">
            <span className="text-mafaaheem-green">
              {content.bookBy}
            </span>
            <p className="text-mafaaheem-brown font-medium">{author[language]}</p>
          </div>
        )}

        {/* Meta Info */}
        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500 my-3">
          <div className="flex items-center gap-1 group/icon">
            <Clock className="h-4 w-4 text-mafaaheem-gold group-hover/icon:scale-110 transition-transform" />
            <span>{duration[language]}</span>
          </div>
          {startDate &&
            <div className="flex items-center gap-1 group/icon">
              <Calendar className="h-4 w-4 text-mafaaheem-green group-hover/icon:scale-110 transition-transform" />
              <span>{startDate[language]}</span>
            </div>
          }
          <div className="flex items-center gap-1 group/icon">
            <Users className="h-4 w-4 text-mafaaheem-brown group-hover/icon:scale-110 transition-transform" />
            <span>
              {students}{" "}
              {content.students}
            </span>
          </div>
        </div>

        {/* Description */}
        <p className="text-gray-600 text-sm line-clamp-3 mb-4 group-hover:text-gray-700 transition-colors">
          {description[language]}
        </p>

        {/* Button */}
        <div className="flex justify-end mt-auto">
          <Link href={ROUTES.PUBLIC.COURSES.VIEW(slug)}>
            <Button size="sm" className="group/btn">
              {content.viewDetails}

              {isRTL ?
                <ArrowLeft className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" /> :
                <ArrowRight className="h-4 w-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
              }
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default CourseCard
