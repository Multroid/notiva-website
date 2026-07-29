/* Per-product PDP copy for /merch/[slug].
   Every string below is taken verbatim (DE + EN) from the design sources
   Designs/Example designs/Notiva Design/Merch {Shirt,Hoodie,Cap,Tote,Pin,
   Stickers,Sleeve,Plush}.html — the eight files share one template, so only
   name / price / desc / specs / material differ. `Herstellung` + `Versand` +
   the fine print are identical in all eight (same print-on-demand partner),
   so they live here once as shared constants.

   This module is deliberately free of the 'use client' boundary: the server
   page reads `name` for the document title, and `MERCH_ORDER` for
   generateStaticParams(). `name` mirrors MERCH[slug] in
   src/components/notiva/basket-context.tsx character for character. */

import type { MerchId } from '@/components/notiva/basket-context';

export interface Bi {
	de: string;
	en: string;
}

export interface Slot {
	/** Placeholder text of the design's <image-slot> (DE only in the source). */
	ph: string;
	src?: string;
	/** Alt text for the slots that actually have a photograph. Empty slots render
	    the ✦ placeholder mark, which is decorative and takes alt="". */
	alt?: Bi;
}

export interface ProductCopy {
	/** = MERCH[slug].de / .en; also the <h1> and the document title suffix. */
	name: Bi;
	desc: Bi;
	specs: Bi[];
	/** First row of <dl class="facts"> — the only per-product fact. */
	material: Bi;
	gallery: { main: Slot; thumbs: [Slot, Slot, Slot] };
}

/** Catalogue order of assets/notiva-shop.js — drives generateStaticParams()
    and the "Weiter im Shop" rail (first 4 entries minus the current one). */
export const MERCH_ORDER: MerchId[] = [
	'shirt',
	'hoodie',
	'cap',
	'tote',
	'pin',
	'stickers',
	'sleeve',
	'plush',
];

export function isMerchSlug(v: string): v is MerchId {
	return (MERCH_ORDER as string[]).includes(v);
}

/* ── shared rows ─────────────────────────────────────────────── */

export const FACT_MATERIAL_LABEL: Bi = { de: 'Material', en: 'Material' };

export const FACT_PRODUCTION: { label: Bi; value: Bi } = {
	label: { de: 'Herstellung', en: 'Production' },
	value: {
		de: 'Print-on-Demand-Partner in der EU, auf Bestellung gefertigt.',
		en: 'Print-on-demand partner in the EU, made to order.',
	},
};

export const FACT_SHIPPING: { label: Bi; value: Bi } = {
	label: { de: 'Versand', en: 'Shipping' },
	value: {
		de: 'Deutschland und EU, 5 bis 8 Werktage. Frei ab €60.',
		en: 'Germany and the EU, 5 to 8 working days. Free from €60.',
	},
};

export const FINE: Bi = {
	de: 'Bestellungen sind bis zum Launch unverbindlich. Abgebucht wird nichts, solange der Zahlungsdienstleister nicht angebunden ist.',
	en: 'Orders are non-binding until launch. Nothing is charged while the payment provider is not connected.',
};

/* ── the eight products ──────────────────────────────────────── */

export const PRODUCT_COPY: Record<MerchId, ProductCopy> = {
	shirt: {
		name: { de: 'T-Shirt ✦', en: 'T-shirt ✦' },
		desc: {
			de: 'Schweres Bio-Baumwoll-Shirt in Off-White, das ✦ klein auf der Brust. In der EU auf Bestellung gedruckt, nicht auf Halde produziert.',
			en: 'Heavy organic-cotton shirt in off-white with a small ✦ on the chest. Printed to order in the EU, never for a warehouse.',
		},
		specs: [
			{ de: '180 g/m² Bio-Baumwolle, mittelschwer', en: '180 gsm organic cotton, midweight' },
			{ de: 'Unisex-Schnitt, S bis XXL', en: 'Unisex fit, S to XXL' },
			{ de: 'Siebdruck, waschfest bei 40 Grad', en: 'Screen print, holds at 40 degrees' },
		],
		material: {
			de: '180 g/m² Bio-Baumwolle, GOTS-zertifiziert',
			en: '180 gsm organic cotton, GOTS certified',
		},
		gallery: {
			main: {
				ph: 'Foto: T-Shirt ✦',
				src: '/notiva/novi/merch-shirt.webp',
				alt: {
					de: 'Notiva T-Shirt ✦ aus Bio-Baumwolle in Off-White, mit dem ✦ klein auf der Brust',
					en: 'Notiva T-shirt ✦ in off-white organic cotton, with the ✦ small on the chest',
				},
			},
			thumbs: [
				{ ph: 'Foto: Vorne' },
				{ ph: 'Foto: Hinten' },
				{
					ph: 'Foto: Novi trägt es',
					src: '/notiva/novi/tshirt.webp',
					alt: {
						de: 'Novi trägt das Notiva T-Shirt ✦',
						en: 'Novi wearing the Notiva T-shirt ✦',
					},
				},
			],
		},
	},

	hoodie: {
		name: { de: 'Hoodie ✦', en: 'Hoodie ✦' },
		desc: {
			de: 'Ungefütterter Hoodie in Notiva-Blau mit gesticktem ✦. Weiter Schnitt, hält einen Winter im Homeoffice aus.',
			en: 'Unlined hoodie in Notiva blue with an embroidered ✦. Roomy cut, built for a cold home office.',
		},
		specs: [
			{
				de: '320 g/m² Baumwoll-Polyester-Mix',
				en: '320 gsm cotton-polyester blend',
			},
			{ de: 'Unisex, S bis XXL', en: 'Unisex, S to XXL' },
			{ de: 'Kängurutasche, gerippte Bündchen', en: 'Kangaroo pocket, ribbed cuffs' },
		],
		material: {
			de: '320 g/m² Baumwoll-Polyester-Mix, gebürstet innen',
			en: '320 gsm cotton-polyester blend, brushed inside',
		},
		gallery: {
			main: { ph: 'Foto: Hoodie ✦' },
			thumbs: [{ ph: 'Foto: Vorne' }, { ph: 'Foto: Kapuze' }, { ph: 'Foto: Detail ✦' }],
		},
	},

	cap: {
		name: { de: 'Cap', en: 'Cap' },
		desc: {
			de: 'Sechspanel-Cap in Paper-Off-White, das ✦ gestickt statt gedruckt. Verstellbar, passt fast jedem Kopf.',
			en: 'Six-panel cap in paper off-white, the ✦ embroidered rather than printed. Adjustable, fits almost every head.',
		},
		specs: [
			{ de: 'Baumwoll-Twill, unstrukturiert', en: 'Cotton twill, unstructured' },
			{ de: 'Einheitsgröße, Metallverschluss', en: 'One size, metal closure' },
			{ de: '✦ gestickt, nicht gedruckt', en: '✦ embroidered, not printed' },
		],
		material: { de: 'Baumwoll-Twill, ungefüttert', en: 'Cotton twill, unlined' },
		gallery: {
			main: {
				src: '/notiva/merch/cap.webp',
				alt: {
					de: 'Novi trägt die Notiva-Cap und das ✦ T-Shirt',
					en: 'Novi wearing the Notiva cap and the ✦ T-shirt',
				},
				ph: 'Foto: Cap',
			},
			thumbs: [{ ph: 'Foto: Vorne' }, { ph: 'Foto: Seite' }, { ph: 'Foto: Verschluss' }],
		},
	},

	tote: {
		name: { de: 'Tote Bag', en: 'Tote bag' },
		desc: {
			de: 'Tote Bag aus schwerem Canvas mit dem ✦ auf der Seite. Passt für Laptop, Aktenordner und einen Monat Belege.',
			en: 'Heavy canvas tote with the ✦ on the side. Fits a laptop, a folder and a month of receipts.',
		},
		specs: [
			{ de: '280 g/m² Baumwoll-Canvas', en: '280 gsm cotton canvas' },
			{ de: '38 × 42 cm, lange Griffe', en: '38 × 42 cm, long handles' },
			{ de: 'Waschbar bei 30 Grad', en: 'Machine washable at 30 degrees' },
		],
		material: {
			de: '280 g/m² Baumwoll-Canvas, ungefüttert',
			en: '280 gsm cotton canvas, unlined',
		},
		gallery: {
			main: { ph: 'Foto: Tote Bag' },
			thumbs: [{ ph: 'Foto: Vorne' }, { ph: 'Foto: Getragen' }, { ph: 'Foto: Innen' }],
		},
	},

	pin: {
		name: { de: 'Emaille-Pin ✦', en: 'Enamel pin ✦' },
		desc: {
			de: 'Der ✦ als Emaille-Pin in Notiva-Blau. Harte Emaille, keine weiche Farbe, die nach einem Jahr abblättert.',
			en: 'The ✦ as an enamel pin in Notiva blue. Hard enamel, not the soft kind that chips within a year.',
		},
		specs: [
			{ de: '22 mm, harte Emaille', en: '22 mm, hard enamel' },
			{ de: 'Messing, blau lackiert', en: 'Brass, blue finish' },
			{ de: 'Schmetterlingsverschluss hinten', en: 'Butterfly clutch on the back' },
		],
		material: { de: 'Messing mit harter Emaille', en: 'Brass with hard enamel' },
		gallery: {
			main: { ph: 'Foto: Emaille-Pin ✦' },
			thumbs: [{ ph: 'Foto: Vorne' }, { ph: 'Foto: Am Rucksack' }, { ph: 'Foto: Rückseite' }],
		},
	},

	stickers: {
		name: { de: 'Sticker-Set', en: 'Sticker set' },
		desc: {
			de: 'Sieben Novi-Sticker in verschiedenen Posen, wetterfest. Für Laptop, Flasche oder den Ordner mit den Bescheiden.',
			en: 'Seven Novi stickers in different poses, weatherproof. For a laptop, a bottle, or the folder your tax notices live in.',
		},
		specs: [
			{ de: '7 Sticker, 5 bis 8 cm', en: '7 stickers, 5 to 8 cm' },
			{ de: 'Wetterfeste Vinylfolie, matt', en: 'Weatherproof matte vinyl' },
			{ de: 'Rückstandsfrei ablösbar', en: 'Peels off without residue' },
		],
		material: { de: 'Matte Vinylfolie, UV-beschichtet', en: 'Matte vinyl, UV coated' },
		gallery: {
			main: {
				ph: 'Foto: Sticker-Set',
				src: '/notiva/novi/sticker-pack.webp',
				alt: {
					de: 'Notiva Sticker-Set: sieben wetterfeste Novi-Sticker in verschiedenen Posen',
					en: 'Notiva sticker set: seven weatherproof Novi stickers in different poses',
				},
			},
			thumbs: [{ ph: 'Foto: Das Set' }, { ph: 'Foto: Am Laptop' }, { ph: 'Foto: Einzeln' }],
		},
	},

	sleeve: {
		name: { de: 'Laptop-Sleeve', en: 'Laptop sleeve' },
		desc: {
			de: 'Gepolsterte Laptop-Hülle aus gefilzter Wolle mit gesticktem ✦. Für 13 bis 14 Zoll, passt in jede Tasche.',
			en: 'Padded laptop sleeve in felted wool with an embroidered ✦. For 13 to 14 inch, fits in any bag.',
		},
		specs: [
			{ de: 'Für 13 bis 14 Zoll', en: 'For 13 to 14 inch' },
			{ de: 'Gefilzte Wolle, gepolstert', en: 'Felted wool, padded' },
			{ de: 'YKK-Reißverschluss', en: 'YKK zip' },
		],
		material: {
			de: 'Gefilzte Wolle mit Schaumpolsterung',
			en: 'Felted wool with foam padding',
		},
		gallery: {
			main: { ph: 'Foto: Laptop-Sleeve' },
			thumbs: [
				{ ph: 'Foto: Vorne' },
				{ ph: 'Foto: Mit Laptop' },
				{ ph: 'Foto: Reißverschluss' },
			],
		},
	},

	plush: {
		name: { de: 'Novi-Plüschtier', en: 'Novi plush' },
		desc: {
			de: 'Novi als Plüschfigur, 24 cm hoch. Sitzt neben dem Monitor, während der echte Novi im Browser arbeitet.',
			en: 'Novi as a plush figure, 24 cm tall. Sits next to your monitor while the real Novi works in the browser.',
		},
		specs: [
			{ de: '24 cm, weiche Mikrofaser', en: '24 cm, soft microfibre' },
			{ de: 'Handwäsche, nicht in den Trockner', en: 'Hand wash, no tumble dryer' },
			{ de: 'Geeignet ab 3 Jahren', en: 'Suitable from age 3' },
		],
		material: { de: 'Mikrofaser mit Polyesterfüllung', en: 'Microfibre with polyester filling' },
		gallery: {
			main: { ph: 'Foto: Novi-Plüschtier' },
			thumbs: [
				{ ph: 'Foto: Vorne' },
				{ ph: 'Foto: Am Schreibtisch' },
				{ ph: 'Foto: Seite' },
			],
		},
	},
};
