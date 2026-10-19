import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "assets.codante.io",
        pathname: "/codante-apis/olympic-games/pictograms/**",
      },
      {
        protocol: "https",
        hostname: "codante.s3.amazonaws.com",
        pathname: "/codante-apis/olympic-games/pictograms/**",
      },
    ],
  },
  turbopack: {
    root: process.cwd(),
  },
};

export default nextConfig;
