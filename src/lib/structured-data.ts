/* Typed schema.org builders for Notiva.
 *
 * Every builder returns a plain object; render it with
 * `<JsonLd data={…} />` from `@/components/notiva/json-ld`.
 *
 * Ground rules baked into this file — do not relax them:
 *  – Notiva is PRE-LAUNCH (planned 2026). Merch offers are therefore
 *    `PreOrder`, never `InStock`, and nothing is charged before launch.
 *  – No `aggregateRating`, no `review`, no review counts: none exist.
 *  – No `price`/`offers` on the software itself: subscription pricing is not
 *    public. An invented price is spam and can earn a manual action.
 *  – No `sameAs`: no social profile has been verified, so the property is
 *    omitted rather than guessed.
 *  – Copy obeys the product guardrails: Notiva works WITH a Steuerberater
 *    (DATEV handoff) and never replaces one; it is not a robo-advisor, not a
 *    budgeting app; Novi never generates numbers and gives no individual tax
 *    advice (StBerG).
 *
 * Language: the site serves German server-side (English is a client-side
 * toggle at the same URL), so all human-readable strings here are German.
 */

import { PRODUCT_COPY, MERCH_ORDER } from '@/app/(notiva)/merch/[slug]/product-copy';
import type { MerchId } from '@/components/notiva/basket-context';
import type { JsonLdDocument } from '@/components/notiva/json-ld';

export type { JsonLdDocument };
export type { MerchId };

/* ── origin ──────────────────────────────────────────────────────── */

/** Canonical origin, no trailing slash. Never hardcode `https://notiva.de` elsewhere. */
export const SITE_URL: string = (
	process.env.NEXT_PUBLIC_MARKETING_URL || 'https://notiva.de'
).replace(/\/+$/, '');

/** `/support` → `https://notiva.de/support`. Absolute input is passed through. */
export function absoluteUrl(path: string): string {
	if (/^https?:\/\//i.test(path)) return path;
	return `${SITE_URL}${path.startsWith('/') ? '' : '/'}${path}`;
}

/* Stable `@id`s so nodes on the same page (or across pages) reference one
   another instead of repeating themselves. */
export const ORGANIZATION_ID = `${SITE_URL}/#organization`;
export const WEBSITE_ID = `${SITE_URL}/#website`;
export const SOFTWARE_APPLICATION_ID = `${SITE_URL}/#software`;
export const merchProductId = (slug: MerchId): string =>
	`${SITE_URL}/merch/${slug}#product`;

const SCHEMA_CONTEXT = 'https://schema.org';

/* ── facts (single source of truth for the strings below) ────────── */

const ORG_NAME = 'Notiva';
const ORG_EMAIL = 'team@notiva.de';
const LOGO_PATH = '/notiva/notiva-logo-chip.svg';
const LAUNCH_YEAR = '2026';
const CURRENCY = 'EUR';

/** Prices in EUR, incl. VAT.
 *
 *  These mirror `MERCH[slug].price` in `src/components/notiva/basket-context.tsx`.
 *  That module is `'use client'`, so a Server Component cannot dot into its
 *  runtime exports (React turns them into client references) — the numbers are
 *  restated here instead of imported. The `Record<MerchId, number>` annotation
 *  makes a *missing or extra product* a compile error; the values themselves
 *  must be kept in sync by hand if the shop ever reprices. */
export const MERCH_PRICE_EUR: Record<MerchId, number> = {
	shirt: 29,
	hoodie: 59,
	cap: 24,
	tote: 19,
	pin: 9,
	stickers: 6,
	sleeve: 34,
	plush: 39,
};

/* ── shared types ────────────────────────────────────────────────── */

type SchemaNode = { '@type': string; [key: string]: unknown };

type OrganizationRef = {
	'@type': 'Organization';
	'@id': string;
	name: string;
	url: string;
};

function organizationRef(): OrganizationRef {
	return { '@type': 'Organization', '@id': ORGANIZATION_ID, name: ORG_NAME, url: SITE_URL };
}

/** Drops keys whose value is `undefined` / `null` / `[]` — "omit, never invent". */
function compact<T extends Record<string, unknown>>(node: T): T {
	const out: Record<string, unknown> = {};
	for (const [key, value] of Object.entries(node)) {
		if (value === undefined || value === null) continue;
		if (Array.isArray(value) && value.length === 0) continue;
		out[key] = value;
	}
	return out as T;
}

/** `29` → `"29.00"` — schema.org wants a bare decimal, no currency symbol. */
function money(amount: number): string {
	return amount.toFixed(2);
}

/* ── Organization ────────────────────────────────────────────────── */

export type OrganizationSchema = {
	'@context': string;
	'@type': 'Organization';
	'@id': string;
	name: string;
	url: string;
	logo: string;
	image: string;
	email: string;
	description: string;
	address: { '@type': 'PostalAddress'; addressCountry: 'DE' };
	knowsLanguage: string[];
};

/** Site-wide publisher node. Safe to emit on every page.
 *
 *  `sameAs`, `foundingDate` and `founder` are deliberately absent. The first
 *  two are unverified. `founder` used to carry a full legal name reconstructed
 *  from the local part of `hikmat.imanov@notiva.de` — an inference about a real
 *  private individual, asserted as fact, appearing nowhere in the rendered
 *  copy. That is exactly the "never invent facts to satisfy a schema field"
 *  rule. Restore it only once the name is published in visible page copy, so
 *  the markup mirrors what a reader sees. */
export function organization(): OrganizationSchema {
	return {
		'@context': SCHEMA_CONTEXT,
		'@type': 'Organization',
		'@id': ORGANIZATION_ID,
		name: ORG_NAME,
		url: SITE_URL,
		logo: absoluteUrl(LOGO_PATH),
		image: absoluteUrl(LOGO_PATH),
		email: ORG_EMAIL,
		description: `Notiva baut das KI-native Finanz-Backoffice für Selbstständige in Deutschland. Der Start ist für ${LAUNCH_YEAR} geplant.`,
		address: { '@type': 'PostalAddress', addressCountry: 'DE' },
		knowsLanguage: ['de', 'en'],
	};
}

/* ── WebSite ─────────────────────────────────────────────────────── */

export type WebSiteSchema = {
	'@context': string;
	'@type': 'WebSite';
	'@id': string;
	name: string;
	url: string;
	description: string;
	inLanguage: string;
	publisher: OrganizationRef;
};

/** For `/` only. No `SearchAction`: the site has no search endpoint. */
export function website(): WebSiteSchema {
	return {
		'@context': SCHEMA_CONTEXT,
		'@type': 'WebSite',
		'@id': WEBSITE_ID,
		name: ORG_NAME,
		url: `${SITE_URL}/`,
		description: `Notiva ist das KI-native Finanz-Backoffice für Selbstständige in Deutschland. Start ${LAUNCH_YEAR}.`,
		inLanguage: 'de-DE',
		publisher: organizationRef(),
	};
}

/* ── SoftwareApplication ─────────────────────────────────────────── */

export type SoftwareApplicationSchema = {
	'@context': string;
	'@type': 'SoftwareApplication';
	'@id': string;
	name: string;
	url: string;
	applicationCategory: 'FinanceApplication';
	applicationSubCategory: string;
	operatingSystem: string;
	description: string;
	inLanguage: string;
	countriesSupported: string;
	featureList: string[];
	audience: {
		'@type': 'Audience';
		audienceType: string;
		geographicArea: { '@type': 'Country'; name: string };
	};
	publisher: OrganizationRef;
	author: OrganizationRef;
};

/** The product node for `/`.
 *  No `offers`, no `price`, no `aggregateRating`: pricing is not public and no
 *  ratings exist. Pre-launch timing is stated in prose inside `description`
 *  rather than faked through an availability or release-date field. */
export function softwareApplication(): SoftwareApplicationSchema {
	return {
		'@context': SCHEMA_CONTEXT,
		'@type': 'SoftwareApplication',
		'@id': SOFTWARE_APPLICATION_ID,
		name: ORG_NAME,
		url: `${SITE_URL}/`,
		applicationCategory: 'FinanceApplication',
		applicationSubCategory: 'Buchhaltung und Steuerpflichten für Selbstständige',
		operatingSystem: 'Web',
		description:
			'Notiva liest Bank, E-Mail und Dokumente das ganze Jahr, bereitet Buchhaltung und ' +
			'Umsatzsteuer vor und warnt vor Fristen, bevor sie Geld kosten. Berechnet, nie geraten: ' +
			'jede Empfehlung mit Beleg. Notiva ersetzt keinen Steuerberater, sondern liefert eine ' +
			`DATEV-fähige Übergabe an die Kanzlei. Der Start ist für ${LAUNCH_YEAR} geplant.`,
		inLanguage: 'de',
		countriesSupported: 'DE',
		featureList: [
			'Durchgehende Erfassung aus Bank, E-Mail und Dokumenten',
			'Deterministische Berechnung: Zahlen kommen aus einer Engine, nicht aus dem Sprachmodell',
			'Umsatzsteuer-Voranmeldung und EÜR vorbereitet',
			'Fristen und Action Inbox: Warnung, bevor etwas Geld kostet',
			'GoBD-konforme Archivierung der Belege',
			'DATEV-fähige Übergabe an die Steuerkanzlei',
			'Novi erklärt jede Empfehlung mit Beleg und erteilt keine individuelle Steuerberatung',
		],
		audience: {
			'@type': 'Audience',
			audienceType:
				'Selbstständige in Deutschland: Freiberufler und Einzelunternehmer, umsatzsteuerpflichtig',
			geographicArea: { '@type': 'Country', name: 'Deutschland' },
		},
		publisher: organizationRef(),
		author: organizationRef(),
	};
}

/* ── FAQPage ─────────────────────────────────────────────────────── */

export interface FaqEntry {
	question: string;
	answer: string;
}

export interface FaqPageOptions {
	/** Path or absolute URL of the page carrying the FAQ, e.g. `'/for-investors'`. */
	url?: string;
	/** BCP-47 / schema language tag. Default `'de'`. */
	inLanguage?: string;
}

export type FaqPageSchema = {
	'@context': string;
	'@type': 'FAQPage';
	'@id'?: string;
	url?: string;
	inLanguage: string;
	mainEntity: {
		'@type': 'Question';
		name: string;
		acceptedAnswer: { '@type': 'Answer'; text: string };
	}[];
};

/** Wraps question/answer pairs. Strings must be the exact German copy that is
 *  visible on the page — Google requires the markup to match the rendered text. */
export function faqPage(qa: readonly FaqEntry[], options: FaqPageOptions = {}): FaqPageSchema {
	const pageUrl = options.url ? absoluteUrl(options.url) : undefined;
	return compact({
		'@context': SCHEMA_CONTEXT,
		'@type': 'FAQPage' as const,
		'@id': pageUrl ? `${pageUrl}#faq` : undefined,
		url: pageUrl,
		inLanguage: options.inLanguage ?? 'de',
		mainEntity: qa.map((entry) => ({
			'@type': 'Question' as const,
			name: entry.question,
			acceptedAnswer: { '@type': 'Answer' as const, text: entry.answer },
		})),
	});
}

/** The six `<details>` Q&As of `/for-investors`, German copy verbatim.
 *  Source: `src/app/(notiva)/for-investors/page.tsx`, section "Häufige Fragen".
 *  If that copy changes, change it here too — mismatched markup is a violation. */
export const INVESTOR_FAQ: readonly FaqEntry[] = [
	{
		question: 'Wie hoch ist die Runde?',
		answer:
			'Wir sammeln eine Pre-Seed-Runde neben der EXIST-Förderung ein. Höhe, Konditionen und Verwendung der Mittel nennen wir auf Anfrage und im Deck.',
	},
	{
		question: 'Ersetzt Notiva den Steuerberater?',
		answer:
			'Nein. Notiva arbeitet mit der Kanzlei: DATEV-fähige Übergabe, kategorisierte Buchungen, gescannte Belege, Deckblatt für Urteilsfragen. Das StBerG setzt die Grenze, wir halten sie schriftlich fest.',
	},
	{
		question: 'Was passiert, wenn das Sprachmodell halluziniert?',
		answer:
			'Novi erzeugt keine Zahlen. Jede Zahl kommt reproduzierbar aus einer deterministischen Engine; Novi erklärt sie und verweist auf den Beleg. Das ist Korrektheitsanforderung und Argument gegen Chat-Produkte zugleich.',
	},
	{
		question: 'Warum Deutschland zuerst und nicht Europa?',
		answer:
			'Steuern folgen dem Wohnsitz, nicht dem Sitz der Kunden: Ein Freelancer in Deutschland mit Kunden in fünf Ländern reicht hier ein. Tiefe in einer Jurisdiktion schlägt Breite. Europa ist eine Erzählung ab Jahr 3.',
	},
	{
		question: 'Verdient Notiva an Provisionen?',
		answer:
			'Abonnements sind die Haupteinnahmequelle. Kommt später Vermittlung dazu, wird sie von der Empfehlungslogik getrennt und offengelegt, mit Rückvergütung oder Pauschaloption für bezahlte Tarife. Ein Interessenkonflikt wäre die schärfste Angriffslinie gegen uns.',
	},
	{
		question: 'Wie sieht die nächste Runde aus?',
		answer:
			'Die Seed-Runde wird mit Kennzahlen gekauft, nicht mit Erzählung: zahlende Nutzer im vierstelligen Bereich, Sechs-Monats-Retention, LTV/CAC, erste Kanzlei-Partner, ERiC live, ein vollständiges Steuerjahr. Zielwerte im Deck.',
	},
];

/* ── Product + Offer ─────────────────────────────────────────────── */

export type ProductSchema = {
	'@context': string;
	'@type': 'Product';
	'@id': string;
	name: string;
	description: string;
	url: string;
	sku: string;
	inLanguage: string;
	brand: { '@type': 'Brand'; name: string };
	material?: string;
	image?: string[];
	offers: {
		'@type': 'Offer';
		'@id': string;
		url: string;
		priceCurrency: string;
		price: string;
		priceSpecification: {
			'@type': 'UnitPriceSpecification';
			priceCurrency: string;
			price: string;
			valueAddedTaxIncluded: true;
		};
		availability: 'https://schema.org/PreOrder';
		itemCondition: 'https://schema.org/NewCondition';
		seller: OrganizationRef;
	};
};

/** One merch PDP. Name/description/material come from `PRODUCT_COPY` (German).
 *
 *  Price and images are overridable because the live figures come from
 *  Fourthwall: what this emits has to be what the page prints and what the
 *  customer is actually charged, and a JSON-LD offer that disagrees with the
 *  checkout is a misrepresentation, not a stale cache. `MERCH_PRICE_EUR` and
 *  the local gallery remain the defaults for when no shop is configured.
 *
 *  `availability` is `PreOrder` on purpose: orders are non-binding until launch
 *  and nothing is charged. No rating, no review count, no return policy and no
 *  shipping node — none of those are substantiated. `image` is omitted for the
 *  six products that have no photograph yet. */
export function product(
	slug: MerchId,
	overrides: { priceEur?: number; images?: string[] } = {}
): ProductSchema {
	const copy = PRODUCT_COPY[slug];
	const url = absoluteUrl(`/merch/${slug}`);
	const price = money(overrides.priceEur ?? MERCH_PRICE_EUR[slug]);

	/* Fourthwall image URLs are already absolute and already public. */
	const images = overrides.images?.length
		? overrides.images
		: [copy.gallery.main, ...copy.gallery.thumbs]
				.map((slot) => slot.src)
				.filter((src): src is string => typeof src === 'string' && src.length > 0)
				.map(absoluteUrl);

	return compact({
		'@context': SCHEMA_CONTEXT,
		'@type': 'Product' as const,
		'@id': merchProductId(slug),
		name: copy.name.de,
		description: copy.desc.de,
		url,
		sku: slug,
		inLanguage: 'de',
		brand: { '@type': 'Brand' as const, name: ORG_NAME },
		material: copy.material.de,
		image: Array.from(new Set(images)),
		offers: {
			'@type': 'Offer' as const,
			'@id': `${url}#offer`,
			url,
			priceCurrency: CURRENCY,
			price,
			priceSpecification: {
				'@type': 'UnitPriceSpecification' as const,
				priceCurrency: CURRENCY,
				price,
				valueAddedTaxIncluded: true as const,
			},
			availability: 'https://schema.org/PreOrder' as const,
			itemCondition: 'https://schema.org/NewCondition' as const,
			seller: organizationRef(),
		},
	});
}

/* ── BreadcrumbList ──────────────────────────────────────────────── */

export interface BreadcrumbEntry {
	/** Visible label, German. */
	name: string;
	/** Path (`'/support'`) or absolute URL. */
	url: string;
}

export type BreadcrumbListSchema = {
	'@context': string;
	'@type': 'BreadcrumbList';
	itemListElement: {
		'@type': 'ListItem';
		position: number;
		name: string;
		item: string;
	}[];
};

/** Trail order is root → leaf; positions are assigned 1…n. */
export function breadcrumbList(trail: readonly BreadcrumbEntry[]): BreadcrumbListSchema {
	return {
		'@context': SCHEMA_CONTEXT,
		'@type': 'BreadcrumbList',
		itemListElement: trail.map((entry, index) => ({
			'@type': 'ListItem' as const,
			position: index + 1,
			name: entry.name,
			item: absoluteUrl(entry.url),
		})),
	};
}

/** Start → Unterstützen → <product>. Mirrors how merch pages are actually
 *  reached: the shop grid lives on `/support`, there is no `/merch` index. */
export function merchBreadcrumb(slug: MerchId): BreadcrumbListSchema {
	return breadcrumbList([
		{ name: 'Start', url: '/' },
		{ name: 'Unterstützen', url: '/support' },
		{ name: PRODUCT_COPY[slug].name.de, url: `/merch/${slug}` },
	]);
}

/* ── ItemList ────────────────────────────────────────────────────── */

export interface ItemListEntry {
	/** Path (`'/merch/shirt'`) or absolute URL. */
	url: string;
	name?: string;
	/** Optional embedded node, e.g. `product('shirt')`. */
	item?: JsonLdDocument;
}

export interface ItemListOptions {
	/** German list name, e.g. `'Notiva Merch'`. */
	name?: string;
	description?: string;
	/** Path or URL of the page carrying the list; sets `@id` and `url`. */
	url?: string;
}

export type ItemListSchema = {
	'@context': string;
	'@type': 'ItemList';
	'@id'?: string;
	url?: string;
	name?: string;
	description?: string;
	numberOfItems: number;
	itemListOrder: 'https://schema.org/ItemListOrderAscending';
	itemListElement: {
		'@type': 'ListItem';
		position: number;
		url: string;
		name?: string;
		item?: JsonLdDocument;
	}[];
};

/** Generic ordered list of URLs. Positions are assigned 1…n in array order. */
export function itemList(
	entries: readonly ItemListEntry[],
	options: ItemListOptions = {}
): ItemListSchema {
	const pageUrl = options.url ? absoluteUrl(options.url) : undefined;
	return compact({
		'@context': SCHEMA_CONTEXT,
		'@type': 'ItemList' as const,
		'@id': pageUrl ? `${pageUrl}#itemlist` : undefined,
		url: pageUrl,
		name: options.name,
		description: options.description,
		numberOfItems: entries.length,
		itemListOrder: 'https://schema.org/ItemListOrderAscending' as const,
		itemListElement: entries.map((entry, index) =>
			compact({
				'@type': 'ListItem' as const,
				position: index + 1,
				url: absoluteUrl(entry.url),
				name: entry.name,
				item: entry.item,
			})
		),
	});
}

/** The eight merch products in catalogue order, for the shop grid on `/support`.
 *  Emits link + name only by default; pass `{ embedProducts: true }` to nest the
 *  full `Product` node (with its PreOrder offer) inside each `ListItem`. */
export function merchItemList(
	options: ItemListOptions & { embedProducts?: boolean } = {}
): ItemListSchema {
	const { embedProducts = false, ...listOptions } = options;
	return itemList(
		MERCH_ORDER.map((slug) => ({
			url: `/merch/${slug}`,
			name: PRODUCT_COPY[slug].name.de,
			item: embedProducts ? (product(slug) as JsonLdDocument) : undefined,
		})),
		{
			name: listOptions.name ?? 'Notiva Merch',
			description:
				listOptions.description ??
				'Merch von Notiva. Bestellungen sind bis zum Launch unverbindlich, abgebucht wird nichts.',
			url: listOptions.url,
		}
	);
}

/* ── composition helper ──────────────────────────────────────────── */

/** Merges several builder results into one `@graph` document, hoisting the
 *  shared `@context`. Use when a page emits more than one node:
 *  `<JsonLd data={graph(organization(), website(), softwareApplication())} />`.
 *  Passing an array to `<JsonLd>` works too; this just avoids repeating
 *  `@context` in the payload. */
export function graph(...nodes: readonly SchemaNode[]): JsonLdDocument {
	return {
		'@context': SCHEMA_CONTEXT,
		'@graph': nodes.map((node) => {
			const rest: Record<string, unknown> = { ...node };
			delete rest['@context'];
			return rest;
		}),
	};
}
