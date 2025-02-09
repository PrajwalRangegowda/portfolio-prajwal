// Import next-pwa using ES Modules syntax
import nextPWA from 'next-pwa';

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 'media.licdn.com'],
  },
  // Any other Next.js configurations can go here
};

// Apply PWA configuration
const withPWA = nextPWA({
  dest: 'public',
  register: true,
  disable: process.env.NODE_ENV === 'development',
  skipWaiting: true,
});

// Export the merged configuration
export default withPWA(nextConfig);
