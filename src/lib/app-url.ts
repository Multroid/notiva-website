/**
 * Get the main app URL (running on port 3000)
 */
export function getMainAppUrl(): string {
  if (typeof window !== 'undefined') {
    // Client-side: use current hostname with port 3000
    return `${window.location.protocol}//${window.location.hostname}:3000`
  }
  // Server-side: use environment variable or default
  return process.env.NEXT_PUBLIC_MAIN_APP_URL || "http://localhost:3000"
}

/**
 * Get the main app login URL
 */
export function getMainAppLoginUrl(): string {
  return `${getMainAppUrl()}/login`
}

/**
 * Get the main app register URL
 */
export function getMainAppRegisterUrl(): string {
  return `${getMainAppUrl()}/register`
}

