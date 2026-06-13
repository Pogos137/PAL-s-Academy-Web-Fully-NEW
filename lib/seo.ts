import type { Metadata } from "next";
import { siteUrl } from "@/lib/utils";

export const SITE_NAME = "PAL's Academy";

// The branded 1200×630 social card, served by app/og/route.tsx. Relative URL is
// resolved to an absolute one via metadataBase. Shared by og:image + twitter:image.
export const OG_IMAGE = {
  url: "/og",
  width: 1200,
  height: 630,
  alt: "PAL's Academy — Private Tutoring for Grade 9–12 & First-Year University in the GTA"
} as const;

type PageMetaInput = {
  /** The page-specific title segment, e.g. "Pricing & Packages". The brand
   *  name is appended automatically for the social (og/twitter) title. */
  title: string;
  /** 150–160 char meta description, keyword-forward with a clear CTA. */
  description: string;
  /** Absolute path for this route, e.g. "/pricing". Used for canonical + og:url. */
  path: string;
};

/**
 * Build per-page metadata with a correct, page-specific canonical, og:url,
 * og:title and twitter:title. og:image / twitter:image are supplied
 * automatically site-wide by app/opengraph-image.tsx + app/twitter-image.tsx,
 * so individual pages do not need to declare an image.
 */
export function buildMetadata({ title, description, path }: PageMetaInput): Metadata {
  const socialTitle = `${title} · ${SITE_NAME}`;
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      type: "website",
      title: socialTitle,
      description,
      url: siteUrl(path),
      siteName: SITE_NAME,
      locale: "en_CA",
      images: [OG_IMAGE]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description,
      images: [OG_IMAGE.url]
    }
  };
}
