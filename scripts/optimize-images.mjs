#!/usr/bin/env node
/**
 * optimize-images.mjs — turn the oversized PNGs in public/notiva into web-sized WebP.
 *
 * Why this exists: next.config.ts sets `images: { unoptimized: true }` (Amplify has no
 * Next image optimizer), and every Notiva surface renders a plain <img>. Nothing resizes
 * or re-encodes at request time, so the byte size on disk is the byte size on the wire.
 *
 * Every target below is derived from the CSS that actually renders the file — the rule is
 * quoted next to it — sized at ~2x the largest CSS pixel box for retina. Transparency is
 * preserved (the Novi art and the screenshots are cut-outs on light backgrounds).
 *
 *   npm run optimize:images            convert, keep the source PNGs
 *   npm run optimize:images -- --prune convert, then delete the superseded PNGs
 *
 * Re-runnable: once the PNGs have been pruned the entries report `source pruned` and are
 * skipped, so the script stays safe to run in CI or after dropping a new master PNG in.
 */

import { createRequire } from 'node:module';
import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const sharp = require('sharp');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = path.join(ROOT, 'public');

/**
 * @typedef {object} Target
 * @property {string}  file      path under public/, always a .png
 * @property {number} [width]    max output width in px (omit to keep the source width)
 * @property {number} [height]   max output height in px (omit to keep the source height)
 * @property {number}  quality   webp quality
 * @property {boolean} [lossless]
 * @property {string}  why       the CSS rule / display box that fixes the target size
 */

/** @type {Target[]} */
const TARGETS = [
	/* ── Novi character poses ────────────────────────────────────────────────
	   All eleven masters are 1200x1000 (ratio 1.2) and are interchangeable —
	   novi.tsx swaps them by name at runtime — so they get one shared size.
	   The largest box any pose ever renders into is the 404 hero:
	     not-found.css  .nv-404 .nf img { height: clamp(150px,22vw,264px); width:auto }
	   264px tall x 317px wide, so 2x = 528 x 634 -> width 640 covers every use:
	     coming-soon.css .stagewrap>img  height: calc(var(--pad)*1.2) -> max 182px
	     for-investors.css .novi-cta img height: clamp(150px,15vw,196px)
	     support.css .novi-hero img      height: clamp(108px,12vw,164px)
	     support.css .novi-react img     height: clamp(104px,10vw,138px)
	     support.css .novi-thanks img    height: clamp(92px,8vw,124px)
	     coming-soon.css .brief>img 62px / .pbrief>img 54px
	     page.css .ovcard img            76x76 */
	...[
		'calendar',
		'happy',
		'hold-doc',
		'pleased',
		'point',
		'thankful',
		'think',
		'tshirt',
		'walk',
	].map((name) => ({
		file: `notiva/novi/${name}.png`,
		width: 640,
		quality: 82,
		why: '404 hero .nv-404 .nf img max 264px tall -> 2x = 634px wide',
	})),

	/* Merch photography — portrait cut-out of the shirt. Native size, no resize.
	   shop.css .pdp .shot { aspect-ratio:1/1 } inside a two-column .pdp whose
	   .wrap maxes out at 1120px minus 48px padding each side, minus a 56px gap:
	   (1024-56)/2 = 484px box. 2x of that is 968px, more than the 595x860
	   master, so like sticker-pack below there is nothing to downscale to.

	   A `height: 720` cap used to sit here and it was a net loss in both
	   directions — measured, not assumed:
	     master + resize to 720 -> 27,890 B at 498x720
	     master at native size  -> 13,552 B at 595x860   (identical encoder settings)
	   The master's alpha is a binary mask (exactly 2 distinct values). Resizing
	   interpolates it into 256 feathered values, and at alphaQuality 100 that
	   alpha plane costs far more than the RGB the downscale saved. It mattered
	   out of proportion because this one file is the entire image payload of the
	   six PDPs with no photograph of their own (cap, hoodie, tote, pin, sleeve,
	   plush), which were shipping 2.06x the bytes they needed at 0.84x the
	   resolution. Do not reintroduce a resize here without re-measuring. */
	{
		file: 'notiva/novi/merch-shirt.png',
		quality: 84,
		why: 'native size kept (595x860 master < 2x of the 484px .pdp .shot box); binary alpha mask',
	},

	/* Sticker pack — 744x719 master, near-square. The .pdp .shot box is 484px,
	   so 2x would be 968px: larger than the master. Keep the native pixels and
	   take the win purely from the WebP re-encode. */
	{
		file: 'notiva/novi/sticker-pack.png',
		quality: 84,
		why: 'native size kept (744px master < 2x of the 484px .pdp .shot box)',
	},

	/* ── Product screenshots on /for-investors ───────────────────────────────
	   for-investors.css  .nv-investors .shot img { width: 100%; display: block }
	   inside .wrap { max-width:1120px; padding: 0 clamp(20px,4vw,48px) } -> a
	   1024px box. 2x would be 2048px, more than any master, so the native pixel
	   grid is kept and the saving comes from the encode. These carry fine UI
	   text, so they get a higher quality than the character art. */
	{
		file: 'notiva/shot-tax-crop.png',
		quality: 88,
		why: 'native size kept (1586px master < 2x of the 1024px .shot box); UI text',
	},
	{
		file: 'notiva/shot-fin-crop.png',
		quality: 88,
		why: 'native size kept (1586px master < 2x of the 1024px .shot box); UI text',
	},
	{
		file: 'notiva/shot-home.png',
		quality: 88,
		why: 'native size kept (1240px master < 2x of the 1024px .shot box); UI text',
	},

	/* ── Landing-page merch peek ─────────────────────────────────────────────
	   coming-soon.css
	     .peek .shirt { width:88px;  height:88px }
	     .peek .stick { width:66px;  height:84px }
	     .ctaplus:hover .peek .shirt { ... scale(1.1)  }
	     .ctaplus:hover .peek .stick { ... scale(1.12) }
	   So the largest painted box is 99x99 and 74x94. 2x = 198 and 148x188.
	   224px on the long edge covers both with headroom; the 1.5MB masters were
	   rendering into a 88px card. */
	{
		file: 'notiva/uploads/firefly-tshirt-design.png',
		width: 224,
		height: 224,
		quality: 86,
		why: 'coming-soon.css .peek .shirt 88x88 (x1.1 on hover) -> 2x = 198px',
	},
	{
		file: 'notiva/uploads/adobe-firefly-stickers.png',
		width: 224,
		height: 224,
		quality: 86,
		why: 'coming-soon.css .peek .stick 66x84 (x1.12 on hover) -> 2x = 148x188',
	},
];

const prune = process.argv.includes('--prune');

/** @param {number} n */
const kb = (n) => `${(n / 1024).toFixed(1)} KB`;

async function main() {
	/** @type {{name: string, before: number, after: number, dims: string}[]} */
	const rows = [];
	let missing = 0;

	for (const target of TARGETS) {
		const src = path.join(PUBLIC, target.file);
		const out = src.replace(/\.png$/i, '.webp');

		let srcStat;
		try {
			srcStat = await fs.stat(src);
		} catch {
			/* Already pruned in a previous run — the .webp is the committed asset. */
			missing += 1;
			console.log(`skip   ${target.file} (source pruned, ${path.basename(out)} kept)`);
			continue;
		}

		const pipeline = sharp(src);
		if (target.width || target.height) {
			pipeline.resize({
				width: target.width,
				height: target.height,
				fit: 'inside',
				withoutEnlargement: true,
			});
		}

		const buf = await pipeline
			.webp({
				quality: target.quality,
				lossless: target.lossless ?? false,
				alphaQuality: 100,
				effort: 6,
				smartSubsample: true,
			})
			.toBuffer();

		await fs.writeFile(out, buf);
		const meta = await sharp(buf).metadata();

		rows.push({
			name: target.file.replace(/^notiva\//, ''),
			before: srcStat.size,
			after: buf.length,
			dims: `${meta.width}x${meta.height}`,
		});

		if (prune) await fs.rm(src);
	}

	if (rows.length === 0) {
		console.log(`\nNothing to do — ${missing} source PNG(s) already pruned.`);
		return;
	}

	const w = Math.max(...rows.map((r) => r.name.length));
	console.log('');
	console.log(
		`${'file'.padEnd(w)}  ${'before'.padStart(10)}  ${'after'.padStart(10)}  saved   out`
	);
	let before = 0;
	let after = 0;
	for (const r of rows) {
		before += r.before;
		after += r.after;
		const pct = `${(100 - (r.after / r.before) * 100).toFixed(0)}%`;
		console.log(
			`${r.name.padEnd(w)}  ${kb(r.before).padStart(10)}  ${kb(r.after).padStart(10)}  ${pct.padStart(5)}   ${r.dims}`
		);
	}
	console.log('-'.repeat(w + 40));
	console.log(
		`${'TOTAL'.padEnd(w)}  ${kb(before).padStart(10)}  ${kb(after).padStart(10)}  ${`${(100 - (after / before) * 100).toFixed(0)}%`.padStart(5)}`
	);
	if (prune) console.log(`\nPruned ${rows.length} source PNG(s).`);
	else console.log('\nSource PNGs kept. Re-run with --prune to delete them.');
}

main().catch((err) => {
	console.error(err);
	process.exit(1);
});
