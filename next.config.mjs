/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Reduce memory usage during build
  productionBrowserSourceMaps: false,
  // Reduce memory footprint - exclude heavy dependencies from tracing
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
