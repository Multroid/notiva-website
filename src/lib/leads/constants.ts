/** Shared between POST /api/waitlist (which issues the token) and
 *  GET /api/waitlist/confirm (which honours the expiry). */
export const CONFIRM_TOKEN_TTL_DAYS = 14;

/** Query flag the confirm route redirects back with, read by modal-context to
 *  show the confirmed state without needing a dedicated page. */
export const CONFIRM_RESULT_PARAM = 'nv';
export type ConfirmResult = 'confirmed' | 'already' | 'expired' | 'invalid';
