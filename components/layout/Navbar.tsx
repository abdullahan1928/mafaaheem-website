"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import { useContactModal } from "@/contexts/ContactModalContext"
import { useLanguage } from "@/contexts/LanguageContext"
import Link from "next/link"
import { LanguageSwitcher } from "../shared/LanguageSwitcher"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { ROUTES } from "@/routes"
import { cn } from "@/lib/utils"
import { contactContent, navLinks } from "@/data/navbar"

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { openContactModal } = useContactModal()
  const { language } = useLanguage()
  const content = contactContent[language]

  const isActive = (path: string) => {
    if (path === ROUTES.HOME) return pathname === path
    return pathname.startsWith(path)
  }

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (isMobileMenuOpen) setTimeout(() => setIsMobileMenuOpen(false), 0)
  }, [pathname])

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-2 sm:py-3 glassmorphism" : "py-3 sm:py-4 bg-transparent"
      )}
    >
      <div className="container mx-auto px-3 sm:px-4 md:px-6">
        <div className="flex items-center justify-between">
          <Link href={ROUTES.HOME} className="flex items-center gap-2 group">
            <Image
              src="/images/logo/mafaaheem.png"
              alt="Mafaaheem Logo"
              width={1000}
              height={1000}
              className="h-10 sm:h-14 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                href={link.path}
                className={`relative font-medium text-sm lg:text-base transition-colors duration-300 ${isActive(link.path)
                  ? "text-mafaaheem-brown"
                  : "text-foreground hover:text-mafaaheem-brown"
                  }`}
              >
                {link.name[language]}
                {isActive(link.path) && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-mafaaheem-gold to-mafaaheem-green rounded-full" />
                )}
              </Link>
            ))}
            <div className="flex items-center gap-2 lg:gap-3">
              <LanguageSwitcher />
              <Button
                size="sm"
                onClick={openContactModal}
                className="text-xs sm:text-sm transition-all duration-300 hover:shadow-lg"
              >
                {content}
              </Button>
            </div>
          </nav>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <LanguageSwitcher />
            <button
              className="p-2 hover:bg-mafaaheem-gold/10 rounded-lg transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6 text-mafaaheem-brown" />
              ) : (
                <Menu className="h-6 w-6 text-mafaaheem-brown" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <nav className="md:hidden fixed inset-x-0 top-[4rem] z-0 flex justify-center animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="w-[95%] max-w-sm bg-white dark:bg-black/70 border border-mafaaheem-gold/15 rounded-2xl shadow-[0_8px_25px_rgba(0,0,0,0.1)] px-5 py-6 space-y-3">
            {navLinks.map((link, index) => (
              <Link
                key={link.path}
                href={link.path}
                className={`group relative flex items-center justify-between py-3 px-4 rounded-xl font-medium tracking-wide transition-all duration-300 ${isActive(link.path)
                  ? "text-mafaaheem-gold bg-mafaaheem-gold/10"
                  : "text-foreground hover:text-mafaaheem-gold hover:bg-mafaaheem-gold/5"
                  }`}
                style={{ animationDelay: `${index * 70}ms` }}
              >
                {link.name[language]}
              </Link>
            ))}
            <Button className="mt-3 w-full" onClick={openContactModal}>
              {content}
            </Button>
          </div>
        </nav>
      )}
    </header>
  )
}

export default Navbar
