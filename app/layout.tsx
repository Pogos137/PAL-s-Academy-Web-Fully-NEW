import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import SiteChrome from "@/components/layout/SiteChrome";
import { siteUrl, SITE_URL } from "@/lib/utils";
import { OG_IMAGE } from "@/lib/seo";

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
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Private Tutoring in the GTA for Grade 9–12 & First-Year University | PAL's Academy",
    template: "%s · PAL's Academy"
  },
  description:
    "Private 1-on-1 tutoring for Grade 9–12 and first-year university students across the Greater Toronto Area. Verified tutors, weekly online sessions, measurable results. Book a free consultation.",
  authors: [{ name: "PAL's Academy" }],
  openGraph: {
    type: "website",
    title: "PAL's Academy — Private Tutoring for Grade 9–12 & First-Year University",
    description:
      "Verified 1-on-1 tutors for high school and first-year university students across the GTA. Weekly online sessions, measurable results. Book a free consultation.",
    url: siteUrl("/"),
    siteName: "PAL's Academy",
    locale: "en_CA",
    images: [OG_IMAGE]
  },
  twitter: {
    card: "summary_large_image",
    title: "PAL's Academy — Private Tutoring for Grade 9–12 & First-Year University",
    description: "Verified 1-on-1 tutors across the GTA. Weekly online sessions, measurable results.",
    images: [OG_IMAGE.url]
  },
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  // Paste the verification token from Google Search Console into
  // NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION (Vercel env). Omitted when unset.
  verification: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION
    ? { google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION }
    : undefined
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
              "@id": siteUrl("/#organization"),
              name: "PAL's Academy",
              alternateName: "PALs Academy",
              url: siteUrl("/"),
              logo: siteUrl("/logo-mark.svg"),
              image: siteUrl("/og"),
              email: "palseduacademy@gmail.com",
              description:
                "Private 1-on-1 tutoring for Grade 9–12 and first-year university students across the Greater Toronto Area. Verified tutors, weekly online sessions, measurable results.",
              foundingDate: "2025",
              slogan: "Tutoring, refined.",
              knowsAbout: [
                "Chemistry tutoring",
                "Physics tutoring",
                "Biology tutoring",
                "Calculus tutoring",
                "Functions and Advanced Functions",
                "English tutoring",
                "French tutoring",
                "Computer Science tutoring",
                "First-year university science",
                "Ontario high school curriculum"
              ],
              areaServed: [
                "Toronto",
                "Mississauga",
                "Scarborough",
                "North York",
                "Etobicoke",
                "Markham",
                "Brampton",
                "Vaughan",
                "Greater Toronto Area"
              ].map((name) => ({ "@type": "City", name })),
              contactPoint: {
                "@type": "ContactPoint",
                contactType: "Customer Support",
                email: "palseduacademy@gmail.com",
                areaServed: "CA",
                availableLanguage: ["English", "French"]
              },
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Tutoring Packages",
                url: siteUrl("/pricing")
              }
            })
          }}
        />
      </body>
    </html>
  );
}
