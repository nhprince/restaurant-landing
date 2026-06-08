/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/restaurant-landing',
  assetPrefix: '/restaurant-landing/',
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_SKIP_FONT_OPTIMIZATION: 'true',
  },
};

export default nextConfig;
