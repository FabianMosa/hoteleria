/** @type {import('next').NextConfig} */
const nextConfig = {
  // Build compacto para Node en producción (p. ej. Railway): `.next/standalone` + trazado de deps.
  output: "standalone",
  images: {
    // Fotos de habitación servidas desde URLs en BD (p. ej. Unsplash en seed de demo).
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
