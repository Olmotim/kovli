import type { NextConfig } from "next";
import path from "path";
import createMDX from "@next/mdx";

const nextConfig: NextConfig = {
  pageExtensions: ["js", "jsx", "ts", "tsx", "md", "mdx"],
  transpilePackages: ["@kovli/schemas", "@kovli/db", "@kovli/domain"],
  turbopack: {
    root: path.resolve(__dirname, "../.."),
  },
  // Por defecto Next.js limita el cuerpo de una Server Action a 1 MB — una
  // foto de móvil normal ya lo supera. Afecta a cualquier subida de archivo
  // por Server Action (avatar, foto de perro, fotos del diario), no solo al
  // perfil.
  experimental: {
    serverActions: {
      bodySizeLimit: "4mb",
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "**.supabase.co",
        pathname: "/storage/v1/object/public/**",
      },
    ],
  },
};

const withMDX = createMDX({});

export default withMDX(nextConfig);
