/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for maximum performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: [
      'lucide-react',
      'date-fns',
      '@radix-ui/react-dialog',
      '@radix-ui/react-popover',
      '@radix-ui/react-tabs',
      '@radix-ui/react-tooltip',
      '@radix-ui/react-switch',
      '@radix-ui/react-calendar',
      '@radix-ui/react-alert-dialog',
      '@radix-ui/react-avatar',
      '@radix-ui/react-button',
      '@radix-ui/react-card',
      '@radix-ui/react-input',
      '@radix-ui/react-label',
      '@radix-ui/react-progress',
      '@radix-ui/react-textarea',
      '@radix-ui/react-toast'
    ],
    webpackBuildWorker: true,
    parallelServerBuildTraces: true,
    parallelServerCompiles: true,
    turbo: {
      rules: {
        '*.svg': {
          loaders: ['@svgr/webpack'],
          as: '*.js',
        },
      },
    },
    forceSwcTransforms: true,
    serverComponentsExternalPackages: ['sharp'],
    // Enable static optimization
    staticPageGenerationTimeout: 1000,
    largePageDataBytes: 128 * 1000, // 128KB
  },

  // Compiler optimizations for production
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? true : false,
  },

  // Advanced image optimization with WebP support
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 year
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.discordapp.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'motazdarawsha.vercel.app',
        port: '',
        pathname: '/**',
      },
    ],
    // Enable blur placeholder generation
    placeholder: 'blur',
    // Optimize for Core Web Vitals
    priority: true,
    // Enable responsive images
    responsive: true,
    // Quality optimization
    quality: 85,
  },

  // Compression and caching
  compress: true,
  poweredByHeader: false,
  generateEtags: true,
  
  // Enable static export for better performance
  trailingSlash: false,
  
  // Advanced headers for performance and security
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on'
          },
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=63072000; includeSubDomains; preload'
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block'
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY'
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff'
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin'
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=(), payment=()'
          },
          {
            key: 'Cross-Origin-Embedder-Policy',
            value: 'require-corp'
          },
          {
            key: 'Cross-Origin-Opener-Policy',
            value: 'same-origin'
          }
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=0, s-maxage=86400, stale-while-revalidate=86400'
          }
        ],
      },
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/(favicon|apple-touch-icon|android-chrome|mstile).*\\.(ico|png|svg)$',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      },
      {
        source: '/fonts/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable'
          }
        ],
      }
    ]
  },

  // Webpack optimizations for perfect performance
  webpack: (config, { dev, isServer, webpack }) => {
    // Production optimizations
    if (!dev) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              chunks: 'all',
              priority: 10,
            },
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              enforce: true,
              priority: 5,
            },
            lucide: {
              test: /[\\/]node_modules[\\/]lucide-react[\\/]/,
              name: 'lucide',
              chunks: 'all',
              priority: 15,
            },
            radix: {
              test: /[\\/]node_modules[\\/]@radix-ui[\\/]/,
              name: 'radix',
              chunks: 'all',
              priority: 12,
            },
          },
        },
        usedExports: true,
        sideEffects: false,
        moduleIds: 'deterministic',
        runtimeChunk: {
          name: 'runtime',
        },
      }

      // Tree shaking optimization
      config.optimization.providedExports = true
      config.optimization.usedExports = true
      config.optimization.sideEffects = false

      // Minification
      config.optimization.minimize = true
    }

    // Bundle analyzer for development
    if (!dev && !isServer) {
      config.plugins.push(
        new webpack.DefinePlugin({
          'process.env.ANALYZE': JSON.stringify(process.env.ANALYZE),
        })
      )
    }

    // Optimize bundle size
    config.resolve.alias = {
      ...config.resolve.alias,
      '@': require('path').resolve(__dirname),
    }

    // Add performance optimizations
    config.performance = {
      hints: 'warning',
      maxEntrypointSize: 250000,
      maxAssetSize: 250000,
    }

    // Optimize for production
    if (!dev) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        crypto: false,
      }
    }

    return config
  },

  // Output configuration for optimal deployment
  output: 'standalone',
  
  // Enable SWC minification
  swcMinify: true,

  // TypeScript and ESLint configuration
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Redirects for SEO
  async redirects() {
    return [
      {
        source: '/home',
        destination: '/',
        permanent: true,
      },
    ]
  },

  // Enable static generation for better performance
  async generateStaticParams() {
    return [
      { slug: [''] },
      { slug: ['na7la'] },
      { slug: ['copyright'] },
    ]
  },
}

export default nextConfig
