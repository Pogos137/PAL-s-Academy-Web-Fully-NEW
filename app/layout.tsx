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
    default: "PAL's Academy | Chemistry, Physics & Math Tutoring in Toronto",
    template: "%s · PAL's Academy"
  },
  description:
    "One-on-one and small-group tutoring in chemistry, physics, biology and senior math for Grade 9–12 and first-year university in the GTA. Free consultation.",
  authors: [{ name: "PAL's Academy" }],
  openGraph: {
    type: "website",
    title: "PAL's Academy | Chemistry, Physics & Math Tutoring in Toronto",
    description:
      "One-on-one and small-group chemistry, physics, biology and senior math tutoring for Grade 9–12 and first-year university in Toronto and the GTA.",
    url: siteUrl("/"),
    siteName: "PAL's Academy",
    locale: "en_CA",
    images: [OG_IMAGE]
  },
  twitter: {
    card: "summary_large_image",
    title: "PAL's Academy | Chemistry, Physics & Math Tutoring in Toronto",
    description:
      "One-on-one and small-group chemistry, physics, biology and senior math tutoring for Grade 9–12 and first-year university in Toronto and the GTA.",
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
              logo: siteUrl("/logo-mark-500.png"),
              image: siteUrl("/og"),
              email: "palseduacademy@gmail.com",
              telephone: "+14377774828",
              description:
                "Private 1-on-1 tutoring for Ontario Grade 9–12 and first-year university students — chemistry, physics, math, biology, English and more. Online sessions over Google Meet, serving the Greater Toronto Area.",
              foundingDate: "2025",
              slogan: "Tutoring, refined.",
              address: {
                "@type": "PostalAddress",
                addressLocality: "Toronto",
                addressRegion: "ON",
                addressCountry: "CA"
              },
              currenciesAccepted: "CAD",
              paymentAccepted: "Interac e-Transfer",
              knowsAbout: [
                "Chemistry tutoring",
                "Physics tutoring",
                "Biology tutoring",
                "Math tutoring",
                "Calculus tutoring",
                "Functions and Advanced Functions",
                "English tutoring",
                "Computer Science tutoring",
                "SCH4U",
                "SPH4U",
                "MHF4U",
                "MCV4U",
                "SBI4U",
                "ENG4U",
                "First-year university science",
                "University tutoring",
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
              // Services we offer, without prices — packages are quoted on the
              // free consultation so they can be scoped to the student.
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Tutoring Services",
                url: siteUrl("/booking"),
                itemListElement: [
                  {
                    "@type": "Offer",
                    name: "1-on-1 Ontario-curriculum tutoring",
                    category: "1-on-1 Tutoring",
                    url: siteUrl("/booking"),
                    itemOffered: {
                      "@type": "Service",
                      name: "1-on-1 Tutoring",
                      description:
                        "One-on-one Ontario-curriculum tutoring for Grade 9–12 and first-year university, live online over Google Meet"
                    }
                  },
                  {
                    "@type": "Offer",
                    name: "PAL's Circle — small-group tutoring",
                    category: "Small-group Tutoring",
                    url: siteUrl("/booking"),
                    itemOffered: {
                      "@type": "Service",
                      name: "PAL's Circle Small-Group Tutoring",
                      description:
                        "Small-group sessions (3–4 students at the same grade and subject, capped at 4) online over Google Meet"
                    }
                  },
                  {
                    "@type": "Offer",
                    name: "Free consultation",
                    category: "Consultation",
                    url: siteUrl("/booking"),
                    itemOffered: {
                      "@type": "Service",
                      name: "Free 20-Minute Consultation",
                      description:
                        "A free 20-minute call to diagnose where the student is losing marks and outline a weekly plan"
                    }
                  }
                ]
              }
            })
          }}
        />
      </body>
    </html>
  );
}
