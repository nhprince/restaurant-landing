/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  env: {
    NEXT_PUBLIC_SKIP_FONT_OPTIMIZATION: 'true',
  },
};

export default nextConfig;
