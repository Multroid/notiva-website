'use client';

/* Click-to-zoom for product photography. Wraps a gallery slot: clicking it
   opens the shot full-bleed, clicking again (or Escape, or the close button)
   returns. Only wraps slots that actually have an image — an empty ✦
   placeholder has nothing to zoom into, so it stays inert and unfocusable. */

import React, { useCallback, useEffect, useState } from 'react';

import { useT } from './lang-context';

/* imported here rather than from the page, so the styles always travel with
   the component wherever it is used */
import '@/styles/notiva/image-zoom.css';

export function ImageZoom({
	src,
	alt,
	children,
}: {
	src?: string;
	alt?: string;
	children: React.ReactNode;
}): React.JSX.Element {
	const t = useT();
	const [open, setOpen] = useState(false);
	const zoomable = Boolean(src);

	const close = useCallback(() => setOpen(false), []);

	useEffect(() => {
		if (!open) return;
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') close();
		}
		document.addEventListener('keydown', onKey);
		/* the overlay covers the page — stop the body scrolling behind it */
		const prev = document.body.style.overflow;
		document.body.style.overflow = 'hidden';
		return () => {
			document.removeEventListener('keydown', onKey);
			document.body.style.overflow = prev;
		};
	}, [open, close]);

	if (!zoomable) return <>{children}</>;

	return (
		<>
			<button
				type="button"
				className="zoomtrigger"
				aria-label={t('Bild vergrößern', 'Enlarge image')}
				onClick={() => setOpen(true)}
			>
				{children}
				<span className="zoomhint" aria-hidden="true">
					<svg viewBox="0 0 24 24">
						<circle cx="11" cy="11" r="6.5" />
						<path d="M15.8 15.8 20 20" />
						<path d="M11 8.6v4.8M8.6 11h4.8" />
					</svg>
				</span>
			</button>

			{open ? (
				<div
					className="zoomov"
					role="dialog"
					aria-modal="true"
					aria-label={alt || t('Produktbild', 'Product image')}
					onClick={close}
				>
					<button
						type="button"
						className="zoomclose"
						aria-label={t('Schließen', 'Close')}
						onClick={close}
					>
						<svg viewBox="0 0 24 24">
							<path d="M6 6l12 12M18 6L6 18" />
						</svg>
					</button>
					{/* eslint-disable-next-line @next/next/no-img-element */}
					<img src={src} alt={alt || ''} onClick={(e) => e.stopPropagation()} />
				</div>
			) : null}
		</>
	);
}
