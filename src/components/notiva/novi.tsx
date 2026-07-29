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
};

/* Every pose ships at the same intrinsic size, so the aspect ratio is stable
   across a runtime src swap. Present as width/height attributes purely so the
   browser can reserve the box before the bytes land (CLS); the CSS that sizes
   each usage — `height:Npx; width:auto` — still wins. */
export const NOVI_POSE_WIDTH = 640;
export const NOVI_POSE_HEIGHT = 533;

export type NoviProps = { pose: string } & React.ComponentPropsWithRef<'img'>;

/** Plain <img> on purpose — next.config.ts sets images.unoptimized. */
export function Novi({ pose, alt = '', ...rest }: NoviProps): React.JSX.Element {
	return (
		// eslint-disable-next-line @next/next/no-img-element
		<img
			width={NOVI_POSE_WIDTH}
			height={NOVI_POSE_HEIGHT}
			decoding="async"
			{...rest}
			src={NOVI_POSES[pose] ?? NOVI_POSES.idle}
			alt={alt}
		/>
	);
}
