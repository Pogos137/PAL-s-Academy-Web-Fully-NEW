import { renderOgImage } from "@/lib/og-image";

// Branded 1200×630 social card served at /og. Implemented as a normal Route
// Handler (not an opengraph-image.tsx metadata file) so it builds regardless of
// the project's filesystem path. Referenced as the og:image / twitter:image in
// metadata (see lib/seo.ts and app/layout.tsx).
// Runs on the Node.js runtime (next/og works there in 14.2+); avoids the
// "edge runtime disables static generation" build warning.
export function GET() {
  return renderOgImage();
}
