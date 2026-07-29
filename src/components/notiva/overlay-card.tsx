'use client';

/* The .ov / .ovcard confirmation dialog used by Support Notiva (thank-you)
   and Basket (order noted). Markup matches Support Notiva.html lines 319–327;
   styles already live in page.css. Closes on the button, on the scrim and on
   Escape; the close button takes focus on open, as in notiva-shop.js. */

import React, { useEffect, useRef } from 'react';

export function OverlayCard({
	open,
	onClose,
	title,
	body,
	note,
	closeLabel,
}: {
	open: boolean;
	onClose(): void;
	title: string;
	body: string;
	note: string;
	closeLabel: string;
}): React.JSX.Element | null {
	const btnRef = useRef<HTMLButtonElement>(null);

	/* Callers pass an inline arrow, so `onClose` is a new value on every parent
	   render. Keep it in a ref: focus must happen once, when the dialog opens
	   (notiva-shop.js showOv()), not again every time the page re-renders. */
	const onCloseRef = useRef(onClose);
	useEffect(() => {
		onCloseRef.current = onClose;
	});

	useEffect(() => {
		if (!open) return;
		function onKey(e: KeyboardEvent) {
			if (e.key === 'Escape') onCloseRef.current();
		}
		document.addEventListener('keydown', onKey);
		btnRef.current?.focus();
		return () => document.removeEventListener('keydown', onKey);
	}, [open]);

	if (!open) return null;

	return (
		<div
			className="ov"
			onClick={(e) => {
				if (e.target === e.currentTarget) onClose();
			}}
		>
			<div className="ovcard" role="dialog" aria-modal="true" aria-labelledby="ov-t">
				{/* eslint-disable-next-line @next/next/no-img-element */}
				<img
					src="/notiva/novi/thankful.webp"
					alt="Novi"
					width={640}
					height={533}
					loading="lazy"
					decoding="async"
				/>
				<h3 id="ov-t">{title}</h3>
				<p>{body}</p>
				<p className="ovnote">{note}</p>
				<button ref={btnRef} className="btn btn-solid" type="button" onClick={onClose}>
					{closeLabel}
				</button>
			</div>
		</div>
	);
}
