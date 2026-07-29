'use client';

/* Novi pose map — verbatim from window.NOVI_POSES in Coming Soon.html
   (line 345), rebased from assets/novi/ to /notiva/novi/. */

import React from 'react';

export const NOVI_POSES: Record<string, string> = {
	wave: '/notiva/novi/happy.png',
	think: '/notiva/novi/think.png',
	point: '/notiva/novi/point.png',
	'hold-doc': '/notiva/novi/hold-doc.png',
	relieved: '/notiva/novi/thankful.png',
	tshirt: '/notiva/novi/tshirt.png',
	walk: '/notiva/novi/walk.png',
	idle: '/notiva/novi/pleased.png',
	pleased: '/notiva/novi/happy.png',
	delighted: '/notiva/novi/happy.png',
	calendar: '/notiva/novi/calendar.png',
};

export type NoviProps = { pose: string } & React.ComponentPropsWithRef<'img'>;

/** Plain <img> on purpose — next.config.ts sets images.unoptimized. */
export function Novi({ pose, alt = '', ...rest }: NoviProps): React.JSX.Element {
	// eslint-disable-next-line @next/next/no-img-element
	return <img {...rest} src={NOVI_POSES[pose] ?? NOVI_POSES.idle} alt={alt} />;
}
