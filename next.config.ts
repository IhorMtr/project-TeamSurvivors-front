import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'ac.goit.global', pathname: '/**' },
      { protocol: 'https', hostname: 'res.cloudinary.com', pathname: '/**' },
      { protocol: 'https', hostname: 'ftp.goit.study', pathname: '/**' },
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
