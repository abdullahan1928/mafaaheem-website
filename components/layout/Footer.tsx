"use client"

import { useLanguage } from "@/contexts/LanguageContext"
import { footerContent } from "@/data/footer"
import { email, location, locationLink, phone, socialLinks } from "@/data/main"
import { ROUTES } from "@/routes"
import { Mail, MapPin, Phone, ArrowRight } from "lucide-react"
import Link from "next/link"

const Footer = () => {
  const { language, isRTL } = useLanguage()
  const content = footerContent[language]
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={`bg-gradient-to-b from-mafaaheem-brown to-mafaaheem-brown/95 text-white pt-12 sm:pt-16 pb-6 sm:pb-8 ${
        isRTL ? "text-right" : "text-left"
      }`}
      dir={isRTL ? "rtl" : "ltr"}
    >
      <div className="container mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 sm:gap-12 mb-10 sm:mb-12">
          {/* About */}
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-4 flex items-center gap-2">
              <div className="h-1 w-6 sm:w-8 bg-gradient-to-r from-mafaaheem-gold to-mafaaheem-green rounded-full" />
              {content.aboutHeading}
            </h3>
            <p className="text-white/80 mb-6 text-sm sm:text-base leading-relaxed">{content.aboutText}</p>
            <div className={`flex ${isRTL ? "space-x-reverse" : ""} space-x-3 sm:space-x-4`}>
              {socialLinks.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white/10 hover:bg-mafaaheem-gold p-2 sm:p-2.5 rounded-full text-white transition-all duration-300 hover:scale-110 hover:shadow-lg"
                    aria-label={social.label}
                  >
                    <Icon size={18} />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="h-1 w-6 sm:w-8 bg-gradient-to-r from-mafaaheem-gold to-mafaaheem-green rounded-full" />
              {content.quickLinks}
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              {[content.home, content.courses, content.team, content.about].map((name, idx) => (
                <li key={idx}>
                  <Link
                    href={
                      idx === 0
                        ? ROUTES.HOME
                        : idx === 1
                        ? ROUTES.COURSES
                        : idx === 2
                        ? ROUTES.TEAM
                        : "#about"
                    }
                    className="text-white/80 hover:text-mafaaheem-gold transition-colors duration-300 flex items-center gap-2 group"
                  >
                    <ArrowRight
                      size={14}
                      className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                        isRTL ? "rotate-180" : ""
                      }`}
                    />
                    {name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Programs */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="h-1 w-6 sm:w-8 bg-gradient-to-r from-mafaaheem-gold to-mafaaheem-green rounded-full" />
              {content.programs}
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <li>
                <Link
                  href={ROUTES.COURSES}
                  className="text-white/80 hover:text-mafaaheem-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={14}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                      isRTL ? "rotate-180" : ""
                    }`}
                  />
                  {content.youthTraining}
                </Link>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-mafaaheem-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={14}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                      isRTL ? "rotate-180" : ""
                    }`}
                  />
                  <span className="arabic text-sm sm:text-base">البناء المنهجي</span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-white/80 hover:text-mafaaheem-gold transition-colors duration-300 flex items-center gap-2 group"
                >
                  <ArrowRight
                    size={14}
                    className={`opacity-0 group-hover:opacity-100 transition-opacity ${
                      isRTL ? "rotate-180" : ""
                    }`}
                  />
                  {content.studyCircles}
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
              <div className="h-1 w-6 sm:w-8 bg-gradient-to-r from-mafaaheem-gold to-mafaaheem-green rounded-full" />
              {content.contact}
            </h3>
            <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base">
              <li className="flex items-start gap-3 group">
                <MapPin
                  size={18}
                  className="text-mafaaheem-gold mt-1 flex-shrink-0 group-hover:scale-110 transition-transform"
                />
                <a
                  href={locationLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white/80 hover:text-mafaaheem-gold transition-colors duration-300"
                >
                  {location}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Phone
                  size={18}
                  className="text-mafaaheem-gold flex-shrink-0 group-hover:scale-110 transition-transform"
                />
                <a href={`tel:${phone}`} className="text-white/80 hover:text-mafaaheem-gold transition-colors">
                  {phone}
                </a>
              </li>
              <li className="flex items-center gap-3 group">
                <Mail
                  size={18}
                  className="text-mafaaheem-gold flex-shrink-0 group-hover:scale-110 transition-transform"
                />
                <a
                  href="mailto:mafaaheeminstitute@gmail.com"
                  className="text-white/80 hover:text-mafaaheem-gold transition-colors duration-300"
                >
                  {email}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-6 sm:pt-8 text-center text-xs sm:text-sm">
          <p className="text-white/70">
            © {currentYear} Mafaaheem Institute. {content.rights}
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
