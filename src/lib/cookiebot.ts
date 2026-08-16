/* Cookiebot CMP (Usercentrics A/S, Copenhagen) — one domain group id drives
   the consent banner, the auto-blocking of non-necessary scripts and the cookie
   declaration table on /datenschutz.

   The id is not a secret: uc.js is served to the browser with it in the URL, so
   NEXT_PUBLIC_ is correct here and nothing is leaked by inlining it.

   Unset means "no Cookiebot". consent.cookiebot.com answers an unknown id with
   an error rather than a banner, and a half-loaded CMP is worse than none — so
   every Cookiebot component renders null and the site behaves exactly as it did
   before this integration. That is what keeps local dev, Amplify previews and
   any fork without a Cookiebot account working. */

export const COOKIEBOT_CBID = process.env.NEXT_PUBLIC_COOKIEBOT_CBID ?? '';

export const cookiebotEnabled = COOKIEBOT_CBID.length > 0;

/** The consent categories Cookiebot reports back, mirrored from `Cookiebot.consent`. */
export interface CookiebotConsent {
	necessary: boolean;
	preferences: boolean;
	statistics: boolean;
	marketing: boolean;
	method: string | null;
	stamp: string;
}

declare global {
	interface Window {
		/* Defined by uc.js once it has loaded. Everything that touches it must
		   cope with `undefined`: the visitor may be offline, an ad blocker may
		   have dropped the request, or NEXT_PUBLIC_COOKIEBOT_CBID may be unset. */
		Cookiebot?: {
			consent: CookiebotConsent;
			consented: boolean;
			declined: boolean;
			hasResponse: boolean;
			/** Reopens the banner so a visitor can change or withdraw consent. */
			renew: () => void;
			show: () => void;
			hide: () => void;
			withdraw: () => void;
		};
	}
}
