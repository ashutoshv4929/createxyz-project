const withPWA = require('@ducanh2912/next-pwa');

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make pdfjs work
    return config;
  },
};

const pwaConfig = withPWA({
    dest: 'public',
    register: true,
    skipWaiting: true,
});

module.exports = pwaConfig(nextConfig);
