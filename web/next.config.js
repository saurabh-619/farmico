/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  i18n: {
    locales: ["en", "mr", "hi"],
    defaultLocale: "en",
  },
  images: {
    domains: [
      "images.pexels.com",
      "images.unsplash.com",
      "firebasestorage.googleapis.com",
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
};

module.exports = nextConfig;
