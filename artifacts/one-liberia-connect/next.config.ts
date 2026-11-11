import type { NextConfig } from "next";

const replitDevDomain = process.env.REPLIT_DEV_DOMAIN;

const nextConfig: NextConfig = {
  reactStrictMode: true,
  allowedDevOrigins: ["127.0.0.1", ...(replitDevDomain ? [replitDevDomain] : [])],
  async rewrites() {
    return [
      {
        source: "/forms/inquiries",
        destination: "/api/inquiries",
      },
    ];
  },
};

export default nextConfig;
