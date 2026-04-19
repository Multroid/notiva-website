/**
 * Get the consumer app URL
 * 
 * Local: http://localhost:3000
 * Production: https://app.notiva.de (transforms notiva.de → app.notiva.de)
 */
export function getConsumerAppUrl(): string {
  // Use environment variable if set
  const envUrl = process.env.NEXT_PUBLIC_CONSUMER_APP_URL
  if (envUrl) {
    return envUrl
  }

  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname
    const protocol = window.location.protocol

    // Production: transform notiva.de or www.notiva.de → app.notiva.de
    if (hostname === 'notiva.de' || hostname === 'www.notiva.de') {
      return `${protocol}//app.notiva.de`
    }

    // Local development: use same hostname with port 3000
    // e.g., localhost:3001 → localhost:3000
    return `${protocol}//${hostname}:3000`
  }

  // Server-side fallback
  return "http://localhost:3000"
}

/**
 * Get the consumer app login URL
 */
export function getMainAppLoginUrl(): string {
  return `${getConsumerAppUrl()}/login`
}

/**
 * Get the consumer app register URL
 */
export function getMainAppRegisterUrl(): string {
  return `${getConsumerAppUrl()}/register`
}

/**
 * Get the consumer app dashboard URL
 */
export function getMainAppDashboardUrl(): string {
  return `${getConsumerAppUrl()}/home`
}

/**
 * Get the Notiva API base URL (e.g. https://api.notiva.de)
 */
export function getApiAppUrl(): string {
  const envUrl = process.env.NEXT_PUBLIC_API_APP_URL
  if (envUrl) return envUrl.replace(/\/$/, "")

  if (typeof window !== "undefined") {
    const hostname = window.location.hostname
    const protocol = window.location.protocol

    if (hostname === "notiva.de" || hostname === "www.notiva.de") {
      return `${protocol}//api.notiva.de`
    }

    return `${protocol}//${hostname}:4000`
  }

  return "http://localhost:4000"
}

