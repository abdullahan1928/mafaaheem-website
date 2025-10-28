import { cookies } from "next/headers"
import Courses from "./Courses"
import { Language } from "@/contexts/LanguageContext"

export async function generateMetadata() {
  const cookieStore = cookies()
  const lang = (await cookieStore).get("language")?.value || "en"

  const meta = {
    en: {
      title: "Courses",
      description:
        "Explore a wide range of Islamic courses offered by Mafaaheem to deepen your understanding of faith and knowledge.",
    },
    ur: {
      title: "کورسز",
      description:
        "مفاہیم کے پیش کردہ مختلف اسلامی کورسز دریافت کیجیے جو آپ کے علم اور ایمان میں اضافہ کریں۔",
    },
    ar: {
      title: "دوراتنا",
      description:
        "استكشف مجموعة من الدورات الإسلامية التي تقدمها مفاهيم لتعميق فهمك للإيمان والمعرفة.",
    },
  }

  const { title, description } = meta[lang as Language] || meta.en

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      siteName: "Mafaaheem",
    },
    twitter: {
      title,
      description,
    },
  }
}

const CoursesPage = () => {
  return <Courses />
}

export default CoursesPage
