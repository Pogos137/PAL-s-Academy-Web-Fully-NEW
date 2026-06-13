import { renderOgImage } from "@/lib/og-image";

// Branded 1200×630 social card served at /og. Implemented as a normal Route
// Handler (not an opengraph-image.tsx metadata file) so it builds regardless of
// the project's filesystem path. Referenced as the og:image / twitter:image in
// metadata (see lib/seo.ts and app/layout.tsx).
export const runtime = "edge";

export function GET() {
  return renderOgImage();
}
