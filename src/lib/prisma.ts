/**
 * Prisma Client - Next.js Server Components Only
 * 
 * This re-exports the Prisma client with the 'server-only' guard to prevent
 * accidental imports in client components.
 * 
 * For scripts and workers running outside Next.js, use '@/lib/prisma-client' instead.
 */
import 'server-only';

export { prisma, prisma as default } from './prisma-client';

