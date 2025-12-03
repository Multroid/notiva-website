/**
 * Logo.dev integration utilities
 * Provides consistent access to company logos across the marketing site
 */

const LOGO_DEV_TOKEN = process.env.NEXT_PUBLIC_LOGO_DEV_TOKEN || 'pk_X-1ZO13CQEuSu1iwIdPA1Q';

export interface LogoDevOptions {
  /**
   * The domain of the company (e.g., 'google.com', 'apple.com')
   */
  domain: string;
  /**
   * Size of the logo in pixels (default: 80)
   */
  size?: number;
  /**
   * Format of the logo (default: 'png')
   */
  format?: 'png' | 'svg' | 'jpg' | 'webp';
  /**
   * Whether to use the greyscale version (default: false)
   */
  greyscale?: boolean;
}

/**
 * Get the logo URL from logo.dev for a given company domain
 * 
 * @example
 * ```tsx
 * import { getLogoUrl } from '@/lib/logo-dev'
 * 
 * <Image 
 *   src={getLogoUrl({ domain: 'google.com', size: 40 })}
 *   alt="Google Logo"
 *   width={40}
 *   height={40}
 * />
 * ```
 */
export function getLogoUrl({ 
  domain, 
  size = 80, 
  format = 'png',
  greyscale = false 
}: LogoDevOptions): string {
  const params = new URLSearchParams({
    token: LOGO_DEV_TOKEN,
    size: size.toString(),
    format,
    ...(greyscale && { greyscale: 'true' }),
  });

  return `https://img.logo.dev/${domain}?${params.toString()}`;
}

/**
 * Common company domains for quick access
 */
export const CompanyLogos = {
  GOOGLE: 'google.com',
  APPLE: 'apple.com',
  MICROSOFT: 'microsoft.com',
  DROPBOX: 'dropbox.com',
  SLACK: 'slack.com',
  ZAPIER: 'zapier.com',
  STRIPE: 'stripe.com',
} as const;

