"use client"

import { useLanguage, type Language } from "@/contexts/LanguageContext"
import { Button } from "@/components/ui/button"
import { Globe, X } from "lucide-react"
import { useEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

export function LanguageSwitcher() {
  const { language, setLanguage, isRTL } = useLanguage()
  const [isOpen, setIsOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)
  const popupRef = useRef<HTMLDivElement>(null)

  const languages: { code: Language; name: string; nativeName: string }[] = [
    { code: "en", name: "English", nativeName: "English" },
    { code: "ur", name: "Urdu", nativeName: "اردو" },
    { code: "ar", name: "Arabic", nativeName: "العربية" },
  ]

  // Detect screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768)
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Close popup on outside click (desktop dropdown)
  useEffect(() => {
    if (isMobile && isOpen) {
      const handleClickOutside = (e: MouseEvent) => {
        const modal = document.getElementById("language-modal");
        if (modal && !modal.contains(e.target as Node)) {
          setIsOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isOpen, isMobile]);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 hover:bg-mafaaheem-gold/80"
      >
        <Globe className="h-4 w-4" />
        <span className={`font-medium ${language === "ur" ? "text-xs" : "text-sm"}`}>{language.toUpperCase()}</span>
      </Button>

      {/* Desktop Dropdown */}
      {!isMobile && isOpen && (
        <div
          ref={popupRef}
          className={`absolute mt-2 w-48 bg-white rounded-lg shadow-lg border border-mafaaheem-gold/20 z-50 animate-in fade-in slide-in-from-top-2 duration-200 ${isRTL ? "left-0" : "right-0"}`}
        >
          <div className="p-2 space-y-2">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setLanguage(lang.code)
                  setIsOpen(false)
                }}
                className={`w-full text-left px-4 py-2 rounded-md transition-colors duration-200 ${language === lang.code
                  ? "bg-mafaaheem-gold/20 text-mafaaheem-brown font-semibold"
                  : "text-foreground hover:bg-mafaaheem-gold/10"
                  }`}
              >
                <div className="font-medium">{lang.name}</div>
                <div className="text-sm text-foreground/60">{lang.nativeName}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Mobile Popup */}
      {isMobile && isOpen && createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div
            id="language-modal"
            className="bg-white dark:bg-neutral-900 w-[90%] max-w-sm rounded-2xl p-6 shadow-lg border border-mafaaheem-gold/20 animate-in zoom-in-75 duration-300 relative"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 text-gray-600 hover:text-mafaaheem-gold transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
            <h2 className="text-lg font-semibold text-mafaaheem-brown mb-4 text-center">
              Select Language
            </h2>
            <div className="space-y-2">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setLanguage(lang.code)
                    setIsOpen(false)
                  }}
                  className={`w-full py-3 rounded-xl text-center text-base font-medium transition-all duration-200 ${language === lang.code
                    ? "bg-mafaaheem-gold/90 text-white"
                    : "bg-mafaaheem-gold/10 hover:bg-mafaaheem-gold/20 text-mafaaheem-brown"
                    }`}
                >
                  <div>{lang.name}</div>
                  <div className="text-sm opacity-70">{lang.nativeName}</div>
                </button>
              ))}
            </div>
          </div>
        </div>,
        document.body
      )}
    </div>
  )
}
