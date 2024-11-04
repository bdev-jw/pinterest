/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'lh3.googleusercontent.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'firebasestorage.googleapis.com',
          pathname: '/**',
        }
      ],
      dangerouslyAllowSVG: true,
      contentDispositionType: 'attachment',
      minimumCacheTTL: 60,
    },
  }
  
  module.exports = nextConfig