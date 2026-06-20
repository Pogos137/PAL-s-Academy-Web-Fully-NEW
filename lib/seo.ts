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
  /** Optional override for the social (og/twitter) description. When omitted,
   *  the meta `description` is reused — so existing pages are unaffected. */
  ogDescription?: string;
  /** OpenGraph type. Defaults to "website"; blog posts pass "article" so social
   *  platforms and AI crawlers classify the page as editorial content. */
  ogType?: "website" | "article";
  /** Article publish date (ISO). Emitted as og:article:published_time. */
  publishedTime?: string;
  /** Article last-modified date (ISO). Emitted as og:article:modified_time. */
  modifiedTime?: string;
  /** Article author name(s). Emitted as og:article:author. */
  authors?: string[];
};

/**
 * Build per-page metadata with a correct, page-specific canonical, og:url,
 * og:title and twitter:title. og:image / twitter:image are supplied
 * automatically site-wide by app/opengraph-image.tsx + app/twitter-image.tsx,
 * so individual pages do not need to declare an image.
 */
export function buildMetadata({
  title,
  description,
  path,
  ogDescription,
  ogType = "website",
  publishedTime,
  modifiedTime,
  authors
}: PageMetaInput): Metadata {
  const socialTitle = `${title} · ${SITE_NAME}`;
  const socialDescription = ogDescription ?? description;
  // Only attach article-specific OG fields when this is an article, so static
  // pages keep their clean `type: "website"` graph.
  const articleOg =
    ogType === "article"
      ? { type: "article" as const, publishedTime, modifiedTime, authors }
      : { type: "website" as const };
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      ...articleOg,
      title: socialTitle,
      description: socialDescription,
      url: siteUrl(path),
      siteName: SITE_NAME,
      locale: "en_CA",
      images: [OG_IMAGE]
    },
    twitter: {
      card: "summary_large_image",
      title: socialTitle,
      description: socialDescription,
      images: [OG_IMAGE.url]
    }
  };
}
