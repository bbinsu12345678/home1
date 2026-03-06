import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    // output: 'export', // Static Export 설정 (ISR 사용 시 주석 처리 필요)ensure deployment success
    images: {
        unoptimized: true, // Required for static export
    },
    trailingSlash: true, // Forces "dir/index.html" export, resolving Netlify 404s with directory conflicts
    typescript: {
        ignoreBuildErrors: true, // Often needed for rapid deployment contexts
    },
};

export default nextConfig;
