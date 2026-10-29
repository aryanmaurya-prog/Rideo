/** @type {import('next').NextConfig} */
const nextConfig = {
  transpilePackages: ['@rideo/types', '@rideo/ui'],
  output: 'standalone',
};

export default nextConfig;
