'use client';

/* Port of Designs/Example designs/Notiva Design/Basket.html plus the
   initBasket() half of assets/notiva-shop.js (lines 183–250).

   Cross-links rewritten for the Next routes:
     Support%20Notiva.html#merch → /support#merch
     Merch <Item>.html           → /merch/<slug>

   The floating basket bar is deliberately not rendered here — the source
   refuses to build it whenever [data-basket-lines] is on the page
   (notiva-shop.js line 74), and BasketBar itself also bails on /basket. */

import React, { useState } from 'react';
import Link from 'next/link';

import '@/styles/notiva/page.css';
import '@/styles/notiva/shop.css';

import { useLang } from '@/components/notiva/lang-context';
import { MERCH, fmt, useBasket } from '@/components/notiva/basket-context';
import { NotivaHeader } from '@/components/notiva/notiva-header';
import { useNotivaTitle } from '@/components/notiva/use-notiva-title';
import { NotivaFooter } from '@/components/notiva/notiva-footer';
import { OverlayCard } from '@/components/notiva/overlay-card';

/* The subset of the T table in assets/notiva-shop.js (lines 17–30) that the
   basket page reads. Strings are verbatim. */
const SHOP_T = {
	de: {
		size: 'Größe',
		free: 'kostenlos',
		sub: 'Zwischensumme',
		ship: 'Versand',
		total: 'Gesamt',
		remove: 'Entfernen',
		more: 'Menge erhöhen',
		less: 'Menge verringern',
		needAll: 'Bitte Name, E-Mail und vollständige Adresse angeben.',
		close: 'Schließen',
		okT: 'Bestellung notiert.',
		okB: 'Wir bestätigen per E-Mail, sobald der Shop live ist.',
		okN: 'Abgebucht wird nichts, solange der Zahlungsdienstleister nicht angebunden ist.',
	},
	en: {
		size: 'Size',
		free: 'free',
		sub: 'Subtotal',
		ship: 'Shipping',
		total: 'Total',
		remove: 'Remove',
		more: 'Increase quantity',
		less: 'Decrease quantity',
		needAll: 'Please enter a name, an email and a complete address.',
		close: 'Close',
		okT: 'Order noted.',
		okB: 'We will confirm by email as soon as the shop is live.',
		okN: 'Nothing is charged until the payment provider is connected.',
	},
} as const;

const MAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

interface Delivery {
	name: string;
	mail: string;
	street: string;
	zip: string;
	city: string;
	country: string;
}

const EMPTY_DELIVERY: Delivery = {
	name: '',
	mail: '',
	street: '',
	zip: '',
	city: '',
	country: 'Deutschland',
};

export default function BasketPage(): React.JSX.Element {
	const { lang } = useLang();
	const { lines, setQty, clear, subtotal, shipping } = useBasket();
	const t = SHOP_T[lang];

	const [delivery, setDelivery] = useState<Delivery>(EMPTY_DELIVERY);
	const [error, setError] = useState(false);
	const [done, setDone] = useState(false);

	/* <html data-title-de/-en> — applyLang() rewrites document.title */
	useNotivaTitle('Notiva · Korb', 'Notiva · Basket');

	const field =
		(key: keyof Delivery) => (e: React.ChangeEvent<HTMLInputElement>) => {
			const v = e.target.value;
			setDelivery((prev) => ({ ...prev, [key]: v }));
		};

	function order() {
		const okMail = MAIL_RE.test(delivery.mail.trim());
		if (
			!delivery.name.trim() ||
			!okMail ||
			!delivery.street.trim() ||
			!delivery.zip.trim() ||
			!delivery.city.trim()
		) {
			setError(true);
			return;
		}
		setError(false);
		setDone(true);
		clear();
	}

	const total = subtotal + shipping;
	const isEmpty = lines.length === 0;

	return (
		<div className="notiva-shell nv-page nv-shop" lang={lang}>
			<NotivaHeader />

			<section>
				<div className="wrap">
					<Link className="crumb" href="/support#merch">
						{lang === 'de' ? '← Weiter einkaufen' : '← Keep shopping'}
					</Link>
					<div className="eyebrow" style={{ marginTop: 22 }}>
						{lang === 'de' ? 'Korb' : 'Basket'}
					</div>
					<h1>{lang === 'de' ? 'Dein Korb' : 'Your basket'}</h1>

					<div className="empty" hidden={!isEmpty}>
						<p>
							{lang === 'de'
								? 'Noch nichts im Korb.'
								: 'Nothing in the basket yet.'}
						</p>
						<Link className="btn btn-solid" href="/support#merch">
							{lang === 'de' ? 'Merch ansehen' : 'See the merch'}
						</Link>
					</div>

					<div hidden={isEmpty}>
						<div className="blines" data-basket-lines="">
							{lines.map((l, i) => {
								const it = MERCH[l.id];
								return (
									<div className="bline" key={`${l.id}|${l.size}|${i}`}>
										<div className="thumb">
											{it.img ? (
												// eslint-disable-next-line @next/next/no-img-element
												<img src={it.img} alt="" loading="lazy" decoding="async" />
											) : (
												'✦'
											)}
										</div>
										<div>
											<div className="nm">
												<Link href={`/merch/${it.slug}`}>{it[lang]}</Link>
											</div>
											<div className="vr">
												{(l.size ? `${t.size} ${l.size} · ` : '') +
													fmt(it.price, lang)}
											</div>
											<button
												type="button"
												className="rm"
												onClick={() => setQty(i, 0)}
											>
												{t.remove}
											</button>
										</div>
										<div className="rt">
											<div className="qty">
												<button
													type="button"
													aria-label={t.less}
													onClick={() => setQty(i, l.qty - 1)}
												>
													−
												</button>
												<output>{l.qty}</output>
												<button
													type="button"
													aria-label={t.more}
													onClick={() => setQty(i, l.qty + 1)}
												>
													+
												</button>
											</div>
											<div className="lp">{fmt(it.price * l.qty, lang)}</div>
										</div>
									</div>
								);
							})}
						</div>

						<div className="sum">
							<div className="r">
								<span>{t.sub}</span>
								<b>{fmt(subtotal, lang)}</b>
							</div>
							<div className="r">
								<span>{t.ship}</span>
								<b>{shipping ? fmt(shipping, lang) : t.free}</b>
							</div>
							<div className="r tot">
								<span>{t.total}</span>
								<b>{fmt(total, lang)}</b>
							</div>
						</div>

						<p
							className="fine"
							style={{ marginLeft: 'auto', textAlign: 'right', maxWidth: 420 }}
						>
							{lang === 'de'
								? 'Preise inklusive Mehrwertsteuer. Versand frei ab €60.'
								: 'Prices include VAT. Free shipping from €60.'}
						</p>

						<h2 style={{ marginTop: 'clamp(30px,4vw,48px)' }}>
							{lang === 'de' ? 'Lieferung' : 'Delivery'}
						</h2>

						<div className="co">
							<div className="field wide">
								<label htmlFor="co-name">{lang === 'de' ? 'Name' : 'Name'}</label>
								<input
									id="co-name"
									type="text"
									autoComplete="name"
									placeholder="Alex Weber"
									value={delivery.name}
									onChange={field('name')}
								/>
							</div>
							<div className="field wide">
								<label htmlFor="co-mail">
									{lang === 'de'
										? 'E-Mail für die Bestätigung'
										: 'Email for the confirmation'}
								</label>
								<input
									id="co-mail"
									type="email"
									autoComplete="email"
									placeholder={
										lang === 'de' ? 'du@beispiel.de' : 'you@example.com'
									}
									value={delivery.mail}
									onChange={field('mail')}
								/>
							</div>
							<div className="field wide">
								<label htmlFor="co-street">
									{lang === 'de'
										? 'Straße und Hausnummer'
										: 'Street and number'}
								</label>
								<input
									id="co-street"
									type="text"
									autoComplete="street-address"
									placeholder={
										lang === 'de' ? 'Beispielstraße 12' : 'Example Street 12'
									}
									value={delivery.street}
									onChange={field('street')}
								/>
							</div>
							<div className="field">
								<label htmlFor="co-zip">
									{lang === 'de' ? 'PLZ' : 'Postcode'}
								</label>
								<input
									id="co-zip"
									type="text"
									inputMode="numeric"
									autoComplete="postal-code"
									placeholder="10115"
									value={delivery.zip}
									onChange={field('zip')}
								/>
							</div>
							<div className="field">
								<label htmlFor="co-city">{lang === 'de' ? 'Ort' : 'City'}</label>
								<input
									id="co-city"
									type="text"
									autoComplete="address-level2"
									placeholder="Berlin"
									value={delivery.city}
									onChange={field('city')}
								/>
							</div>
							<div className="field wide">
								<label htmlFor="co-country">
									{lang === 'de' ? 'Land' : 'Country'}
								</label>
								<input
									id="co-country"
									type="text"
									autoComplete="country-name"
									value={delivery.country}
									onChange={field('country')}
								/>
							</div>
							<button
								className="btn btn-solid cobtn"
								type="button"
								onClick={order}
							>
								{lang === 'de' ? 'Bestellung abschicken' : 'Place the order'}
							</button>
						</div>

						<p className="err" id="co-err" hidden={!error}>
							{t.needAll}
						</p>

						<p className="fine">
							{lang === 'de'
								? 'Diese Seite ist ein Entwurf: es wird keine Zahlung ausgelöst und keine Adresse gespeichert. Sobald der Shop live ist, bestätigen wir jede Bestellung per E-Mail.'
								: 'This page is a draft: no payment is taken and no address is stored. Once the shop is live we confirm every order by email.'}
						</p>
					</div>
				</div>
			</section>

			<OverlayCard
				open={done}
				onClose={() => setDone(false)}
				title={t.okT}
				body={t.okB}
				note={t.okN}
				closeLabel={t.close}
			/>

			<NotivaFooter
				left={{ de: 'Notiva · Deutschland', en: 'Notiva · Germany' }}
				right={{
					de: 'Preise inklusive Mehrwertsteuer. Versand nach DE und in die EU.',
					en: 'Prices include VAT. Shipping within Germany and the EU.',
				}}
			/>
		</div>
	);
}
