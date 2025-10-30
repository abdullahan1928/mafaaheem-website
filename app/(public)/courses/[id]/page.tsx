import { cookies } from "next/headers"
import Course from "./Course"
import { Language } from "@/contexts/LanguageContext"
import { coursesData } from "@/data/course"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const cookieStore = cookies()
  const lang = ((await cookieStore).get("language")?.value || "en") as Language
  const { id } = await params;
  console.log("params.id", id)

  const course = coursesData.find((c) => c.id === id)

  if (!course) {
    const notFoundMeta = {
      en: {
        title: "Course Not Found",
        description: "The requested course could not be found.",
      },
      ur: {
        title: "کورس نہیں ملا",
        description: "درخواست کردہ کورس دستیاب نہیں ہے۔",
      },
      ar: {
        title: "لم يتم العثور على الدورة",
        description: "الدورة المطلوبة غير متوفرة.",
      },
    }

    return notFoundMeta[lang] || notFoundMeta.en
  }

  const localizedTitle =
    course.title?.[lang] || course.title?.en
  const localizedDescription =
    course.description?.[lang] ||
    course.description?.en

  return {
    title: `${localizedTitle}`,
    description: `${localizedDescription}`,
  }
}

const CoursePage = () => {
  return <Course />
}

export default CoursePage
