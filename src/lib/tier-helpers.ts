/**
 * Minimal tier helpers for marketing app
 * Simplified version without complex tier logic
 */

export async function getUserTier(userId: string) {
	// Minimal implementation - returns default tier
	return {
		slug: 'free',
		name: 'Free',
		version: 1,
	};
}

