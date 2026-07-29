'use client';

/* Merch PDP — port of Designs/Example designs/Notiva Design/Merch Hoodie.html
   (and its seven siblings, which share the same template). Behaviour comes from
   assets/notiva-shop.js initProduct(), lines 125–180:
     • default size = sizes[floor(sizes.length / 2)]  → "L" for the hoodie
     • size buttons carry aria-pressed
     • qty stepper clamped to 1…99, step buttons get aria-labels
     • add button label = `${t.add} · ${fmt(price * qty)}`, repainted on
       `notiva:lang` — here simply a render of `lang`
     • the size row is hidden entirely for products without sizes
     • the "Weiter im Shop" rail = the first 4 catalogue entries minus the
       current product, repainted on language change
   Merch Hoodie.html has no inline <style>: every class below is selected by
   src/styles/notiva/shop.css / page.css, so the markup must keep them. */

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

import { T, useLang, useT } from '@/components/notiva/lang-context';
import { MERCH, fmt, useBasket, type MerchId } from '@/components/notiva/basket-context';
import { NotivaHeader } from '@/components/notiva/notiva-header';
import { useNotivaTitle } from '@/components/notiva/use-notiva-title';
import { NotivaFooter } from '@/components/notiva/notiva-footer';
import { BasketBar } from '@/components/notiva/basket-bar';
import { ImageSlot } from '@/components/notiva/image-slot';

import {
	FACT_MATERIAL_LABEL,
	FACT_PRODUCTION,
	FACT_SHIPPING,
	FINE,
	MERCH_ORDER,
	PRODUCT_COPY,
} from './product-copy';

/* The subset of the shop T table (assets/notiva-shop.js lines 17–30) this
   page uses. */
const SHOP_T = {
	de: {
		add: 'In den Korb',
		size: 'Größe',
		qty: 'Menge',
		more: 'Menge erhöhen',
		less: 'Menge verringern',
	},
	en: {
		add: 'Add to basket',
		size: 'Size',
		qty: 'Quantity',
		more: 'Increase quantity',
		less: 'Decrease quantity',
	},
} as const;

export function MerchProduct({ slug }: { slug: MerchId }): React.JSX.Element {
	const { lang } = useLang();
	const t = useT();
	const { add } = useBasket();

	const item = MERCH[slug];
	const copy = PRODUCT_COPY[slug];
	const sizes = item.sizes;

	/* initProduct(): `var size = it.sizes ? it.sizes[Math.floor(it.sizes.length / 2)] : ''` */
	const [size, setSize] = useState<string>(() =>
		sizes ? sizes[Math.floor(sizes.length / 2)] : ''
	);
	const [qty, setQty] = useState(1);

	/* Reset when the route changes product (the [slug] segment reuses this tree). */
	useEffect(() => {
		setSize(sizes ? sizes[Math.floor(sizes.length / 2)] : '');
		setQty(1);
	}, [slug, sizes]);

	/* applyLang(): document.title = <html data-title-{lang}>, which is
	   "Notiva · " + the catalogue name in both design files. */
	useNotivaTitle(`Notiva · ${item.de}`, `Notiva · ${item.en}`);

	const shop = SHOP_T[lang];
	const step = (d: number) => setQty((q) => Math.max(1, Math.min(99, q + d)));

	/* Object.keys(M).filter(k => k !== id).slice(0, 4) */
	const rail = MERCH_ORDER.filter((k) => k !== slug).slice(0, 4);

	return (
		<div className="notiva-shell nv-page nv-shop" lang={lang}>
			<NotivaHeader />

			<section>
				<div className="wrap">
					<Link className="crumb" href="/support#merch">
						{t('← Zurück zum Merch', '← Back to the merch')}
					</Link>

					<div className="pdp" data-product={slug}>
						<div className="gal">
							<div className="shot">
								<ImageSlot
									src={copy.gallery.main.src}
									placeholder={copy.gallery.main.ph}
								/>
							</div>
							<div className="thumbs">
								{copy.gallery.thumbs.map((thumb, i) => (
									<div className="shot" key={i}>
										<ImageSlot src={thumb.src} placeholder={thumb.ph} />
									</div>
								))}
							</div>
						</div>

						<div className="info">
							<div className="eyebrow">
								<T de="Merch" en="Merch" />
							</div>
							<h1>{t(copy.name.de, copy.name.en)}</h1>
							<div className="price">
								{fmt(item.price, lang)}{' '}
								<T de="inkl. MwSt." en="incl. VAT" />
							</div>
							<T as="p" className="desc" de={copy.desc.de} en={copy.desc.en} />

							<div className="opt" hidden={!sizes}>
								<div className="lbl">{shop.size}</div>
								<div className="sizes">
									{sizes?.map((s) => (
										<button
											key={s}
											type="button"
											data-size={s}
											aria-pressed={s === size}
											onClick={() => setSize(s)}
										>
											{s}
										</button>
									))}
								</div>
							</div>

							<div className="opt">
								<div className="lbl">{shop.qty}</div>
								<div className="qty">
									<button
										type="button"
										aria-label={shop.less}
										onClick={() => step(-1)}
									>
										−
									</button>
									<output>{qty}</output>
									<button
										type="button"
										aria-label={shop.more}
										onClick={() => step(1)}
									>
										+
									</button>
								</div>
							</div>

							<div className="addrow">
								<button
									className="btn btn-solid"
									type="button"
									onClick={() => add(slug, size, qty)}
								>
									{`${shop.add} · ${fmt(item.price * qty, lang)}`}
								</button>
								<Link className="btn btn-ghost" href="/basket">
									{t('Zum Korb', 'Go to basket')}
								</Link>
							</div>

							<ul className="specs">
								{copy.specs.map((spec, i) => (
									<T as="li" key={i} de={spec.de} en={spec.en} />
								))}
							</ul>

							<dl className="facts">
								<div className="f">
									<T
										as="dt"
										de={FACT_MATERIAL_LABEL.de}
										en={FACT_MATERIAL_LABEL.en}
									/>
									<T as="dd" de={copy.material.de} en={copy.material.en} />
								</div>
								<div className="f">
									<T
										as="dt"
										de={FACT_PRODUCTION.label.de}
										en={FACT_PRODUCTION.label.en}
									/>
									<T
										as="dd"
										de={FACT_PRODUCTION.value.de}
										en={FACT_PRODUCTION.value.en}
									/>
								</div>
								<div className="f">
									<T
										as="dt"
										de={FACT_SHIPPING.label.de}
										en={FACT_SHIPPING.label.en}
									/>
									<T
										as="dd"
										de={FACT_SHIPPING.value.de}
										en={FACT_SHIPPING.value.en}
									/>
								</div>
							</dl>

							<T as="p" className="fine" de={FINE.de} en={FINE.en} />
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="wrap">
					<div className="eyebrow">
						<T de="Weiter im Shop" en="More in the shop" />
					</div>
					<h2>{t('Anderer Merch', 'Other merch')}</h2>
					<div className="shopgrid">
						{rail.map((k) => {
							const o = MERCH[k];
							return (
								<div className="pcard" key={k}>
									<Link href={`/merch/${k}`}>
										<div className="ph">
											{o.img ? (
												/* eslint-disable-next-line @next/next/no-img-element */
												<img src={o.img} alt="" />
											) : (
												<span className="mark">✦</span>
											)}
										</div>
										<div className="meta">
											<div className="n">{o[lang]}</div>
											<div className="pr">{fmt(o.price, lang)}</div>
										</div>
									</Link>
								</div>
							);
						})}
					</div>
				</div>
			</section>

			<NotivaFooter
				left={{ de: 'Notiva · Deutschland', en: 'Notiva · Germany' }}
				right={{
					de: 'Preise inklusive Mehrwertsteuer. Versand nach DE und in die EU.',
					en: 'Prices include VAT. Shipping within Germany and the EU.',
				}}
			/>

			<BasketBar />
		</div>
	);
}
