/** @type {import('next').NextConfig} */
const nextConfig = {
    typescript: {
      ignoreBuildErrors: true,
    },
    eslint: {
      ignoreDuringBuilds: true,
    },
  };
  
  module.exports = nextConfig; // ✅ Use `module.exports` only in `.js`rm -rf node_modules package-lock.json
  