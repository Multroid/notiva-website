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

import React, { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';

import { T, useLang, useT } from '@/components/notiva/lang-context';
import { MERCH, fmt, useBasket, type MerchId } from '@/components/notiva/basket-context';
import { sizesFor, variantFor } from '@/lib/fourthwall/catalogue';
import { NotivaHeader } from '@/components/notiva/notiva-header';
import { useNotivaTitle } from '@/components/notiva/use-notiva-title';
import { NotivaFooter } from '@/components/notiva/notiva-footer';
import { BasketBar } from '@/components/notiva/basket-bar';
import { ImageSlot } from '@/components/notiva/image-slot';
import { ImageZoom } from '@/components/notiva/image-zoom';

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
	const { add, catalogue, priceOf } = useBasket();

	const item = MERCH[slug];
	const copy = PRODUCT_COPY[slug];
	const entry = catalogue[slug];

	/* Sizes come from the live variants once the shop knows this product, and
	   from the local table until then — same picker either way. Memoised because
	   sizesFor() builds a fresh array and it is an effect dependency below. */
	const sizes = useMemo(() => sizesFor(entry), [entry]);

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

	/* Live unit price for the selected size; the local figure before the shop
	   exists. Everything the page prints in € comes from here. */
	const price = priceOf(slug, size);
	const soldOut =
		entry.source === 'fourthwall' &&
		(!entry.available || variantFor(entry, size)?.inStock === false);

	/* Fourthwall photography wins over the local slots the moment it exists —
	   the shop is where the real product shots live. */
	const fwMain = entry.images[0];
	const fwThumbs = entry.images.slice(1, 5);

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
								{/* Slots with a photograph carry real alt text; the ones
								    still waiting for a shot render the ✦ mark, which is
								    decorative — ImageSlot's alt default of '' covers it.
								    ImageZoom passes an empty slot straight through, so only
								    real photography becomes clickable. */}
								{/* A Fourthwall shot is by definition real photography, so it
								    always gets alt text: the API carries no per-image alt and
								    the product name is the honest description. */}
								<ImageZoom
									src={fwMain?.url ?? copy.gallery.main.src}
									alt={
										fwMain
											? t(copy.name.de, copy.name.en)
											: copy.gallery.main.alt
												? t(copy.gallery.main.alt.de, copy.gallery.main.alt.en)
												: ''
									}
								>
									<ImageSlot
										src={fwMain?.url ?? copy.gallery.main.src}
										alt={
											fwMain
												? t(copy.name.de, copy.name.en)
												: copy.gallery.main.alt
													? t(copy.gallery.main.alt.de, copy.gallery.main.alt.en)
													: ''
										}
										placeholder={copy.gallery.main.ph}
									/>
								</ImageZoom>
							</div>
							<div className="thumbs">
								{fwThumbs.length
									? fwThumbs.map((img) => (
											<div className="shot" key={img.url}>
												<ImageZoom
													src={img.url}
													alt={t(copy.name.de, copy.name.en)}
												>
													<ImageSlot
														src={img.url}
														alt={t(copy.name.de, copy.name.en)}
														placeholder={copy.gallery.main.ph}
														loading="lazy"
													/>
												</ImageZoom>
											</div>
										))
									: copy.gallery.thumbs.map((thumb, i) => (
											<div className="shot" key={i}>
												<ImageZoom
													src={thumb.src}
													alt={thumb.alt ? t(thumb.alt.de, thumb.alt.en) : ''}
												>
													<ImageSlot
														src={thumb.src}
														alt={thumb.alt ? t(thumb.alt.de, thumb.alt.en) : ''}
														placeholder={thumb.ph}
														loading="lazy"
													/>
												</ImageZoom>
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
								{fmt(price, lang)} <T de="inkl. MwSt." en="incl. VAT" />
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
									disabled={soldOut}
									onClick={() => add(slug, size, qty)}
								>
									{soldOut
										? t('Ausverkauft', 'Sold out')
										: `${shop.add} · ${fmt(price * qty, lang)}`}
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
							/* Same precedence as the main gallery: a Fourthwall shot beats
							   the local placeholder, and the ✦ mark is the last resort. */
							const thumb = catalogue[k]?.images[0]?.url ?? o.img;
							return (
								<div className="pcard" key={k}>
									<Link href={`/merch/${k}`}>
										<div className="ph">
											{thumb ? (
												/* eslint-disable-next-line @next/next/no-img-element */
												<img src={thumb} alt="" loading="lazy" decoding="async" />
											) : (
												<span className="mark">✦</span>
											)}
										</div>
										<div className="meta">
											<div className="n">{o[lang]}</div>
											<div className="pr">{fmt(priceOf(k), lang)}</div>
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
