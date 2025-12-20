/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Reduce memory usage during build
  productionBrowserSourceMaps: false,
  // Optimize output file tracing
  outputFileTracingIncludes: {
    '/**': ['./data/**/*', './lib/**/*'],
  },
  // Reduce memory footprint
  experimental: {
    outputFileTracingExcludes: {
      '*': [
        'node_modules/@swc/core*/**/*',
        'node_modules/webpack/**/*',
        'node_modules/next/dist/compiled/webpack/**/*',
      ],
    },
  },
};

export default nextConfig;
