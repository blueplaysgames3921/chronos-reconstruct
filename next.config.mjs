/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'gen.pollinations.ai',
        port: '',
        pathname: '/**',
      },
    ],
  },
  // Since we are using Edge runtime for AI calls
  experimental: {
    serverComponentsExternalPackages: [],
  },
};

export default nextConfig;

