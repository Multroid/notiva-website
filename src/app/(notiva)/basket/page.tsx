'use client';

/* Port of Designs/Example designs/Notiva Design/Basket.html plus the
   initBasket() half of assets/notiva-shop.js (lines 183–250).

   Cross-links rewritten for the Next routes:
     Support%20Notiva.html#merch → /support#merch
     Merch <Item>.html           → /merch/<slug>

   The floating basket bar is deliberately not rendered here — the source
   refuses to build it whenever [data-basket-lines] is on the page
   (notiva-shop.js line 74), and BasketBar itself also bails on /basket.

   WHERE THE DESIGN'S CHECKOUT FORM WENT
   The mock had a name/email/address form and a "Bestellung notiert" overlay.
   Both are gone: with Fourthwall there is no Notiva-side checkout to fill in.
   Fourthwall collects the address, takes the payment, computes tax and shipping
   and sends the confirmation, so the page ends at one button that turns this
   basket into a Fourthwall cart and leaves. Nothing about the layout above that
   button changed. */

import React, { useState, useTransition } from 'react';
import Link from 'next/link';

import '@/styles/notiva/page.css';
import '@/styles/notiva/shop.css';

import { useLang } from '@/components/notiva/lang-context';
import { MERCH, fmt, useBasket } from '@/components/notiva/basket-context';
import { startCheckout } from '@/lib/fourthwall/checkout-action';
import { NotivaHeader } from '@/components/notiva/notiva-header';
import { useNotivaTitle } from '@/components/notiva/use-notiva-title';
import { NotivaFooter } from '@/components/notiva/notiva-footer';
import { OverlayCard } from '@/components/notiva/overlay-card';

/* The subset of the T table in assets/notiva-shop.js (lines 17–30) that the
   basket page reads, plus the strings the Fourthwall handoff needs. Strings
   carried over from the design are verbatim. */
const SHOP_T = {
	de: {
		size: 'Größe',
		free: 'kostenlos',
		sub: 'Zwischensumme',
		ship: 'Versand (geschätzt)',
		total: 'Gesamt',
		remove: 'Entfernen',
		more: 'Menge erhöhen',
		less: 'Menge verringern',
		close: 'Schließen',
		checkout: 'Zur Kasse',
		checkoutBusy: 'Einen Moment …',
		fine: 'Preise inklusive Mehrwertsteuer. Versand und Steuer werden an der Kasse endgültig berechnet.',
		leaving:
			'Die Kasse liegt bei Fourthwall, unserem Shop-Partner: dort gibst du Adresse und Zahlung ein, von dort kommt die Bestätigung.',
		offT: 'Der Shop ist noch nicht offen.',
		offB: 'Die Kasse wird angebunden, sobald der Shop live ist. Dein Korb bleibt bis dahin gespeichert.',
		offN: 'Es wird nichts abgebucht und keine Adresse gespeichert.',
		errT: 'Das hat nicht geklappt.',
		errB: 'Die Kasse war gerade nicht erreichbar. Versuch es bitte gleich noch einmal.',
		errN: 'Dein Korb ist unverändert, abgebucht wurde nichts.',
		goneT: 'Der Korb ist nicht mehr aktuell.',
		goneB: 'Diese Artikel gibt es so nicht mehr. Bitte leg sie noch einmal in den Korb.',
		goneN: 'Abgebucht wurde nichts.',
	},
	en: {
		size: 'Size',
		free: 'free',
		sub: 'Subtotal',
		ship: 'Shipping (estimate)',
		total: 'Total',
		remove: 'Remove',
		more: 'Increase quantity',
		less: 'Decrease quantity',
		close: 'Close',
		checkout: 'Go to checkout',
		checkoutBusy: 'One moment …',
		fine: 'Prices include VAT. Shipping and tax are calculated finally at checkout.',
		leaving:
			'Checkout runs on Fourthwall, our shop partner: you enter your address and payment there, and the confirmation comes from them.',
		offT: 'The shop is not open yet.',
		offB: 'Checkout gets connected once the shop is live. Your basket is kept until then.',
		offN: 'Nothing is charged and no address is stored.',
		errT: 'That did not work.',
		errB: 'Checkout was not reachable just now. Please try again in a moment.',
		errN: 'Your basket is unchanged and nothing was charged.',
		goneT: 'This basket is out of date.',
		goneB: 'These items are no longer available in this form. Please add them again.',
		goneN: 'Nothing was charged.',
	},
} as const;

type Problem = 'unconfigured' | 'unavailable' | 'failed';

export default function BasketPage(): React.JSX.Element {
	const { lang } = useLang();
	const { lines, setQty, subtotal, shipping, priceOf, catalogue, checkoutLines } =
		useBasket();
	const t = SHOP_T[lang];

	const [problem, setProblem] = useState<Problem | null>(null);
	const [pending, startTransition] = useTransition();

	/* <html data-title-de/-en> — applyLang() rewrites document.title */
	useNotivaTitle('Notiva · Korb', 'Notiva · Basket');

	function checkout() {
		const items = checkoutLines();
		if (!items.length) {
			/* Nothing resolved to a live variant: either no shop is configured yet,
			   or the basket outlived the products in it. */
			setProblem(catalogue.shirt.source === 'local' ? 'unconfigured' : 'unavailable');
			return;
		}
		startTransition(async () => {
			const result = await startCheckout(items);
			if (result.ok) {
				/* Hard navigation on purpose — the destination is Fourthwall's
				   domain, not a Next route. The basket is deliberately NOT cleared:
				   checkout can still be abandoned, and Fourthwall owns the cart from
				   here, so the only safe local state is "unchanged". */
				window.location.href = result.url;
				return;
			}
			setProblem(result.reason === 'empty' ? 'unavailable' : result.reason);
		});
	}

	const total = subtotal + shipping;
	const isEmpty = lines.length === 0;

	const overlay =
		problem === 'unconfigured'
			? { title: t.offT, body: t.offB, note: t.offN }
			: problem === 'unavailable'
				? { title: t.goneT, body: t.goneB, note: t.goneN }
				: { title: t.errT, body: t.errB, note: t.errN };

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
								const unit = priceOf(l.id, l.size);
								const thumb = catalogue[l.id]?.images[0]?.url ?? it.img;
								return (
									<div className="bline" key={`${l.id}|${l.size}|${i}`}>
										<div className="thumb">
											{thumb ? (
												// eslint-disable-next-line @next/next/no-img-element
												<img src={thumb} alt="" loading="lazy" decoding="async" />
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
													fmt(unit, lang)}
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
											<div className="lp">{fmt(unit * l.qty, lang)}</div>
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
							{t.fine}
						</p>

						<div className="co">
							<button
								className="btn btn-solid cobtn"
								type="button"
								disabled={pending}
								onClick={checkout}
							>
								{pending ? t.checkoutBusy : `${t.checkout} · ${fmt(total, lang)}`}
							</button>
						</div>

						<p className="fine">{t.leaving}</p>
					</div>
				</div>
			</section>

			<OverlayCard
				open={problem !== null}
				onClose={() => setProblem(null)}
				title={overlay.title}
				body={overlay.body}
				note={overlay.note}
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
