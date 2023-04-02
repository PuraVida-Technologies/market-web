/** @type {import('next').NextConfig} */
const nextConfig = {
  distDir: "dist",
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_MAP_API_KEY: process.env.NEXT_PUBLIC_MAP_API_KEY,
    NEXT_WEBSITE_URL: process.env.NEXT_WEBSITE_URL,
  },
  publicRuntimeConfig: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_MAP_API_KEY: process.env.NEXT_PUBLIC_MAP_API_KEY,
    NEXT_WEBSITE_URL: process.env.NEXT_WEBSITE_URL,
  },
  serverRuntimeConfig: {
    NEXT_PUBLIC_BASE_URL: process.env.NEXT_PUBLIC_BASE_URL,
    NEXT_PUBLIC_MAP_API_KEY: process.env.NEXT_PUBLIC_MAP_API_KEY,
    NEXT_WEBSITE_URL: process.env.NEXT_WEBSITE_URL,
  },
  images: {
    domains: [
      'placeimg.com',
      'www.google.com',
      'storage.googleapis.com',
      'ik.imagekit.io',
      'images.pexels.com',
    ],
  },
};

module.exports = nextConfig;
