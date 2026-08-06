/** Shared between POST /api/waitlist (which issues the token) and
 *  GET /api/waitlist/confirm (which honours the expiry). */
export const CONFIRM_TOKEN_TTL_DAYS = 14;

/** Query flag the confirm and unsubscribe routes redirect back with, read by
 *  modal-context to show the outcome without needing a dedicated page. */
export const CONFIRM_RESULT_PARAM = 'nv';

/** Carries the unsubscribe token to the landing page so the confirm button has
 *  something to POST. Only ever an unsubscribe token — never the confirm one,
 *  which would be a far more sensitive thing to put in browser history. */
export const UNSUB_TOKEN_PARAM = 'ut';

export type ConfirmResult =
	| 'confirmed'
	| 'already'
	| 'expired'
	| 'invalid'
	/* Asking "really unsubscribe?" — a GET must not mutate, and mail scanners
	   and Outlook Safe Links prefetch every URL they see. */
	| 'unsub-ask'
	| 'unsubscribed'
	| 'unsub-invalid';
