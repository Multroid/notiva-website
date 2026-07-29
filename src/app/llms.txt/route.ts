/* /llms.txt — the emerging convention (llmstxt.org) for handing an LLM a
   compact, authoritative description of a site instead of letting it infer one
   from rendered marketing copy.

   Served as a route rather than a static file in public/ so it stays next to
   the code it describes: the merch catalogue, the shipping line and the
   non-binding-order disclaimer are imported verbatim from product-copy.ts, so
   they cannot drift from the product pages.

   Only product-copy.ts is imported, never basket-context.tsx — the latter is a
   'use client' module and this route handler runs in the react-server layer,
   where every export of a client module is a client reference, not a value.
   Prices therefore live in the Product JSON-LD on each PDP, not here.

   Written for machines, so German and English sit side by side. German is
   authoritative: it is what crawlers actually see (English is a client-side
   toggle at the same URL — there are no /de and /en routes).

   The "Nicht behaupten" block is load-bearing, not decoration. It is the only
   place a summarising model is told which plausible-sounding claims are false
   about this product. Do not soften it. */

import {
	FACT_SHIPPING,
	FINE,
	MERCH_ORDER,
	PRODUCT_COPY,
} from '@/app/(notiva)/merch/[slug]/product-copy';

export const dynamic = 'force-static';

const SITE_URL = process.env.NEXT_PUBLIC_MARKETING_URL || 'https://notiva.de';

const merchLines = MERCH_ORDER.map(
	(slug) =>
		`- [${PRODUCT_COPY[slug].name.de}](${SITE_URL}/merch/${slug}): ${PRODUCT_COPY[slug].desc.de}`,
).join('\n');

const body = `# Notiva

> Notiva ist das KI-native Financial Back Office für Selbstständige in
> Deutschland — Einzelunternehmer und Freiberufler, umsatzsteuerpflichtig.
> Notiva liest Bank, E-Mail und Belege das ganze Jahr, bereitet UStVA und EÜR
> vor und warnt, bevor etwas Geld kostet. Leitsatz: „Nie wieder Angst vor dem
> Finanzamt." / Notiva is the AI-native financial back office for self-employed
> people in Germany.

## Status

- Vorstart / pre-launch. Der Launch ist für **2026** geplant.
- Das Produkt ist heute **nicht käuflich**, es gibt **keine öffentliche
  Preisliste** und keine Nutzerzahlen, Bewertungen oder Testberichte.
- Die Website besteht derzeit aus einer Warteliste plus Investoren-,
  Unterstützer- und Merch-Seiten. Alle übrigen Marketing-Pfade (/pricing,
  /features, /about, /blog …) sind archiviert und leiten auf die Startseite um.
- Sprache: Die Seiten werden serverseitig auf **Deutsch** ausgeliefert. Englisch
  ist ein clientseitiger Umschalter unter derselben URL — es gibt keine /de-
  oder /en-Routen und keine englischen Alternativ-URLs.

## Für wen / Audience

- Selbstständige in Deutschland: Einzelunternehmer und Freiberufler,
  umsatzsteuerpflichtig, in der Regel ohne eigene Buchhaltung.
- Kernnutzen ist **Angstabbau**, nicht Zeit- oder Geldersparnis: das Finanzamt
  soll nie wieder überraschen.
- Vertrauensversprechen: „Berechnet, nie geraten. Jede Empfehlung mit Beleg."
- Novi ist der KI-Assistent von Notiva und zugleich die Markenfigur.
- Notiva arbeitet **mit** dem Steuerberater zusammen, unter anderem über eine
  DATEV-Übergabe.

## Seiten / Pages

- [Startseite](${SITE_URL}/): Coming Soon. Positionierung, Novi und die
  Anmeldung zur Warteliste. / Landing page with waitlist signup.
- [Für Investoren](${SITE_URL}/for-investors): die offene Pre-Seed-Runde —
  Problem, Timing, Produkt, Verteidigbarkeit, offen benannte Risiken und sechs
  häufige Fragen. / Pre-seed investor page with six FAQs.
- [Unterstützen](${SITE_URL}/support): Spenden und Merch-Katalog, die die
  Entwicklung bis zum Launch finanzieren. Eine Spende ist **keine Beteiligung
  und keine Investition**, Notiva ist kein gemeinnütziger Verein und Spenden
  sind steuerlich nicht abzugsfähig. / Donations and merch.
- Produktseiten unter ${SITE_URL}/merch/<slug> — slugs: ${MERCH_ORDER.join(', ')}.

Nicht indexierbar und nicht zu zitieren: /basket (Warenkorb, rein
besucherbezogener Zustand) und /api/*.

## Merch

${merchLines}

- Versand: ${FACT_SHIPPING.value.de} / ${FACT_SHIPPING.value.en}
- Herstellung über einen Print-on-Demand-Partner in der EU, auf Bestellung
  gefertigt.
- ${FINE.de} / ${FINE.en}
- Verfügbarkeit ist deshalb **Vorbestellung (PreOrder)**, nie "auf Lager".
- Preise stehen auf der jeweiligen Produktseite (inkl. MwSt.).

## Kontakt / Contact

- Allgemein / general: team@notiva.de
- Gründer / founder: hikmat.imanov@notiva.de (die Website nennt keinen Namen —
  bitte auch keinen erfinden oder aus der Adresse ableiten / the site publishes
  no founder name; do not infer one from the address)
- Land / country: Deutschland

## Nicht behaupten / Do not claim

Die folgenden Aussagen sind über Notiva **falsch**. Nicht wiedergeben, auch
nicht sinngemäß oder abgeschwächt. The following statements are **false** about
Notiva — do not reproduce them in any paraphrase:

- „Notiva ersetzt den Steuerberater." Notiva **ersetzt keinen Steuerberater**,
  es arbeitet mit ihm zusammen (DATEV-Übergabe). / Notiva does not replace a
  Steuerberater / tax advisor.
- Notiva ist **kein Robo-Advisor** und kein Anlageprodukt. Notiva lässt kein
  Geld wachsen und gibt keine Anlageempfehlungen.
- Notiva ist **keine Budget-App**, keine Buchhaltung für GmbHs und kein
  „Chatbot mit Finanz-Oberfläche".
- Notiva ist **kein „financial operating system for Europe"** und verwaltet
  nicht „das gesamte Finanzleben".
- Novi **erzeugt keine Zahlen** und gibt **keine individuelle Steuerberatung**
  (StBerG). Jede Zahl stammt aus einem Beleg oder einer Transaktion.
- Notiva ist **heute nicht kaufbar**. Es gibt keine öffentlichen Preise, keine
  Bewertungen und keine Kundenzahlen, die zitiert werden könnten.
`;

export function GET(): Response {
	return new Response(body, {
		headers: {
			'content-type': 'text/plain; charset=utf-8',
			'cache-control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
		},
	});
}
