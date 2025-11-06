/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true, // Continue build even if TS errors exist
  },
  images: {
    unoptimized: true, // Disable built-in image optimization
  },
  output: 'standalone', // ✅ Enables .next/standalone for Node deployments
}

export default nextConfig
