"use client";

import type React from "react";
import { createContext, useContext, useState, useEffect } from "react";

export type Language = "en" | "ur" | "ar";

interface LanguageContextType {
    language: Language;
    setLanguage: (lang: Language) => void;
    isRTL: boolean;
    t: (key: string, translations: Record<Language, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
    const [language, setLanguageState] = useState<Language>(() => {
        if (typeof window !== "undefined") {
            const saved = localStorage.getItem("language") as Language | null;
            if (saved && ["en", "ur", "ar"].includes(saved)) return saved;
        }
        return "en";
    });

    useEffect(() => {
        if (localStorage.getItem("language")) return;

        // 🌍 Otherwise detect from IP once
        fetch("https://ipwho.is/")
            .then(res => res.json())
            .then(data => {
                const arabicCountries = [
                    "SA", "AE", "KW", "QA", "OM", "BH", // Gulf
                    "EG", "LY", "DZ", "MA", "TN", "SD", "YE", // North Africa & Yemen
                    "JO", "LB", "SY", "IQ", "PS", // Levant
                    "MR", "SO", "DJ", "KM", // Others using Arabic officially
                ];

                const indoPakCountries = ["PK", "IN", "BD"];
                const country = data.country_code;

                let detectedLang: Language = "en";

                if (arabicCountries.includes(country)) detectedLang = "ar";
                else if (indoPakCountries.includes(country)) detectedLang = "ur";

                setLanguageState(detectedLang);
                localStorage.setItem("language", detectedLang); // save it so next refresh skips IP lookup
                document.cookie = `language=${detectedLang}; path=/; max-age=31536000`;
            })
            .catch(err => console.error("Error fetching location:", err));
    }, []);

    useEffect(() => {
        document.documentElement.lang = language;
        document.documentElement.dir = language === "ar" || language === "ur" ? "rtl" : "ltr";

        if (language === "ur") {
            document.body.classList.add("urdu");
        } else {
            document.body.classList.remove("urdu");
        }

        if (language === "ar") {
            document.body.classList.add("arabic");
        } else {
            document.body.classList.remove("arabic");
        }
    }, [language]);

    const setLanguage = (lang: Language) => {
        setLanguageState(lang);
        localStorage.setItem("language", lang);
        document.cookie = `language=${lang}; path=/; max-age=31536000`;
    };

    const isRTL = language === "ar" || language === "ur";

    const t = (key: string, translations: Record<Language, string>) => {
        return translations[language] || translations["en"];
    };

    return (
        <LanguageContext.Provider value={{ language, setLanguage, isRTL, t }}>
            {children}
        </LanguageContext.Provider>
    );
}

export function useLanguage() {
    const context = useContext(LanguageContext);
    if (context === undefined) {
        throw new Error("useLanguage must be used within a LanguageProvider");
    }
    return context;
}
