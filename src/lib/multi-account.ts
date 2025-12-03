/**
 * Minimal multi-account helpers for marketing app
 * Simplified version for basic account switching
 */

export type StoredAccount = {
	id: string;
	email: string;
	name?: string;
	avatarUrl?: string;
};

export function storeAccount(account: StoredAccount): void {
	if (typeof window === 'undefined') return;
	try {
		const accounts = getStoredAccounts();
		if (!accounts.find(a => a.id === account.id)) {
			accounts.push(account);
			localStorage.setItem('storedAccounts', JSON.stringify(accounts));
		}
	} catch (error) {
		console.error('Error storing account:', error);
	}
}

export function getStoredAccounts(): StoredAccount[] {
	if (typeof window === 'undefined') return [];
	try {
		const stored = localStorage.getItem('storedAccounts');
		return stored ? JSON.parse(stored) : [];
	} catch (error) {
		console.error('Error getting stored accounts:', error);
		return [];
	}
}

export function removeAccount(accountId: string): void {
	if (typeof window === 'undefined') return;
	try {
		const accounts = getStoredAccounts().filter(a => a.id !== accountId);
		localStorage.setItem('storedAccounts', JSON.stringify(accounts));
	} catch (error) {
		console.error('Error removing account:', error);
	}
}

export function getCurrentSessionToken(): string | null {
	if (typeof window === 'undefined') return null;
	try {
		return localStorage.getItem('sessionToken');
	} catch (error) {
		console.error('Error getting session token:', error);
		return null;
	}
}

export function setSessionToken(token: string): void {
	if (typeof window === 'undefined') return;
	try {
		localStorage.setItem('sessionToken', token);
	} catch (error) {
		console.error('Error setting session token:', error);
	}
}

