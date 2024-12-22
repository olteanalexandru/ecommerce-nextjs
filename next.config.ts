const config = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.shopify.com',
        pathname: '/s/files/**'
      }
    ]
  },
  i18n: {
    locales: ['en', 'ro'],
    defaultLocale: 'en',
    localeDetection: true
  }
};

export default config;
