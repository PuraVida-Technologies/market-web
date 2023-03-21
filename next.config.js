/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
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
