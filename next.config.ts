import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* output: 'export', // Revertido para Vercel (SSR activo) */
  images: {
    unoptimized: true, // Mantenemos esto si quieres ahorrar cuota de optimización en Vercel, o lo comentamos también.
  },
};

export default nextConfig;
