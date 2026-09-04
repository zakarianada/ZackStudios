import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async rewrites() {
    return [
      { source: "/web-design/ayour", destination: "/web-design/ayour/index.html" },
      { source: "/web-design/ayour/science", destination: "/web-design/ayour/science.html" },
      { source: "/web-design/ayour/ritual", destination: "/web-design/ayour/ritual.html" },
    ];
  },
};

export default nextConfig;
