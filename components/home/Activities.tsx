"use client"

import { useEffect, useRef, useState } from "react"
import { Play } from "lucide-react"
import { Button } from "../ui/button"
import { VideoPlayerModal } from "./VideoPlayerModal"
import { Language, useLanguage } from "@/contexts/LanguageContext"
import Image from "next/image"
import { getActivities, classRecordings, activitesContent } from "@/data/activities"
import SectionHeader from "../shared/SectionHeader"

const ClassRecordings = ({ content }: { content: typeof activitesContent[Language] }) => {
  const [selectedVideo, setSelectedVideo] = useState<string | null>(null)
  const { isRTL } = useLanguage()

  const openVideoPlayer = (driveLink: string) => {
    const fileId = driveLink.match(/\/d\/(.+?)\//)?.[1]
    if (!fileId) return
    const embedUrl = `https://drive.google.com/file/d/${fileId}/preview`
    setSelectedVideo(embedUrl)
  }

  return (
    <div className="py-20 bg-white md:py-24">
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16">
          <h3 className="mb-4 text-2xl font-bold text-mafaaheem-brown md:text-4xl">
            {content.recordingHeading}
          </h3>
          <p className="max-w-2xl mx-auto text-gray-600 text-sm sm:text-base md:text-lg">
            {content.recordingDescription}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {classRecordings.map((recording) => (
            <div
              key={recording.id}
              className="relative overflow-hidden transition-all transform shadow-lg cursor-pointer h-72 sm:h-80 rounded-xl group hover:scale-105 hover:shadow-2xl"
              style={{
                backgroundImage: `url(${recording.posterUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
                backgroundPositionY: recording.backgroundY,
              }}
            >
              <div className="absolute inset-0 transition-all duration-300 bg-gradient-to-t from-black/80 via-black/40 to-transparent group-hover:from-black/90"></div>

              <div className="absolute inset-0 flex flex-col justify-between p-4 sm:p-6 text-white">
                <div>
                  <h3 className="mb-1 text-lg font-bold sm:text-xl">{recording.title}</h3>
                  <p className="text-xs sm:text-sm text-white/80">{recording.instructor}</p>
                  <p className="text-xs sm:text-sm text-white/70">{recording.date}</p>
                </div>

                <Button
                  onClick={() => openVideoPlayer(recording.driveLink)}
                  className={`flex items-center justify-center w-full gap-2 font-semibold text-white bg-mafaaheem-gold hover:bg-mafaaheem-brown text-sm sm:text-base ${isRTL && "flex-row-reverse"}`}
                >
                  <Play className={`w-4 h-4 ${isRTL && "rotate-180"}`} />
                  {content.recordingWatchText}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedVideo && (
        <VideoPlayerModal
          open={!!selectedVideo}
          onClose={() => setSelectedVideo(null)}
          videoUrl={selectedVideo}
        />
      )}
    </div>
  )
}

const Activities = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { language, isRTL } = useLanguage()
  const activities = getActivities(language)
  const content = activitesContent[language]

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".scroll-reveal")
            elements.forEach((el) => el.classList.add("revealed"))
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
    <section
      id="activities"
      className="py-16 sm:py-20 md:py-24 bg-gradient-to-b from-mafaaheem-beige/5 to-white"
      ref={sectionRef}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container px-4 mx-auto sm:px-6 lg:px-8">
        <div className="mb-12 text-center md:mb-16">
          <SectionHeader heading={content.heading} />
          <p className="max-w-3xl mx-auto mt-3 text-base text-gray-600 sm:text-lg scroll-reveal stagger-1">
            {content.description}
          </p>
        </div>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4 mb-16 md:mb-20">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className="relative overflow-hidden transition-all transform shadow-md group rounded-xl h-64 sm:h-72 md:h-80 scroll-reveal card-hover hover:scale-105"
              style={{ animationDelay: `${index * 100 + 200}ms` }}
            >
              <div className="absolute inset-0 z-10 transition-all duration-300 bg-gradient-to-t from-black/70 via-black/30 to-transparent group-hover:from-black/80"></div>
              <Image
                src={activity.image || "/placeholder.svg"}
                alt={activity.title}
                width={400}
                height={320}
                className="absolute object-cover w-full h-full transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 p-4 sm:p-5">
                <div className="flex items-center justify-center w-10 h-10 sm:w-12 sm:h-12 transition-all rounded-full shadow-lg bg-white/90 group-hover:bg-mafaaheem-gold group-hover:text-white">
                  <activity.icon className="w-5 h-5 sm:w-6 sm:h-6 text-mafaaheem-green group-hover:text-white" />
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 z-20 transform translate-y-4 transition-transform duration-300 group-hover:translate-y-0">
                <h3 className="text-lg font-bold text-white mb-1 sm:text-xl">{activity.title}</h3>
                <p className="text-white/90 text-xs sm:text-sm opacity-0 transform -translate-y-4 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                  {activity.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        <ClassRecordings content={content} />
      </div>
    </section>
  )
}

export default Activities
