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
    default: "Chemistry, Physics & Math Tutoring in Toronto | PAL's Academy",
    template: "%s · PAL's Academy"
  },
  description:
    "Expert 1-on-1 tutoring for Ontario Grade 9–12 & first-year university. Chemistry, physics, math & biology. Verified tutors. Free first consultation — book today.",
  authors: [{ name: "PAL's Academy" }],
  openGraph: {
    type: "website",
    title: "Chemistry, Physics & Math Tutoring in Toronto | PAL's Academy",
    description:
      "Expert 1-on-1 tutoring for Ontario Grade 9–12 & first-year university. Chemistry, physics, math & biology. Free consultation.",
    url: siteUrl("/"),
    siteName: "PAL's Academy",
    locale: "en_CA",
    images: [OG_IMAGE]
  },
  twitter: {
    card: "summary_large_image",
    title: "Chemistry, Physics & Math Tutoring in Toronto | PAL's Academy",
    description:
      "Expert 1-on-1 chemistry, physics, math & biology tutoring in Toronto. Verified tutors, weekly sessions. Free consultation.",
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
              "@type": ["EducationalOrganization", "LocalBusiness"],
              "@id": siteUrl("/#organization"),
              name: "PAL's Academy",
              alternateName: "PALs Academy",
              url: siteUrl("/"),
              logo: siteUrl("/logo-mark.svg"),
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
              priceRange: "$$",
              currenciesAccepted: "CAD",
              paymentAccepted: "Interac e-Transfer, PayPal",
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
              hasOfferCatalog: {
                "@type": "OfferCatalog",
                name: "Tutoring Packages",
                url: siteUrl("/pricing"),
                itemListElement: [
                  {
                    "@type": "Offer",
                    name: "Starter — 5 one-on-one sessions",
                    price: "375",
                    priceCurrency: "CAD",
                    category: "1-on-1 Tutoring",
                    url: siteUrl("/pricing"),
                    itemOffered: {
                      "@type": "Service",
                      name: "Starter Tutoring Package",
                      description: "Five 1-on-1 Ontario-curriculum tutoring sessions online over Google Meet"
                    }
                  },
                  {
                    "@type": "Offer",
                    name: "Core — 10 one-on-one sessions",
                    price: "750",
                    priceCurrency: "CAD",
                    category: "1-on-1 Tutoring",
                    url: siteUrl("/pricing"),
                    itemOffered: {
                      "@type": "Service",
                      name: "Core Tutoring Package",
                      description: "Ten 1-on-1 Ontario-curriculum tutoring sessions online over Google Meet"
                    }
                  },
                  {
                    "@type": "Offer",
                    name: "Intensive — 15 one-on-one sessions",
                    price: "1125",
                    priceCurrency: "CAD",
                    category: "1-on-1 Tutoring",
                    url: siteUrl("/pricing"),
                    itemOffered: {
                      "@type": "Service",
                      name: "Intensive Tutoring Package",
                      description: "Fifteen 1-on-1 Ontario-curriculum tutoring sessions online over Google Meet"
                    }
                  },
                  {
                    "@type": "Offer",
                    name: "PAL's Circle — 12-session small group (per student)",
                    price: "420",
                    priceCurrency: "CAD",
                    category: "Small-group Tutoring",
                    url: siteUrl("/pricing"),
                    itemOffered: {
                      "@type": "Service",
                      name: "PAL's Circle Small-Group Package",
                      description: "Twelve small-group sessions (3–4 students, capped at 4) online over Google Meet"
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
