import type { Metadata } from "next";
import { cookies } from "next/headers";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ContactModalProvider } from "@/contexts/ContactModalContext";
import { Language } from "@/contexts/LanguageContext";

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = cookies();
  const lang = ((await cookieStore).get("language")?.value || "en") as Language;

  const siteNames = {
    en: "Mafaaheem",
    ur: "مفاہیم",
    ar: "مفاهيم",
  };

  const templateNames = {
    en: "| Mafaaheem",
    ur: "- مفاہیم",
    ar: "- مفاهيم",
  }

  const siteName = siteNames[lang] || siteNames.en;

  const templateName = templateNames[lang] || templateNames.en;

  return {
    title: {
      default: `${siteName} Institute`,
      template: `%s ${templateName}`,
    },
    description:
      lang === "ur"
        ? "مفاہیم انسٹی ٹیوٹ ایک علمی مرکز ہے جو دینی تعلیم اور فکری نشوونما کے فروغ کے لیے کوشاں ہے۔"
        : lang === "ar"
          ? "معهد مفاهيم هو مركز للتعليم الإسلامي والفهم، مكرّس لتنمية العقول والقلوب من خلال التعليم الأصيل والنمو الروحي."
          : "Mafaaheem Institute is a center of Islamic learning and understanding, devoted to nurturing minds and hearts through authentic education and spiritual growth.",
    openGraph: {
      title: `${siteName} Institute`,
      description:
        lang === "ur"
          ? "علم و فہم کے فروغ اور خدمتِ انسانیت کے لیے وقف ادارہ۔"
          : lang === "ar"
            ? "مكرّس لنشر العلم والإيمان وخدمة المجتمع."
            : "Dedicated to the pursuit of Islamic knowledge, character, and community service.",
      url: "https://www.mafaaheem.com/",
      siteName,
      images: [
        {
          url: "/og-image.jpg",
          width: 1200,
          height: 630,
          alt: `${siteName} Institute`,
        },
      ],
      locale: lang === "ar" ? "ar" : lang === "ur" ? "ur_PK" : "en_US",
      type: "website",
    },
    icons: {
      icon: "/favicon.ico",
    },
    keywords: [
      "Mafaaheem Institute",
      "Islamic Education",
      "Quran and Sunnah",
      "Spiritual Learning",
      "Islamic Center",
      "Religious Studies",
      "Islamic Courses",
      "Islamic Community",
      "اسلامی تعلیم",
      "قرآن و سنت",
      "دینی تعلیم",
      "اسلامی مرکز",
    ],
    authors: [{ name: siteName }],
    creator: siteName,
    publisher: siteName,
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground font-sans antialiased selection:bg-mafaaheem-gold/20">
        <LanguageProvider>
          <ContactModalProvider>
            <div className="min-h-screen flex flex-col">
              <Navbar />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </ContactModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
