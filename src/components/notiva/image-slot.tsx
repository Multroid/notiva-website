'use client';

/* Production stand-in for the design's <image-slot> authoring element.
   Filled → a plain <img>; empty → the ✦ mark the shop CSS styles
   (.pcard .ph .mark / .pdp .shot .mark). The root always carries `imgslot`
   so .nv-coming-soon .peek .imgslot{color:transparent} keeps applying. */

import React from 'react';

export function ImageSlot({
	src,
	placeholder,
	className,
	alt = '',
	width,
	height,
	loading,
}: {
	src?: string;
	placeholder?: string;
	className?: string;
	alt?: string;
	/** Intrinsic pixels of the asset — reserves the box before it loads (CLS). */
	width?: number;
	height?: number;
	/** `lazy` for anything below the fold; omit to keep the default eager fetch. */
	loading?: 'lazy' | 'eager';
}): React.JSX.Element {
	const cls = className ? `imgslot ${className}` : 'imgslot';
	if (src) {
		return (
			// eslint-disable-next-line @next/next/no-img-element
			<img
				className={cls}
				src={src}
				alt={alt}
				width={width}
				height={height}
				loading={loading}
				decoding="async"
			/>
		);
	}
	/* `placeholder` is the design's authoring-time caption. <image-slot> never
	   rendered it as a title attribute, so it must not become a browser tooltip
	   on the empty product tiles — it is kept as a data hook only. */
	return (
		<span className={cls} data-placeholder={placeholder || undefined}>
			<span className="mark">✦</span>
		</span>
	);
}
