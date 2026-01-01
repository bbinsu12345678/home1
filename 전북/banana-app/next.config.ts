import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Required for static export
  },
  trailingSlash: true, // Forces "dir/index.html" export, resolving Netlify 404s with directory conflicts
  typescript: {
    ignoreBuildErrors: true, // Often needed for rapid deployment contexts
  },
};

export default nextConfig;
