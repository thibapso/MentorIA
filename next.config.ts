import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Configurações para API Routes e Prisma
  serverExternalPackages: ['@prisma/client', 'prisma'],
  
  // Otimizações
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
