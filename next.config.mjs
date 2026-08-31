/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ui-avatars.com" }
    ]
  },
  async redirects() {
    return [
      // The pricing page was retired — quoting is handled on a call so we can
      // scope the package to the student. /pricing is already indexed, so send
      // it permanently to contact rather than letting it 404.
      { source: "/pricing", destination: "/contact", permanent: true },

      // The Aug-2026 SEO brief specified three new landing pages at these
      // slugs. Pages for all three clusters already exist under /tutoring/
      // with months of crawl history, so building the brief's URLs as well
      // would have put two near-identical pages in front of the same query —
      // the cannibalization the brief itself warns against. The slugs are
      // redirected instead, so links written against the brief still land.
      { source: "/chemistry-tutoring-toronto", destination: "/tutoring/toronto/chemistry", permanent: true },
      { source: "/physics-tutoring-toronto", destination: "/tutoring/toronto/physics", permanent: true },
      { source: "/math-tutoring-mississauga", destination: "/tutoring/mississauga/math", permanent: true }
    ];
  },
  experimental: {
    // The admin console + portal must always show live data. By default Next's
    // in-browser Router Cache reuses a previously-rendered page for up to 30s on
    // client-side <Link> navigation — which made the Approvals page show a stale
    // "Nothing pending" view even though a new account was waiting. Setting the
    // dynamic stale time to 0 forces dynamically-rendered routes to refetch on
    // every navigation, so admin pages reflect the database immediately.
    staleTimes: {
      dynamic: 0
    }
  }
};

export default nextConfig;
