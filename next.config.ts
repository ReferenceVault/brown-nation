import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "3000",
        pathname: "/uploads/**",
      },
    ],
    // The backend serves product images from localhost in local dev (until S3 is
    // wired up), which Next 16 blocks by default as an SSRF guard. Safe here since
    // the host is our own backend, not a user-controlled URL.
    dangerouslyAllowLocalIP: true,
    // placehold.co (used for seed/placeholder product images) serves SVG, which the
    // optimizer blocks by default. Paired with a strict CSP + attachment disposition
    // per Next's own guidance, since these are fixed hosts we trust, not arbitrary URLs.
    dangerouslyAllowSVG: true,
    contentDispositionType: "attachment",
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
};

export default nextConfig;
