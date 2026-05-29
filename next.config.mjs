/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "ui-avatars.com" }
    ]
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
