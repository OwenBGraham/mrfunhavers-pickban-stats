/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
    ],
  },
  // Ensure Next.js knows about the src directory
  distDir: '.next',
  // Enable static file serving from public directory
  assetPrefix: '/',
};

module.exports = nextConfig; 