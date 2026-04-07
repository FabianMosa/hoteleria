/** @type {import('next').NextConfig} */
const nextConfig = {
  // Imagen Docker mínima: empaqueta solo dependencias trazadas (ver Dockerfile).
  output: "standalone",
};

export default nextConfig;
