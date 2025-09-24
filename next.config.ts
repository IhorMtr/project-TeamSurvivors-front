import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
<<<<<<< HEAD
      {
        protocol: 'https',
        hostname: 'ftp.goit.study',
        pathname: '/img/lehlehka/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        pathname: '/**',
      },
=======
      { protocol: 'https', hostname: 'ac.goit.global', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
>>>>>>> main
    ],
  },

  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: `${process.env.API_BASE}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;