import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/jetore",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
