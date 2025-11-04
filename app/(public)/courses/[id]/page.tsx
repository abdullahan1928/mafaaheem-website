import { cookies } from "next/headers"
import Course from "./Course"
import { Language } from "@/contexts/LanguageContext"
import { Metadata } from "next"

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const cookieStore = cookies()
  const lang = (await cookieStore).get("language")?.value as Language || "en"
  const { id } = await params

  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/courses/${id}`, {
      cache: "no-store",
    })

    console.log("res", res)

    if (!res.ok) throw new Error("Course not found")
    const data = await res.json()

    const translations = data.translations || {}
    const localizedTitle = translations.title?.[lang] || translations.title?.en || "Course"
    const localizedDescription = translations.description?.[lang] || translations.description?.en || ""

    return {
      title: localizedTitle,
      description: localizedDescription,
    }
  } catch (error) {
    console.error(error)
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
}

const CoursePage = () => {
  return <Course />
}

export default CoursePage
