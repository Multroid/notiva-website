/* /merch/[slug] — the eight merch PDPs of the design source
   (Merch Hoodie.html + its seven siblings). CSS order per the port spec:
   page.css → shop.css; there is no page-specific stylesheet because
   Merch Hoodie.html carries no inline <style>. */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import '@/styles/notiva/page.css';
import '@/styles/notiva/shop.css';

import { JsonLd } from '@/components/notiva/json-ld';
import { getCatalogue } from '@/lib/fourthwall/catalogue';
import { NOINDEX, pageMetadata } from '@/lib/page-metadata';
import {
	graph,
	merchBreadcrumb,
	product,
	type MerchId,
} from '@/lib/structured-data';

import { MerchProduct } from './merch-product';
import { MERCH_ORDER, PRODUCT_COPY, isMerchSlug } from './product-copy';

export function generateStaticParams(): { slug: string }[] {
	return MERCH_ORDER.map((slug) => ({ slug }));
}

/* The catalogue is a closed set of eight slugs, so an unknown one is never a
   page that has to be rendered — and letting Next try was actively harmful.
   With the default `dynamicParams = true`, /merch/<unknown> was rendered
   on demand, hit notFound() mid-render and fell into Next's error shell:
   `<html id="__next_error__">` with no `lang`, an empty <body> (the 404 markup
   only existed inside the RSC flight script), `<title>Notiva - Notiva</title>`
   and none of the metadata below — measured on a production build, not just in
   dev. Only Next's own automatic `noindex` kept it out of the index.

   `false` makes any slug outside generateStaticParams() a plain 404 handled by
   the root /_not-found route, which renders through src/app/layout.tsx and so
   ships `<html lang="de">`, one <h1> and the right title. */
export const dynamicParams = false;

/** First sentence of the German product copy.
 *
 *  Splitting on ". " is safe here and only here: all eight `desc.de` strings
 *  were checked, and none contains an abbreviation with a full stop before the
 *  first sentence break. Falls back to the whole string if there is no break. */
function firstSentence(text: string): string {
	const end = text.indexOf('. ');
	return end === -1 ? text : text.slice(0, end + 1);
}

/** ~130–160 characters of German: what it is, what it costs, and the fact that
 *  ordering it today is a non-binding pre-order. The last part is not optional
 *  — the shop takes no money until launch, and a description implying otherwise
 *  would be a claim the site does not honour. */
function merchDescription(slug: MerchId, priceEur: number): string {
	const copy = PRODUCT_COPY[slug];
	return (
		`${copy.name.de} von Notiva für €${priceEur} inkl. MwSt. ` +
		`${firstSentence(copy.desc.de)} Vorbestellung, unverbindlich bis zum Launch 2026.`
	);
}

/* <html data-title-de> of each design file — "Notiva · " + the catalogue name,
   the same string MerchProduct feeds to useNotivaTitle().

   The !isMerchSlug branch is unreachable now that dynamicParams is false — an
   unknown slug is rejected by the router before this runs. It stays purely as
   the type guard that narrows `string` to `MerchId`; the NOINDEX it returns is
   belt-and-braces, not a signal anything depends on. */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	if (!isMerchSlug(slug)) {
		return { title: 'Notiva · Seite nicht gefunden', robots: NOINDEX };
	}
	/* The price in the meta description is a public claim, so it is the live one
	   whenever a shop is configured. */
	const catalogue = await getCatalogue();
	return pageMetadata({
		title: `Notiva · ${PRODUCT_COPY[slug].name.de}`,
		description: merchDescription(slug, catalogue[slug].price),
		path: `/merch/${slug}`,
		/* opengraph-image.tsx sits in this segment and renders the product name
		   and price, so let Next merge that card instead of the generic one. */
		hasOwnOgImage: true,
	});
}

export default async function MerchSlugPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	if (!isMerchSlug(slug)) notFound();
	const entry = (await getCatalogue())[slug];
	return (
		<>
			{/* Product + Offer (PreOrder, EUR, VAT included, seller = the
			    Organization node from the group layout) and the Start →
			    Unterstützen → product trail, which mirrors how the page is
			    actually reached: the grid lives on /support, there is no
			    /merch index.

			    Price and images are the live Fourthwall ones so the markup, the
			    rendered page and the checkout all state the same thing. */}
			<JsonLd
				id="ld-product"
				data={graph(
					product(slug, {
						priceEur: entry.price,
						images: entry.images.map((img) => img.url),
					}),
					merchBreadcrumb(slug)
				)}
			/>
			<MerchProduct slug={slug} />
		</>
	);
}
