import { z } from 'zod';

/* Matches MAIL_RE in modal-context.tsx so the client and the server agree on
   what "valid" means and the user never sees a field pass locally then fail. */
const email = z
	.string()
	.trim()
	.min(5)
	.max(254)
	.regex(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/, 'invalid_email')
	.transform((v) => v.toLowerCase());

const lang = z.enum(['de', 'en']).default('de');

/* Hidden field no human fills in. Bots that parse the DOM and complete every
   input trip it; a real submission always sends "". */
const honeypot = z
	.string()
	.max(0, 'honeypot')
	.optional()
	.default('');

export const waitlistInput = z.object({
	email,
	lang,
	source: z.string().trim().max(64).default('website'),
	/* An unchecked box must be rejected server-side too — this is the record
	   that the consent existed at all. */
	consent: z.literal(true),
	consentText: z.string().trim().max(500).optional(),
	hp: honeypot,
});

export const investorInput = z.object({
	name: z.string().trim().min(2, 'too_short').max(120),
	company: z.string().trim().min(2, 'too_short').max(160),
	email,
	message: z.string().trim().max(2000).optional(),
	lang,
	source: z.string().trim().max(64).default('for-investors'),
	hp: honeypot,
});

export type WaitlistInput = z.infer<typeof waitlistInput>;
export type InvestorInput = z.infer<typeof investorInput>;
