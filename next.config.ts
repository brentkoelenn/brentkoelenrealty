import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // Real listing photos from CREA's DDF® feed are served from
      // realtor.ca media subdomains (exact hostname varies by listing/board),
      // so allow any realtor.ca subdomain over https.
      {
        protocol: "https",
        hostname: "**.realtor.ca",
      },
    ],
  },
};

export default nextConfig;
