'use client';

/* Novi pose map — verbatim from window.NOVI_POSES in Coming Soon.html
   (line 345), rebased from assets/novi/ to /notiva/novi/ and re-encoded to
   WebP by scripts/optimize-images.mjs (the 1200x1000 PNG masters were ~550 KB
   each for a box that is never taller than 264 CSS px). */

import React from 'react';

export const NOVI_POSES: Record<string, string> = {
	wave: '/notiva/novi/happy.webp',
	think: '/notiva/novi/think.webp',
	point: '/notiva/novi/point.webp',
	'hold-doc': '/notiva/novi/hold-doc.webp',
	relieved: '/notiva/novi/thankful.webp',
	tshirt: '/notiva/novi/tshirt.webp',
	walk: '/notiva/novi/walk.webp',
	idle: '/notiva/novi/pleased.webp',
	pleased: '/notiva/novi/happy.webp',
	delighted: '/notiva/novi/happy.webp',
	calendar: '/notiva/novi/calendar.webp',

	/* Donate-section reaction ladder (Spenden Section Variants.html: the amount
	   picks the pose — wave under €10, happy under €30, love up to €50, rocket
	   above). These four came in framed differently from each other and flattened
	   onto a transparency checkerboard, so they were keyed back to real alpha and
	   re-laid onto one 607x709 canvas with a common face width and a common
	   baseline — the design's "one canvas, one face size, so swapping never
	   resizes Novi". They are the only poses off the 640x533 sheet. */
	'react-wave': '/notiva/novi/react-wave.webp',
	'react-happy': '/notiva/novi/react-happy.webp',
	'react-love': '/notiva/novi/react-love.webp',
	'react-rocket': '/notiva/novi/react-rocket.webp',
};

/* The main sheet all ships at one intrinsic size, so the aspect ratio is stable
   across a runtime src swap. Present as width/height attributes purely so the
   browser can reserve the box before the bytes land (CLS); the CSS that sizes
   each usage — `height:Npx; width:auto` — still wins. */
export const NOVI_POSE_WIDTH = 640;
export const NOVI_POSE_HEIGHT = 533;

/* The react-* ladder is its own sheet — same size across the four, so swapping
   within the ladder is still ratio-stable, just not 640x533. Without this the
   reserved box would be 20% too wide until the bytes land. */
const REACT_SIZE = { width: 607, height: 709 };

export type NoviProps = { pose: string } & React.ComponentPropsWithRef<'img'>;

/** Plain <img> on purpose — next.config.ts sets images.unoptimized. */
export function Novi({ pose, alt = '', ...rest }: NoviProps): React.JSX.Element {
	const size = pose.startsWith('react-')
		? REACT_SIZE
		: { width: NOVI_POSE_WIDTH, height: NOVI_POSE_HEIGHT };
	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			width={size.width}
			height={size.height}
			decoding="async"
			{...rest}
			src={NOVI_POSES[pose] ?? NOVI_POSES.idle}
			alt={alt}
		/>
	);
}
