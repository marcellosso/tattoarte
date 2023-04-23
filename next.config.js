/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'dev-tattooarte.s3.sa-east-1.amazonaws.com',
      'stg-tattooarte.s3.sa-east-1.amazonaws.com',
      'prod-tattooarte.s3.sa-east-1.amazonaws.com',
    ],
  },
};

module.exports = nextConfig;
