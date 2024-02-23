/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'dev-tattooarte.s3.sa-east-1.amazonaws.com',
      'stg-tattooarte.s3.sa-east-1.amazonaws.com',
      'prod-tattooarte.s3.sa-east-1.amazonaws.com',
      'replicate.delivery',
      'pbxt.replicate.delivery',
      'files.stripe.com',
      'lh3.googleusercontent.com',
    ],
  },
};

export default nextConfig;
