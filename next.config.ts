import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: false,
  poweredByHeader: false,
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
};

export default nextConfig;
