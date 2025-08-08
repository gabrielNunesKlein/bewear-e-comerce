import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ['fsc-projects-static.s3.us-east-1.amazonaws.com'],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "d4lgxe9bm8juw.cloudfront.net",
      },
    ],
  },
};

export default nextConfig;
