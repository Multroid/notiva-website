/**
 * Next.js Instrumentation
 * 
 * This file runs when the Next.js server starts.
 * Used for server-side initialization if needed.
 */

export async function register() {
  // Only run on server
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    console.log('');
    console.log('\x1b[44m\x1b[1m 🚀 MARKETING APP STARTING \x1b[0m');
    console.log('');
  }
}
