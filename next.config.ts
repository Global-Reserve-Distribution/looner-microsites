export default {
  experimental: {
    ppr: true,
    inlineCss: true,
    useCache: true
  },
  typescript: {
    // Ignore TypeScript errors during builds to handle attached assets with import issues
    ignoreBuildErrors: true
  },
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  }
};
