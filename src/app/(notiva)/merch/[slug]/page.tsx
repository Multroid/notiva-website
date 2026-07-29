/* /merch/[slug] — the eight merch PDPs of the design source
   (Merch Hoodie.html + its seven siblings). CSS order per the port spec:
   page.css → shop.css; there is no page-specific stylesheet because
   Merch Hoodie.html carries no inline <style>. */

import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import '@/styles/notiva/page.css';
import '@/styles/notiva/shop.css';

import { MerchProduct } from './merch-product';
import { MERCH_ORDER, PRODUCT_COPY, isMerchSlug } from './product-copy';

export function generateStaticParams(): { slug: string }[] {
	return MERCH_ORDER.map((slug) => ({ slug }));
}

/* <html data-title-de> of each design file — "Notiva · " + the catalogue name.
   The client component switches document.title when the language flips. */
export async function generateMetadata({
	params,
}: {
	params: Promise<{ slug: string }>;
}): Promise<Metadata> {
	const { slug } = await params;
	if (!isMerchSlug(slug)) return { title: 'Notiva' };
	return { title: `Notiva · ${PRODUCT_COPY[slug].name.de}` };
}

export default async function MerchSlugPage({
	params,
}: {
	params: Promise<{ slug: string }>;
}) {
	const { slug } = await params;
	if (!isMerchSlug(slug)) notFound();
	return <MerchProduct slug={slug} />;
}
