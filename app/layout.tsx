import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import { siteUrl } from "@/lib/utils";

const serif = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "swap"
});

const sans = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-sans",
  display: "swap"
});

export const viewport: Viewport = {
  themeColor: "#114E40",
  width: "device-width",
  initialScale: 1
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: {
    default: "PAL's Academy — Private Tutoring for Grade 9–12 & First-Year University",
    template: "%s · PAL's Academy"
  },
  description:
    "Elite private tutoring for high school and first-year university students. Verified tutors, live weekly sessions, measurable results. Book your free consultation.",
  keywords: [
    "GTA tutoring",
    "private tutor Toronto",
    "high school tutor",
    "first year university tutor",
    "math tutor",
    "science tutor",
    "English tutor",
    "French tutor"
  ],
  authors: [{ name: "PAL's Academy" }],
  openGraph: {
    type: "website",
    title: "PAL's Academy — Private Tutoring",
    description:
      "Elite private tutoring for Grade 9–12 and first-year university. Book your free consultation.",
    url: siteUrl("/"),
    siteName: "PAL's Academy",
    locale: "en_CA"
  },
  twitter: {
    card: "summary_large_image",
    title: "PAL's Academy — Private Tutoring",
    description: "Elite private tutoring for Grade 9–12 and first-year university."
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${serif.variable} ${sans.variable}`}>
      <body className="min-h-screen bg-ivory text-ink-800 antialiased">
        <SiteChrome>{children}</SiteChrome>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "EducationalOrganization",
              name: "PAL's Academy",
              url: siteUrl("/"),
              email: "palseduacademy@gmail.com",
              foundingDate: "2025",
              areaServed: "Greater Toronto Area",
              sameAs: []
            })
          }}
        />
      </body>
    </html>
  );
}
