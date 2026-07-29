'use client';

/* Notiva merch catalogue + basket.
   Direct port of assets/notiva-shop.js lines 4–70 (catalogue, fmt, read/save,
   count/subtotal/shipping, add, setQty) and the flash message the basket bar
   shows after an add (line 63). `page` targets are re-pointed at the Next
   routes: Merch Shirt.html → /merch/shirt. */

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';
import type { Lang } from './lang-context';
import { useLang } from './lang-context';

export type MerchId =
	| 'shirt'
	| 'hoodie'
	| 'cap'
	| 'tote'
	| 'pin'
	| 'stickers'
	| 'sleeve'
	| 'plush';

export interface MerchItem {
	slug: MerchId;
	de: string;
	en: string;
	price: number;
	sizes?: string[];
	img?: string;
}

export const MERCH: Record<MerchId, MerchItem> = {
	shirt: {
		slug: 'shirt',
		de: 'T-Shirt ✦',
		en: 'T-shirt ✦',
		price: 29,
		sizes: ['S', 'M', 'L', 'XL', 'XXL'],
		img: '/notiva/novi/merch-shirt.png',
	},
	hoodie: {
		slug: 'hoodie',
		de: 'Hoodie ✦',
		en: 'Hoodie ✦',
		price: 59,
		sizes: ['S', 'M', 'L', 'XL', 'XXL'],
	},
	cap: { slug: 'cap', de: 'Cap', en: 'Cap', price: 24 },
	tote: { slug: 'tote', de: 'Tote Bag', en: 'Tote bag', price: 19 },
	pin: { slug: 'pin', de: 'Emaille-Pin ✦', en: 'Enamel pin ✦', price: 9 },
	stickers: {
		slug: 'stickers',
		de: 'Sticker-Set',
		en: 'Sticker set',
		price: 6,
		img: '/notiva/novi/sticker-pack.png',
	},
	sleeve: { slug: 'sleeve', de: 'Laptop-Sleeve', en: 'Laptop sleeve', price: 34 },
	plush: { slug: 'plush', de: 'Novi-Plüschtier', en: 'Novi plush', price: 39 },
};

export const SHIP = 4.9;
export const FREE_SHIPPING_FROM = 60;

const LS_BASKET = 'notiva.basket.v1';
const FLASH_MS = 2600;

/** Same rounding + separator rules as notiva-shop.js fmt(). */
export function fmt(n: number, lang: Lang): string {
	if (Math.abs(n - Math.round(n)) < 0.005) return '€' + Math.round(n);
	const s = n.toFixed(2);
	return '€' + (lang === 'de' ? s.replace('.', ',') : s);
}

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
}

const BasketContext = createContext<BasketContextValue>({
	lines: [],
	add: () => {},
	setQty: () => {},
	clear: () => {},
	count: 0,
	subtotal: 0,
	shipping: 0,
	flash: null,
});

function isMerchId(v: unknown): v is MerchId {
	return typeof v === 'string' && Object.prototype.hasOwnProperty.call(MERCH, v);
}

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
}: {
	children: React.ReactNode;
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

	const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
	const subtotal = useMemo(
		() => lines.reduce((n, l) => n + l.qty * MERCH[l.id].price, 0),
		[lines]
	);
	const shipping = useMemo(
		() => (subtotal === 0 || subtotal >= FREE_SHIPPING_FROM ? 0 : SHIP),
		[subtotal]
	);

	const value = useMemo<BasketContextValue>(
		() => ({ lines, add, setQty, clear, count, subtotal, shipping, flash }),
		[lines, add, setQty, clear, count, subtotal, shipping, flash]
	);

	return <BasketContext.Provider value={value}>{children}</BasketContext.Provider>;
}

export function useBasket(): BasketContextValue {
	return useContext(BasketContext);
}
