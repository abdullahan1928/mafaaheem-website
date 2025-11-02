"use client"

import { useEffect, useRef } from "react"
import TeamCard from "@/components/team/TeamCard"
import { Button } from "@/components/ui/button"
import { Mail, Users, Sparkles } from "lucide-react"
import { useContactModal } from "@/contexts/ContactModalContext"
import { useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"
import { teamContent, TEAM } from "@/data/team"
import Head from "next/head"

const Team = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { openContactModal } = useContactModal()
  const { language, isRTL } = useLanguage()
  const content = teamContent[language]

  // Add scroll reveal effect
  useEffect(() => {
    const handleScroll = () => {
      const elements = document.querySelectorAll(".scroll-reveal:not(.revealed)")
      elements.forEach((el) => {
        const rect = el.getBoundingClientRect()
        const isVisible = rect.top <= window.innerHeight * 0.8
        if (isVisible) {
          el.classList.add("revealed")
        }
      })
    }

    window.addEventListener("scroll", handleScroll)
    setTimeout(handleScroll, 100)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const coreTeam = TEAM.filter((member) => member.teamType === "core")
  const extendedTeam = TEAM.filter((member) => member.teamType === "extended")

  // Multilingual Metadata
  const meta = {
    en: {
      title: "Our Team - Mafaaheem",
      description:
        "Meet the dedicated team of Mafaaheem driving our mission of Islamic education and research excellence.",
    },
    ur: {
      title: "ہماری ٹیم - مفاہیم",
      description:
        "مفاہیم کی مخلص ٹیم سے ملیے جو اسلامی تعلیم اور تحقیق کے فروغ کے لیے کوشاں ہے۔",
    },
    ar: {
      title: "فريقنا - مفاهيم",
      description:
        "تعرّف على فريق مفاهيم المخلص الذي يعمل على نشر التعليم والبحث الإسلامي.",
    },
  }

  return (
    <>
      {/* Dynamic SEO metadata */}
      <Head>
        <title>{meta[language].title}</title>
        <meta name="description" content={meta[language].description} />
        <meta property="og:title" content={meta[language].title} />
        <meta property="og:description" content={meta[language].description} />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/team-preview.jpg" />
        <meta name="twitter:card" content="summary_large_image" />
      </Head>

      <main
        className="min-h-screen pt-24 pb-16"
        ref={sectionRef}
        dir={isRTL ? "rtl" : "ltr"}
      >
        <div className="container mx-auto px-4 md:px-6">
          {/* Hero Section */}
          <div className="max-w-4xl mx-auto text-center mb-16 animate-fade-down px-2 sm:px-4">
            <div
              className={`inline-flex items-center gap-2 bg-gradient-to-r from-mafaaheem-gold/20 to-mafaaheem-brown/20 px-4 py-2 rounded-full mb-6 border border-mafaaheem-gold/30 ${isRTL ? "flex-row-reverse" : ""
                }`}
            >
              <Users className="h-4 w-4 text-mafaaheem-brown" />
              <span className="text-sm font-medium text-mafaaheem-brown">
                {content.ourLeadership}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-mafaaheem-brown mb-4">
              {content.meetTeam}
            </h1>
            <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
              {content.teamDescription}
            </p>
          </div>

          {/* Core Team Members */}
          <div className="mb-20">
            <div className={`flex items-center gap-3 mb-8 scroll-reveal`}>
              <Sparkles className="h-5 w-5 text-mafaaheem-gold" />
              <h2 className="text-2xl font-bold text-mafaaheem-brown">
                {content.coreLeadership}
              </h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {coreTeam.map((member, index) => (
                <div
                  key={member.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TeamCard
                    {...member}
                    name={
                      language === "ur"
                        ? member.urduName
                        : language === "ar"
                          ? member.arabicName
                          : member.name
                    }
                    role={
                      language === "ur"
                        ? member.urduRole
                        : language === "ar"
                          ? member.arabicRole
                          : member.role
                    }
                    bio={
                      language === "ur"
                        ? member.urduBio
                        : language === "ar"
                          ? member.arabicBio
                          : member.bio
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Team Philosophy */}
          <div className="bg-gradient-to-br from-mafaaheem-beige/40 to-mafaaheem-gold/10 rounded-2xl p-6 sm:p-8 md:p-12 mb-20 scroll-reveal border border-mafaaheem-gold/20 shadow-lg">
            <div
              className={`flex flex-col ${isRTL ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-8 sm:gap-12`}
            >
              <div className="w-full lg:w-1/3">
                <div className="relative group">
                  <div className="absolute -inset-1 bg-gradient-to-r from-mafaaheem-gold to-mafaaheem-brown rounded-xl blur opacity-25 group-hover:opacity-75 transition duration-1000"></div>
                  <Image
                    src="/images/study-circle.jpeg"
                    alt="Team collaboration"
                    width={400}
                    height={320}
                    className="relative rounded-xl shadow-xl object-cover w-full h-64 sm:h-80"
                  />
                </div>
              </div>
              <div className="w-full lg:w-2/3">
                <h2 className="text-2xl sm:text-3xl font-bold text-mafaaheem-brown mb-6">
                  {content.teamPhilosophy}
                </h2>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {content.philosophyText1}
                </p>
                <p className="text-gray-700 mb-4 leading-relaxed">
                  {content.philosophyText2}
                </p>
                <p className="text-gray-700 leading-relaxed">
                  {content.philosophyText3}
                </p>
              </div>
            </div>
          </div>

          {/* Extended Team Members */}
          <div className="mb-20">
            <h2 className="text-2xl font-bold text-mafaaheem-brown mb-8 scroll-reveal">
              {content.extendedTeam}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {extendedTeam.map((member, index) => (
                <div
                  key={member.id}
                  className="animate-fade-up"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <TeamCard
                    {...member}
                    name={
                      language === "ur"
                        ? member.urduName
                        : language === "ar"
                          ? member.arabicName
                          : member.name
                    }
                    role={
                      language === "ur"
                        ? member.urduRole
                        : language === "ar"
                          ? member.arabicRole
                          : member.role
                    }
                    bio={
                      language === "ur"
                        ? member.urduBio
                        : language === "ar"
                          ? member.arabicBio
                          : member.bio
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Join Our Team CTA */}
          <div className="bg-gradient-to-r from-mafaaheem-brown to-mafaaheem-brown/80 rounded-2xl p-6 sm:p-8 md:p-12 text-center scroll-reveal shadow-xl border border-mafaaheem-gold/20">
            <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">
              {content.joinMission}
            </h2>
            <p className="text-white/90 mb-8 max-w-2xl mx-auto text-base sm:text-lg leading-relaxed">
              {content.joinDescription}
            </p>
            <Button
              size="lg"
              variant="outline"
              className="border-none bg-white text-mafaaheem-brown hover:bg-mafaaheem-green px-8 py-6 text-base sm:text-lg rounded-lg transition-all"
              onClick={openContactModal}
            >
              <Mail className={`${isRTL ? "ml-2" : "mr-2"} h-5 w-5`} />
              {content.exploreOpportunities}
            </Button>
          </div>
        </div>
      </main>
    </>
  )
}

export default Team
