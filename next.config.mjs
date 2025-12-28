/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  // Static export configuration (best for 1GB RAM)
  output: 'export', // Export as static site
  trailingSlash: true, // Add trailing slashes to URLs
  images: {
    unoptimized: true, // Required for static export
  },
  // Performance optimizations
  compress: true, // Enable gzip compression
  poweredByHeader: false, // Remove X-Powered-By header for security
  swcMinify: true, // Use SWC for minification (faster than Terser)
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
