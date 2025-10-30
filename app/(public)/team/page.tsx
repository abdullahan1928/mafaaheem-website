import { cookies } from "next/headers"
import Team from "./Team"
import { Language } from "@/contexts/LanguageContext"

export async function generateMetadata() {
  const cookieStore = cookies()
  const lang = (await cookieStore).get("language")?.value || "en"

  const meta = {
    en: {
      title: "Our Team",
      description:
        "Meet the dedicated team of Mafaaheem driving our mission of Islamic education and research excellence.",
    },
    ur: {
      title: "ہماری ٹیم",
      description:
        "مفاہیم کی مخلص ٹیم سے ملیے جو اسلامی تعلیم اور تحقیق کے فروغ کے لیے کوشاں ہے۔",
    },
    ar: {
      title: "فريقنا",
      description:
        "تعرّف على فريق مفاهيم المخلص الذي يعمل على نشر التعليم والبحث الإسلامي.",
    },
  }

  return meta[lang as Language] || meta.en
}

export default function TeamPage() {
  return <Team />
}
