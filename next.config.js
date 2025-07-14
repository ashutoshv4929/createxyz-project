const withPWA = require('@ducanh2912/next-pwa');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];
    return config;
  },
};

module.exports = withPWA({
  dest: 'public',
  register: true,
  skipWaiting: true,
})(nextConfig);
