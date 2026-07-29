/* Site-wide Open Graph card (1200×630), generated at build time by Next's
   built-in ImageResponse — no binary asset to maintain, no extra dependency.

   This file lives at the root of app/, so every route that does not ship its
   own opengraph-image inherits it. Twitter has no twitter-image.tsx on
   purpose: Next's metadata resolver falls back to the OG image for
   `twitter:image`, so one card serves both.

   ImageResponse renders through Satori, which supports only a subset of CSS:
   flexbox only (no grid, no float), every element with more than one child
   needs an explicit `display: 'flex'`, and only the Latin Noto Sans that
   @vercel/og bundles is available offline. Hence the faux-bold via
   -webkit-text-stroke and the deliberate absence of the ✦ glyph, which is not
   in that font's coverage. */

import { ImageResponse } from 'next/og';

export const runtime = 'nodejs';

export const alt =
	'Notiva — Nie wieder Angst vor dem Finanzamt. Das KI-native Finanz-Backoffice für Selbstständige in Deutschland.';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const BLUE = '#0047BA';
const PAPER = '#FAFAF8';
const ORANGE = '#F05627';

/* public/notiva/notiva-logo-chip.svg, inverted for the blue field: paper tile,
   blue glyph. Inlined as a data URI because Satori cannot read from /public. */
const CHIP = `<svg xmlns="http://www.w3.org/2000/svg" width="600" height="600" viewBox="0 0 600 600"><rect width="600" height="600" rx="136" fill="${PAPER}"/><path d="M424.407 407.759V270.761C424.407 265.961 421.598 261.605 417.228 259.628L248.372 183.094C244.196 181.2 239.306 181.803 235.713 184.661L179.613 229.282C176.699 231.599 175 235.122 175 238.847V397.785C175 408.605 188.019 414.092 195.76 406.531L248.552 355.002C252.166 351.471 257.576 350.535 262.175 352.63L407.094 418.878C415.189 422.582 424.4 416.665 424.4 407.759H424.407Z" fill="${BLUE}"/><path d="M424.407 236.544V200.816C424.407 189.322 415.085 180 403.591 180H305.533" fill="${BLUE}"/></svg>`;

const CHIP_SRC = `data:image/svg+xml;base64,${Buffer.from(CHIP).toString('base64')}`;

export default async function OpengraphImage() {
	return new ImageResponse(
		(
			<div
				style={{
					width: '100%',
					height: '100%',
					display: 'flex',
					flexDirection: 'column',
					justifyContent: 'space-between',
					padding: '72px 80px',
					backgroundColor: BLUE,
					backgroundImage:
						'radial-gradient(1000px 620px at 88% -8%, rgba(240,86,39,0.34), rgba(240,86,39,0) 62%)',
					color: PAPER,
					fontFamily: '"Noto Sans"',
				}}
			>
				{/* header */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<div style={{ display: 'flex', alignItems: 'center' }}>
						<img src={CHIP_SRC} width={76} height={76} alt="" />
						<div
							style={{
								marginLeft: 24,
								fontSize: 44,
								letterSpacing: 14,
								WebkitTextStroke: `1.4px ${PAPER}`,
							}}
						>
							NOTIVA
						</div>
					</div>
					<div
						style={{
							fontSize: 26,
							letterSpacing: 1,
							color: 'rgba(250,250,248,0.82)',
						}}
					>
						Für Selbstständige in Deutschland
					</div>
				</div>

				{/* headline */}
				<div style={{ display: 'flex', flexDirection: 'column' }}>
					<div
						style={{
							display: 'flex',
							width: 104,
							height: 10,
							borderRadius: 5,
							backgroundColor: ORANGE,
							marginBottom: 28,
						}}
					/>
					<div
						style={{
							display: 'flex',
							flexDirection: 'column',
							fontSize: 80,
							lineHeight: 1.1,
							letterSpacing: -2,
							WebkitTextStroke: `1.6px ${PAPER}`,
						}}
					>
						<div style={{ display: 'flex' }}>Nie wieder Angst</div>
						<div style={{ display: 'flex' }}>vor dem Finanzamt</div>
					</div>
					<div
						style={{
							marginTop: 30,
							fontSize: 31,
							letterSpacing: -0.2,
							color: 'rgba(250,250,248,0.82)',
						}}
					>
						Berechnet, nie geraten. Jede Empfehlung mit Beleg.
					</div>
				</div>

				{/* footer */}
				<div
					style={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'space-between',
					}}
				>
					<div
						style={{
							fontSize: 34,
							letterSpacing: 1,
							WebkitTextStroke: `0.8px ${PAPER}`,
						}}
					>
						notiva.de
					</div>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							padding: '12px 28px',
							borderRadius: 999,
							backgroundColor: ORANGE,
							color: PAPER,
							fontSize: 28,
							letterSpacing: 1,
						}}
					>
						Launch 2026
					</div>
				</div>
			</div>
		),
		{ ...size },
	);
}
