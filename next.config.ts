import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  // AWS Amplify Next.js SSR - do not use standalone output
  // Standalone output is incompatible with Amplify's Next.js hosting

  // TypeScript and ESLint Configuration
  // Disable during builds - linting should be done separately in CI/CD
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Optimize images for AWS Amplify
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.logo.dev',
        port: '',
        pathname: '/**',
      },
    ],
  },

  // Ensure proper trailing slash handling
  trailingSlash: false,

  // Configure external packages for server runtime on AWS
  serverExternalPackages: ["@prisma/client"],

  // Ensure file tracing is rooted at this package (monorepo warning fix)
  outputFileTracingRoot: path.join(__dirname),

  // Rewrites for subdomain routing (admin.yourdomain.com)
  async rewrites() {
    return {
      beforeFiles: [
        // Admin subdomain rewrites
        {
          source: "/:path*",
          has: [
            {
              type: "host",
              value: "admin.(?<domain>.*)",
            },
          ],
          destination: "/admin/:path*",
        },
      ],
    };
  },
};

export default nextConfig;
