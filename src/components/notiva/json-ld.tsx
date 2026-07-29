/* Renders a JSON-LD document into the page.
 *
 * Deliberately NOT a client component: it holds no state, uses no hooks and no
 * browser API, so it works inside Server Components (where the wiring should
 * happen) and, if imported from a `'use client'` file, simply becomes part of
 * that client bundle. Either placement is valid — search engines and answer
 * engines read `<script type="application/ld+json">` from anywhere in the
 * document, body included.
 *
 * Build the `data` object with the typed builders in `src/lib/structured-data.ts`.
 */

import React from 'react';

/** Any plain object that survives `JSON.stringify` — what every builder returns. */
export type JsonLdDocument = Record<string, unknown>;

export interface JsonLdProps {
	/** One JSON-LD node, or an array of nodes (a top-level array is valid JSON-LD). */
	data: JsonLdDocument | readonly JsonLdDocument[];
	/** Optional DOM id, handy when a page emits several blocks (`id="ld-faq"`). */
	id?: string;
}

/* `JSON.stringify` happily emits a literal "</script>" if any string in the
   document contains one, which would close the tag early. Escaping "<" as its
   JSON unicode escape is lossless (same parsed string) and removes the hazard.
   Product copy here is author-controlled, but the builders take caller strings. */
function serialize(data: JsonLdDocument | readonly JsonLdDocument[]): string {
	return JSON.stringify(data).replace(/</g, '\\u003c');
}

export function JsonLd({ data, id }: JsonLdProps): React.JSX.Element {
	return (
		<script
			type="application/ld+json"
			id={id}
			dangerouslySetInnerHTML={{ __html: serialize(data) }}
		/>
	);
}

export default JsonLd;
