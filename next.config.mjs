// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: { ignoreBuildErrors: true },
  images: { unoptimized: true },
  output: 'export', // ✅ static HTML export
};
export default nextConfig;
