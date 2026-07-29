'use client';

/* Notiva merch basket.
   Behaviour is still the port of assets/notiva-shop.js lines 4–70 (read/save,
   count/subtotal/shipping, add, setQty) and the flash message the basket bar
   shows after an add (line 63).

   Two things changed when Fourthwall came in:

   • The catalogue data moved to src/lib/merch.ts (plain module, importable by
     server code) and is re-exported below, so every existing
     `from '@/components/notiva/basket-context'` import still resolves.

   • Prices are no longer read from the local table. The route-group layout
     fetches the live catalogue server-side and passes it in; `priceOf()` reads
     that, falling back to the local figure for any product Fourthwall has not
     been told about yet.

   The stored line stays `{id, size, qty}` — deliberately *not* the Fourthwall
   variant id. Variant ids are resolved from the catalogue at checkout, so a
   basket that has been sitting in localStorage across a product change picks up
   the new variant instead of trying to buy a withdrawn one, and the v1 storage
   format needs no migration. */

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

import {
	FREE_SHIPPING_FROM,
	MERCH,
	SHIP,
	isMerchId,
	type MerchId,
} from '@/lib/merch';
import type { Catalogue, CatalogueEntry } from '@/lib/fourthwall/catalogue';
import { isLive, variantFor } from '@/lib/fourthwall/catalogue';

import { useLang } from './lang-context';

export {
	MERCH,
	SHIP,
	FREE_SHIPPING_FROM,
	fmt,
	isMerchId,
	type MerchId,
	type MerchItem,
} from '@/lib/merch';

const LS_BASKET = 'notiva.basket.v1';
const FLASH_MS = 2600;

export interface BasketLine {
	id: MerchId;
	size: string;
	qty: number;
}

export interface BasketContextValue {
	lines: BasketLine[];
	add(id: MerchId, size?: string, qty?: number): void;
	setQty(index: number, qty: number): void;
	clear(): void;
	count: number;
	subtotal: number;
	shipping: number;
	flash: string | null;
	/** Live catalogue, or the local fallback when no shop is configured. */
	catalogue: Catalogue;
	/** Whether a Fourthwall checkout can be built from this basket. */
	live: boolean;
	/** Unit price for a line, live where available. */
	priceOf(id: MerchId, size?: string): number;
	/** Basket → Fourthwall cart items. Empty when nothing resolves. */
	checkoutLines(): { variantId: string; quantity: number }[];
}

/** Local-only catalogue, used before the provider mounts and by any consumer
 *  rendered outside it. Mirrors localCatalogue() in the Fourthwall bridge. */
function fallbackCatalogue(): Catalogue {
	const entries = (Object.keys(MERCH) as MerchId[]).map(
		(id): [MerchId, CatalogueEntry] => [
			id,
			{
				id,
				price: MERCH[id].price,
				currency: 'EUR',
				images: [],
				variants: [],
				available: true,
				source: 'local',
			},
		]
	);
	return Object.fromEntries(entries) as Catalogue;
}

const EMPTY_CATALOGUE = fallbackCatalogue();

const BasketContext = createContext<BasketContextValue>({
	lines: [],
	add: () => {},
	setQty: () => {},
	clear: () => {},
	count: 0,
	subtotal: 0,
	shipping: 0,
	flash: null,
	catalogue: EMPTY_CATALOGUE,
	live: false,
	priceOf: (id) => MERCH[id].price,
	checkoutLines: () => [],
});

/** read() from notiva-shop.js — tolerant of anything that is not a valid line. */
function readStored(): BasketLine[] {
	let raw: string | null = null;
	try {
		raw = window.localStorage.getItem(LS_BASKET);
	} catch {
		return [];
	}
	if (!raw) return [];
	try {
		const parsed: unknown = JSON.parse(raw);
		if (!Array.isArray(parsed)) return [];
		const out: BasketLine[] = [];
		for (const entry of parsed) {
			if (!entry || typeof entry !== 'object') continue;
			const rec = entry as Record<string, unknown>;
			const qty = typeof rec.qty === 'number' ? rec.qty : 0;
			if (!isMerchId(rec.id) || !(qty > 0)) continue;
			out.push({
				id: rec.id,
				size: typeof rec.size === 'string' ? rec.size : '',
				qty,
			});
		}
		return out;
	} catch {
		return [];
	}
}

export function NotivaBasketProvider({
	children,
	catalogue = EMPTY_CATALOGUE,
}: {
	children: React.ReactNode;
	catalogue?: Catalogue;
}): React.JSX.Element {
	const { lang } = useLang();
	const [lines, setLines] = useState<BasketLine[]>([]);
	const [flash, setFlash] = useState<string | null>(null);
	/* State, not a ref: effects run in declaration order within one commit, so a
	   ref set by the hydrate effect is already true when the persist effect fires
	   with the first-render `lines === []` — which would write "[]" over a stored
	   basket. A state flag only becomes true on the next render, after the stored
	   lines are in state. */
	const [hydrated, setHydrated] = useState(false);
	const flashTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

	/* hydrate — effect only, so SSR and first client render agree on [] */
	useEffect(() => {
		const stored = readStored();
		if (stored.length) setLines(stored);
		setHydrated(true);
	}, []);

	/* persist — never before hydration, or we would wipe a stored basket */
	useEffect(() => {
		if (!hydrated) return;
		try {
			window.localStorage.setItem(LS_BASKET, JSON.stringify(lines));
		} catch {
			/* ignore */
		}
	}, [lines, hydrated]);

	useEffect(() => {
		return () => {
			if (flashTimer.current) clearTimeout(flashTimer.current);
		};
	}, []);

	const showFlash = useCallback((msg: string) => {
		setFlash(msg);
		if (flashTimer.current) clearTimeout(flashTimer.current);
		flashTimer.current = setTimeout(() => {
			flashTimer.current = null;
			setFlash(null);
		}, FLASH_MS);
	}, []);

	const priceOf = useCallback(
		(id: MerchId, size = '') => {
			const entry = catalogue[id];
			if (!entry) return MERCH[id].price;
			return variantFor(entry, size)?.price ?? entry.price;
		},
		[catalogue]
	);

	const add = useCallback(
		(id: MerchId, size?: string, qty?: number) => {
			const item = MERCH[id];
			if (!item) return;
			const s = size || '';
			const q = qty || 1;
			setLines((prev) => {
				const next = prev.map((l) => ({ ...l }));
				let i = -1;
				for (let k = 0; k < next.length; k++) {
					if (next[k].id === id && (next[k].size || '') === s) i = k;
				}
				if (i >= 0) next[i].qty = Math.min(99, next[i].qty + q);
				else next.push({ id, size: s, qty: q });
				return next;
			});
			const added = lang === 'de' ? 'im Korb' : 'in the basket';
			showFlash(item[lang] + (s ? ' (' + s + ')' : '') + ' ' + added);
		},
		[lang, showFlash]
	);

	const setQty = useCallback((index: number, qty: number) => {
		setLines((prev) => {
			if (!prev[index]) return prev;
			const next = prev.map((l) => ({ ...l }));
			if (qty <= 0) next.splice(index, 1);
			else next[index].qty = Math.min(99, qty);
			return next;
		});
	}, []);

	const clear = useCallback(() => {
		setLines([]);
	}, []);

	const checkoutLines = useCallback(() => {
		const out: { variantId: string; quantity: number }[] = [];
		for (const line of lines) {
			const entry = catalogue[line.id];
			if (!entry || !entry.available) continue;
			const variant = variantFor(entry, line.size);
			if (variant) out.push({ variantId: variant.id, quantity: line.qty });
		}
		return out;
	}, [lines, catalogue]);

	const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
	const subtotal = useMemo(
		() => lines.reduce((n, l) => n + l.qty * priceOf(l.id, l.size), 0),
		[lines, priceOf]
	);
	const shipping = useMemo(
		() => (subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIP),
		[subtotal]
	);
	const live = useMemo(() => isLive(catalogue), [catalogue]);

	const value = useMemo<BasketContextValue>(
		() => ({
			lines,
			add,
			setQty,
			clear,
			count,
			subtotal,
			shipping,
			flash,
			catalogue,
			live,
			priceOf,
			checkoutLines,
		}),
		[
			lines,
			add,
			setQty,
			clear,
			count,
			subtotal,
			shipping,
			flash,
			catalogue,
			live,
			priceOf,
			checkoutLines,
		]
	);

	return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
}

export function useBasket(): BasketContextValue {
	return useContext(BasketContext);
}
