'use client';

/* Notiva DE/EN language context.
   Ports the `setLang` / `applyLang` behaviour of the design pages
   (assets/notiva-shop.js lines 32–36, 100–122 and the inline setLang() in
   Coming Soon.html / For Investors.html) to React state.

   Hydration contract: the server and the first client render always produce
   'de' (every design file is <html lang="de">). localStorage is read in an
   effect, never during render. */

import React, {
	createContext,
	useCallback,
	useContext,
	useEffect,
	useMemo,
	useRef,
	useState,
} from 'react';

export type Lang = 'de' | 'en';

/** Same key notiva-shop.js persists the language under. */
const LS_LANG = 'notiva.lang';

interface LangContextValue {
	lang: Lang;
	setLang: (l: Lang) => void;
}

const LangContext = createContext<LangContextValue>({
	lang: 'de',
	setLang: () => {},
});

export function NotivaLangProvider({
	children,
}: {
	children: React.ReactNode;
}): React.JSX.Element {
	const [lang, setLangState] = useState<Lang>('de');
	const restoreLang = useRef<string | null>(null);

	/* hydrate from localStorage — effect only, so SSR/first paint stay 'de' */
	useEffect(() => {
		let stored: string | null = null;
		try {
			stored = window.localStorage.getItem(LS_LANG);
		} catch {
			stored = null;
		}
		if (stored === 'en' || stored === 'de') setLangState(stored);
	}, []);

	/* mirror onto <html lang>, restore whatever the rest of the site had */
	useEffect(() => {
		if (restoreLang.current === null) {
			restoreLang.current = document.documentElement.lang;
		}
		document.documentElement.lang = lang;
	}, [lang]);

	useEffect(() => {
		return () => {
			if (restoreLang.current !== null) {
				document.documentElement.lang = restoreLang.current;
			}
		};
	}, []);

	const setLang = useCallback((l: Lang) => {
		const next: Lang = l === 'en' ? 'en' : 'de';
		setLangState(next);
		try {
			window.localStorage.setItem(LS_LANG, next);
		} catch {
			/* private mode — language still switches for this page view */
		}
	}, []);

	const value = useMemo<LangContextValue>(() => ({ lang, setLang }), [lang, setLang]);

	return <LangContext.Provider value={value}>{children}</LangContext.Provider>;
}

export function useLang(): LangContextValue {
	return useContext(LangContext);
}

/** `const t = useT()` → `t('Deutsch', 'English')`. Returns the DE value when lang === 'de'. */
export function useT(): <A, B>(de: A, en: B) => A | B {
	const { lang } = useLang();
	return useCallback(
		<A, B>(de: A, en: B): A | B => (lang === 'de' ? de : en),
		[lang]
	);
}

export interface TProps {
	de: string;
	en: string;
	as?: React.ElementType;
	className?: string;
	[key: string]: unknown;
}

/** Renders the active string as HTML — the design's data-de/data-en values
    contain inline markup (<em>, <b>, &ldquo;, →). */
export function T({ de, en, as, className, ...rest }: TProps): React.JSX.Element {
	const { lang } = useLang();
	const Tag = (as ?? 'span') as React.ElementType;
	return (
		<Tag
			{...rest}
			className={className}
			dangerouslySetInnerHTML={{ __html: lang === 'de' ? de : en }}
		/>
	);
}
