import "./globals.css";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { ContactModalProvider } from "@/contexts/ContactModalContext";
import { Analytics } from "@vercel/analytics/next"

import connectDB from "@/lib/mongodb";

connectDB()

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Analytics />
        <LanguageProvider>
          <ContactModalProvider>
            {children}
          </ContactModalProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}