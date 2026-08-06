/** Bilingual templates for the two lead flows. Language follows whatever the
 *  visitor had the site set to, matching lang-context on the front end.
 *
 *  Email HTML is not web HTML. The constraints driving every odd choice below:
 *    - Layout is tables. Outlook (Windows) uses Word's rendering engine, which
 *      has no useful flexbox or grid.
 *    - Styles are inline. Gmail strips <style> from the served message, so only
 *      the media queries degrade gracefully, never the base layout.
 *    - Images are PNG with absolute URLs. Gmail drops SVG and Outlook cannot
 *      decode WebP, which is why scripts/build-email-assets.mjs exists.
 *    - Every image carries width/height and alt: many clients block images by
 *      default, and the layout must not collapse when they do.
 */
import 'server-only';

import { EMAIL_ASSETS, type EmailAsset } from './email-assets';

type Lang = 'de' | 'en';

export const FOUNDER_EMAIL = process.env.FOUNDER_EMAIL || 'team@notiva.de';

/* Brand tokens, mirrored from src/styles/notiva/tokens.css. Restated as literals
   because a mail client has no access to CSS variables. */
const BLUE = '#0047BA';
const PAPER = '#F0EEE9';
const INK = '#101113';
const SLATE = '#3F4145';
const MUTED = '#898C8E';
const HAIRLINE = '#E4E7EC';

/* Helvetica/Arial rather than Montserrat: webfonts need a <link> Gmail strips,
   and loading one from Google would reintroduce exactly the tracking vector we
   removed from the site itself. */
const FONT = "-apple-system,BlinkMacSystemFont,'Segoe UI',Helvetica,Arial,sans-serif";

/** Public origin for links. */
function siteUrl(): string {
	return (process.env.NEXT_PUBLIC_MARKETING_URL || 'https://notiva.de').replace(/\/$/, '');
}

/* Images must resolve from the recipient's mail client, so they always point at
   the public site — never at a dev origin, which would be unreachable. In local
   testing that means the images 404 until the site is deployed; the layout is
   built to survive it. */
function asset(file: EmailAsset): string {
	return `${siteUrl()}/email/${file}`;
}

/** <img> with the exact generated dimensions, so the layout survives a client
 *  that blocks images and trimmed artwork keeps its aspect ratio. */
function image(file: EmailAsset, alt: string, extraStyle = ''): string {
	const { w, h } = EMAIL_ASSETS[file];
	return `<img src="${asset(file)}" alt="${alt}" width="${w}" height="${h}" style="display:block;border:0;outline:none;text-decoration:none;${extraStyle}" />`;
}

function escapeHtml(value: string): string {
	return value
		.replace(/&/g, '&amp;')
		.replace(/</g, '&lt;')
		.replace(/>/g, '&gt;')
		.replace(/"/g, '&quot;');
}

// ---------------------------------------------------------------------------
// Building blocks
// ---------------------------------------------------------------------------

function heading(text: string): string {
	return `<h1 style="margin:0;padding:0;font-family:${FONT};font-size:27px;line-height:34px;font-weight:700;letter-spacing:-0.02em;color:${INK};">${text}</h1>`;
}

function paragraph(text: string, opts: { small?: boolean } = {}): string {
	const size = opts.small ? '13px' : '16px';
	const height = opts.small ? '20px' : '25px';
	const colour = opts.small ? MUTED : SLATE;
	return `<p style="margin:14px 0 0;padding:0;font-family:${FONT};font-size:${size};line-height:${height};font-weight:400;color:${colour};">${text}</p>`;
}

/* Bulletproof-ish button: the background and padding sit on the <td>, so Outlook
   fills the whole shape instead of only the text box. mso-padding-alt keeps Word's
   engine from collapsing the padding. Corners stay square in Outlook, which is an
   acceptable and well-understood degradation. */
function button(href: string, label: string): string {
	return `<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin:26px 0 0;border-collapse:separate;">
<tr><td align="center" bgcolor="${BLUE}" style="border-radius:10px;mso-padding-alt:16px 30px;">
<a href="${href}" target="_blank" style="display:inline-block;padding:16px 30px;font-family:${FONT};font-size:16px;line-height:20px;font-weight:600;color:${PAPER};text-decoration:none;border-radius:10px;">${label}</a>
</td></tr></table>`;
}

function mascot(file: EmailAsset, alt: string): string {
	return image(file, alt, 'margin:0 0 20px;');
}

/**
 * Page chrome shared by every message.
 *
 * `preheader` is the snippet the inbox list shows next to the subject. Without
 * one, clients scrape the first visible text — which would be the alt text of
 * the logo. It is hidden in the body but still read from the source.
 */
function shell({
	preheader,
	hero,
	body,
	footNote,
	lang,
	unsubscribeUrl,
}: {
	preheader: string;
	hero?: string;
	body: string;
	footNote: string;
	lang: Lang;
	/* Present only on marketing mail. The double-opt-in confirmation and the
	   investor acknowledgement are transactional — there is nothing to leave
	   yet in the first case, and the second is correspondence the recipient
	   started — so neither carries one. */
	unsubscribeUrl?: string;
}): string {
	const de = lang === 'de';
	const site = siteUrl();

	return `<!doctype html>
<html lang="${lang}" xmlns:v="urn:schemas-microsoft-com:vml" xmlns:o="urn:schemas-microsoft-com:office:office">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="x-apple-disable-message-reformatting">
<meta name="color-scheme" content="light">
<meta name="supported-color-schemes" content="light">
<title>Notiva</title>
<!--[if mso]><xml><o:OfficeDocumentSettings><o:PixelsPerInch>96</o:PixelsPerInch></o:OfficeDocumentSettings></xml><![endif]-->
<style>
  /* Stripped by Gmail; only progressive enhancement lives here. */
  @media only screen and (max-width:620px) {
    .nv-card { padding:30px 24px !important; }
    .nv-h1 { font-size:24px !important; line-height:31px !important; }
  }
  a[x-apple-data-detectors] { color:inherit !important; text-decoration:none !important; }
</style>
</head>
<body style="margin:0;padding:0;width:100%;background-color:${PAPER};-webkit-font-smoothing:antialiased;">

<div style="display:none;font-size:1px;line-height:1px;max-height:0;max-width:0;opacity:0;overflow:hidden;mso-hide:all;">${preheader}</div>

<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:${PAPER};">
<tr><td align="center" style="padding:36px 12px;">

<!-- Outlook cannot do max-width, so it gets a fixed 600px shell via a
     conditional comment. Every other client uses the fluid table below, which
     shrinks on a phone instead of overflowing the viewport. -->
<!--[if mso]><table role="presentation" border="0" cellpadding="0" cellspacing="0" width="600"><tr><td><![endif]-->
<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;">

  <!-- brand row -->
  <tr><td style="padding:0 4px 18px;">
    <table role="presentation" border="0" cellpadding="0" cellspacing="0">
    <tr>
      <td width="34" style="vertical-align:middle;">
        ${image('notiva-logo.png', 'Notiva', 'border-radius:8px;')}
      </td>
      <td style="padding-left:10px;vertical-align:middle;font-family:${FONT};font-size:16px;font-weight:700;letter-spacing:0.14em;color:${BLUE};">NOTIVA</td>
    </tr>
    </table>
  </td></tr>

  <!-- card -->
  <tr><td class="nv-card" bgcolor="#FFFFFF" style="background-color:#FFFFFF;border-radius:18px;padding:38px 36px;">
    ${hero ?? ''}
    ${body}
  </td></tr>

  <!-- footer -->
  <tr><td style="padding:22px 8px 0;">
    <p style="margin:0;font-family:${FONT};font-size:12px;line-height:19px;color:${MUTED};">${footNote}</p>
    <p style="margin:10px 0 0;font-family:${FONT};font-size:12px;line-height:19px;color:${MUTED};">
      <a href="${site}" style="color:${MUTED};text-decoration:underline;">notiva.de</a>
      &nbsp;·&nbsp;
      <a href="${site}/datenschutz" style="color:${MUTED};text-decoration:underline;">${de ? 'Datenschutz' : 'Privacy'}</a>
      &nbsp;·&nbsp;
      <a href="${site}/support" style="color:${MUTED};text-decoration:underline;">${de ? 'Unterstützen' : 'Support us'}</a>
    </p>
    <p style="margin:10px 0 0;font-family:${FONT};font-size:12px;line-height:19px;color:${MUTED};">
      ${de ? 'Notiva · Deutschland' : 'Notiva · Germany'}
    </p>
    ${
			unsubscribeUrl
				? `<p style="margin:14px 0 0;font-family:${FONT};font-size:12px;line-height:19px;color:${MUTED};">
      <a href="${unsubscribeUrl}" style="color:${MUTED};text-decoration:underline;">${
				de ? 'Von der Warteliste abmelden' : 'Unsubscribe from the waitlist'
			}</a>
    </p>`
				: ''
		}
  </td></tr>

</table>
<!--[if mso]></td></tr></table><![endif]-->

</td></tr>
</table>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Waitlist: double opt-in confirmation
// ---------------------------------------------------------------------------
export function waitlistConfirmEmail(lang: Lang, confirmUrl: string) {
	const de = lang === 'de';

	const subject = de
		? 'Bitte bestätige deine E-Mail-Adresse'
		: 'Please confirm your email address';

	const preheader = de
		? 'Ein Klick, dann stehst du auf der Notiva Warteliste.'
		: 'One click and you are on the Notiva waitlist.';

	const body =
		heading(de ? 'Noch ein Klick.' : 'One more click.') +
		paragraph(
			de
				? 'Du hast dich für die Notiva Warteliste eingetragen. Bestätige deine Adresse, damit wir dir schreiben dürfen.'
				: 'You signed up for the Notiva waitlist. Confirm your address so we are allowed to write to you.'
		) +
		button(confirmUrl, de ? 'E-Mail bestätigen' : 'Confirm email') +
		paragraph(
			de
				? 'Der Link ist 14 Tage gültig. Wenn du das nicht warst, ignoriere diese E-Mail einfach — ohne Bestätigung schreiben wir dir nicht.'
				: 'The link is valid for 14 days. If this was not you, just ignore this email — without confirmation we will not write to you.',
			{ small: true }
		) +
		/* Some clients mangle long hrefs; the plain URL is a manual fallback. */
		paragraph(
			(de
				? 'Falls der Button nicht funktioniert: '
				: 'If the button does not work: ') +
				`<a href="${confirmUrl}" style="color:${BLUE};text-decoration:underline;word-break:break-all;">${confirmUrl}</a>`,
			{ small: true }
		);

	const text = de
		? `Noch ein Klick.\n\nDu hast dich für die Notiva Warteliste eingetragen. Bestätige deine Adresse:\n\n${confirmUrl}\n\nDer Link ist 14 Tage gültig. Wenn du das nicht warst, ignoriere diese E-Mail — ohne Bestätigung schreiben wir dir nicht.\n\nNotiva · Deutschland · ${siteUrl()}`
		: `One more click.\n\nYou signed up for the Notiva waitlist. Confirm your address:\n\n${confirmUrl}\n\nThe link is valid for 14 days. If this was not you, ignore this email — without confirmation we will not write to you.\n\nNotiva · Germany · ${siteUrl()}`;

	return {
		subject,
		html: shell({
			preheader,
			body,
			lang,
			footNote: de
				? 'Du erhältst diese E-Mail, weil sie auf notiva.de für die Warteliste eingetragen wurde. Ohne Bestätigung folgt keine weitere Nachricht.'
				: 'You are receiving this because this address was entered for the waitlist on notiva.de. Without confirmation no further message follows.',
		}),
		text,
	};
}

// ---------------------------------------------------------------------------
// Waitlist: welcome, after confirming
// ---------------------------------------------------------------------------
export function waitlistWelcomeEmail(lang: Lang, unsubscribeUrl: string) {
	const de = lang === 'de';

	const subject = de ? 'Du bist auf der Notiva Warteliste' : 'You are on the Notiva waitlist';

	const preheader = de
		? 'Bestätigt. Wir melden uns, sobald dein früher Zugang bereit ist.'
		: 'Confirmed. We will write when your early access is ready.';

	const body =
		heading(de ? 'Bestätigt. Du bist dabei.' : 'Confirmed. You are in.') +
		paragraph(
			de
				? 'Wir melden uns, sobald dein früher Zugang bereit ist. Bis dahin schreiben wir nur, wenn es wirklich etwas zu sagen gibt — kein wöchentlicher Newsletter.'
				: 'We will write when your early access is ready. Until then we only write when there is genuinely something to say — no weekly newsletter.'
		) +
		paragraph(
			de
				? `Wenn du früher mitbauen willst: <a href="${siteUrl()}/support" style="color:${BLUE};font-weight:600;text-decoration:underline;">Merch und Spenden</a> werden direkt Entwicklungszeit, und Pilotnutzer bekommen zuerst Zugang.`
				: `If you want to help sooner: <a href="${siteUrl()}/support" style="color:${BLUE};font-weight:600;text-decoration:underline;">merch and donations</a> turn straight into development time, and pilot users get access first.`
		) +
		button(`${siteUrl()}/support`, de ? 'Mitbauen' : 'Help build it');

	const text = de
		? `Bestätigt. Du bist dabei.\n\nWir melden uns, sobald dein früher Zugang bereit ist. Bis dahin schreiben wir nur, wenn es wirklich etwas zu sagen gibt.\n\nMitbauen: ${siteUrl()}/support\n\nAbmelden: ${unsubscribeUrl}\n\nNotiva · Deutschland`
		: `Confirmed. You are in.\n\nWe will write when your early access is ready. Until then we only write when there is genuinely something to say.\n\nHelp build it: ${siteUrl()}/support\n\nUnsubscribe: ${unsubscribeUrl}\n\nNotiva · Germany`;

	return {
		subject,
		html: shell({
			preheader,
			hero: mascot('novi-wave.png', de ? 'Novi winkt' : 'Novi waving'),
			body,
			lang,
			unsubscribeUrl,
			footNote: de
				? 'Du erhältst diese E-Mail, weil du deine Adresse für die Notiva Warteliste bestätigt hast. Du kannst dich jederzeit abmelden.'
				: 'You are receiving this because you confirmed your address for the Notiva waitlist. You can unsubscribe at any time.',
		}),
		text,
		headers: listUnsubscribeHeaders(unsubscribeUrl),
	};
}

/**
 * RFC 8058 one-click unsubscribe.
 *
 * List-Unsubscribe-Post is what upgrades the header from "a URL we might show"
 * to the native Unsubscribe control Gmail and Yahoo render beside the sender —
 * and which both have required from bulk senders since February 2024. The
 * provider POSTs to the https URL, so it must work without any confirmation
 * step, which is why POST /api/waitlist/unsubscribe acts immediately while the
 * GET only asks.
 *
 * The mailto: is the fallback for clients that do not implement one-click.
 */
export function listUnsubscribeHeaders(unsubscribeUrl: string): Record<string, string> {
	return {
		'List-Unsubscribe': `<${unsubscribeUrl}>, <mailto:${FOUNDER_EMAIL}?subject=unsubscribe>`,
		'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
	};
}

// ---------------------------------------------------------------------------
// Investor: acknowledgement to the requester
// ---------------------------------------------------------------------------
/* Deliberately not the deck itself. The deck goes out by hand after review, so
   this only sets the two-working-day expectation the /for-investors copy makes. */
export function investorAckEmail(lang: Lang, name: string) {
	const de = lang === 'de';
	const first = escapeHtml(name.split(' ')[0] || name);

	const subject = de ? 'Deine Deck-Anfrage ist angekommen' : 'Your deck request has arrived';

	const preheader = de
		? 'Deck und Kurzprofil kommen innerhalb von zwei Werktagen.'
		: 'The deck and a short profile follow within two working days.';

	const body =
		heading(de ? 'Anfrage ist da.' : 'Request received.') +
		paragraph(
			de
				? `Hallo ${first}, danke für dein Interesse an Notiva. Ich schicke dir Deck und Kurzprofil innerhalb von zwei Werktagen persönlich, zusammen mit einem Terminvorschlag.`
				: `Hello ${first}, thank you for your interest in Notiva. I will send you the deck and a short profile personally within two working days, along with a proposed time.`
		) +
		paragraph(
			de
				? 'Wenn es dringend ist oder du vorab Fragen hast, antworte einfach auf diese E-Mail — sie landet direkt bei mir.'
				: 'If it is urgent or you have questions first, just reply to this email — it comes straight to me.'
		) +
		`<table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin:26px 0 0;">
<tr><td style="border-top:1px solid ${HAIRLINE};padding-top:18px;font-family:${FONT};font-size:14px;line-height:21px;color:${INK};">
<b style="color:${INK};">Hikmat Imanov</b><br>
<span style="color:${MUTED};">${de ? 'Gründer · Notiva' : 'Founder · Notiva'}</span>
</td></tr></table>`;

	const text = de
		? `Anfrage ist da.\n\nHallo ${name.split(' ')[0] || name}, danke für dein Interesse an Notiva. Ich schicke dir Deck und Kurzprofil innerhalb von zwei Werktagen persönlich, zusammen mit einem Terminvorschlag.\n\nAntworte einfach auf diese E-Mail, wenn du vorab Fragen hast.\n\nHikmat Imanov · Gründer, Notiva`
		: `Request received.\n\nHello ${name.split(' ')[0] || name}, thank you for your interest in Notiva. I will send you the deck and a short profile personally within two working days, along with a proposed time.\n\nJust reply to this email if you have questions first.\n\nHikmat Imanov · Founder, Notiva`;

	return {
		subject,
		html: shell({
			preheader,
			hero: mascot('novi-hold-doc.png', de ? 'Novi hält das Deck' : 'Novi holding the deck'),
			body,
			lang,
			footNote: de
				? 'Diese E-Mail ist keine Anlageberatung und kein Angebot von Wertpapieren.'
				: 'This email is not investment advice and not an offer of securities.',
		}),
		text,
	};
}

// ---------------------------------------------------------------------------
// Internal: notify the founder
// ---------------------------------------------------------------------------
/* Internal mail, so it optimises for scanning in the inbox rather than for
   polish: the subject carries the identity and the body is a plain field list. */
export function investorNotifyEmail(lead: {
	name: string;
	company: string;
	email: string;
	message?: string;
	lang: Lang;
	source: string;
}) {
	const rows: [string, string][] = [
		['Name', lead.name],
		['Company', lead.company],
		['Email', lead.email],
		['Language', lead.lang],
		['Source', lead.source],
	];
	if (lead.message) rows.push(['Message', lead.message]);

	const table = rows
		.map(
			([k, v]) =>
				`<tr><td style="padding:7px 18px 7px 0;font-family:${FONT};font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${MUTED};white-space:nowrap;vertical-align:top;">${k}</td><td style="padding:7px 0;font-family:${FONT};font-size:15px;line-height:22px;color:${INK};">${escapeHtml(v)}</td></tr>`
		)
		.join('');

	return {
		subject: `Deck request — ${lead.name}, ${lead.company}`,
		html: shell({
			preheader: `${lead.name} · ${lead.company}`,
			body:
				heading('Deck request') +
				`<table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin:20px 0 0;">${table}</table>` +
				button(
					`mailto:${lead.email}?subject=${encodeURIComponent('Notiva · Deck')}`,
					'Reply with the deck'
				),
			lang: 'en',
			footNote: 'Sent by POST /api/investor-deck on notiva.de.',
		}),
		text: rows.map(([k, v]) => `${k}: ${v}`).join('\n'),
	};
}

export function waitlistNotifyEmail(signup: { email: string; lang: Lang; source: string }) {
	return {
		subject: `Waitlist confirmed — ${signup.email}`,
		html: shell({
			preheader: signup.email,
			body:
				heading('Waitlist signup confirmed') +
				`<p style="margin:18px 0 0;font-family:${FONT};font-size:16px;line-height:24px;color:${INK};">${escapeHtml(signup.email)}</p>` +
				`<p style="margin:4px 0 0;font-family:${FONT};font-size:13px;line-height:20px;color:${MUTED};">${langLabel(signup.lang)} · ${escapeHtml(signup.source)}</p>`,
			lang: 'en',
			footNote: 'Sent by GET /api/waitlist/confirm on notiva.de.',
		}),
		text: `${signup.email}\n${signup.lang} · ${signup.source}`,
	};
}

function langLabel(lang: Lang): string {
	return lang === 'de' ? 'German' : 'English';
}
