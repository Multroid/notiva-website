import type { NextConfig } from "next";
import path from "path";

// Consumer app URL for auth redirects
// Local: http://localhost:3000, Production: https://app.notiva.de
const CONSUMER_APP_URL = process.env.NEXT_PUBLIC_CONSUMER_APP_URL || "http://localhost:3000";

// Pre-launch: the site serves only the Coming Soon landing page and the
// investor / support / merch pages. Every other marketing route has been moved
// to archive/ (see archive/README.md) and is redirected to the landing page.
// Deliberately NOT permanent — these URLs come back at relaunch, and a cached
// 301 would be very hard to undo.
const ARCHIVED_MARKETING_PATHS = [
  "/about",
  "/blog",
  "/brand",
  "/business",
  "/changelog",
  "/compare",
  "/contact",
  "/faq",
  "/features",
  "/help",
  "/milestones",
  "/pricing",
  "/security",
  "/use-cases",
];

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

  // Server-side environment variables for AWS Amplify Lambda runtime
  // These are bundled at build time and available at runtime
  env: {
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    NEXTAUTH_SECRET: process.env.NEXTAUTH_SECRET,
    NEXTAUTH_URL: process.env.NEXTAUTH_URL,
    COOKIE_DOMAIN: process.env.COOKIE_DOMAIN,
    RESEND_API_KEY: process.env.RESEND_API_KEY,
    EMAIL_FROM: process.env.EMAIL_FROM,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
    STRIPE_WEBHOOK_SECRET: process.env.STRIPE_WEBHOOK_SECRET,
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

  // Redirects for auth pages to consumer app
  async redirects() {
    return [
      // Auth redirects - send users to the consumer app for authentication
      {
        source: "/login",
        destination: `${CONSUMER_APP_URL}/login`,
        permanent: false,
      },
      {
        source: "/register",
        destination: `${CONSUMER_APP_URL}/register`,
        permanent: false,
      },
      {
        source: "/forgot-password",
        destination: `${CONSUMER_APP_URL}/forgot-password`,
        permanent: false,
      },
      {
        source: "/reset-password",
        destination: `${CONSUMER_APP_URL}/reset-password`,
        permanent: false,
      },
      {
        source: "/onboarding",
        destination: `${CONSUMER_APP_URL}/onboarding`,
        permanent: false,
      },
      // Dashboard/app redirects
      {
        source: "/home",
        destination: `${CONSUMER_APP_URL}/home`,
        permanent: false,
      },
      {
        source: "/dashboard",
        destination: `${CONSUMER_APP_URL}/home`,
        permanent: false,
      },
      // Settings redirect
      {
        source: "/settings/:path*",
        destination: `${CONSUMER_APP_URL}/settings/:path*`,
        permanent: false,
      },
      // The verify-email page moved to the consumer app along with the rest of auth
      {
        source: "/verify-email",
        destination: `${CONSUMER_APP_URL}/verify-email`,
        permanent: false,
      },
      // The landing page lives at "/" now; keep the old path working
      {
        source: "/coming-soon",
        destination: "/",
        permanent: false,
      },
      // Archived marketing pages -> landing page (self and any sub-path)
      ...ARCHIVED_MARKETING_PATHS.flatMap((path) => [
        { source: path, destination: "/", permanent: false },
        { source: `${path}/:path*`, destination: "/", permanent: false },
      ]),
    ];
  },

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
