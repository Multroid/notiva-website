'use client';

/* 404 body, shared by the root not-found (unmatched URLs) and the (notiva)
   not-found (notFound() from /merch/[slug]). Built from the design system's
   own primitives — the design set has no 404 screen to port. */

import React from 'react';
import Link from 'next/link';

import { supportEnabled } from '@/lib/support';

import { NotivaHeader } from './notiva-header';
import { NotivaFooter } from './notiva-footer';
import { Novi } from './novi';
import { useLang, useT } from './lang-context';
import { useNotivaTitle } from './use-notiva-title';

import '@/styles/notiva/page.css';
import '@/styles/notiva/not-found.css';

export function NotFoundView(): React.JSX.Element {
	const { lang } = useLang();
	const t = useT();

	useNotivaTitle('Notiva · Seite nicht gefunden', 'Notiva · Page not found');

	return (
		<div className="notiva-shell nv-page nv-404" lang={lang}>
			<NotivaHeader />

			<section className="nf">
				<div className="wrap">
					<Novi pose="think" />
					<div className="txt">
						<div className="nf-code">404</div>
						<h1>
							{t('Diese Seite gibt es nicht.', 'This page does not exist.')}
						</h1>
						<p className="lede">
							{t(
								'Vielleicht hat sich ein Tippfehler in die Adresse geschlichen, oder die Seite kommt erst mit dem Start. Bis dahin ist die Startseite unser Zuhause.',
								'Maybe there is a typo in the address, or the page only arrives with launch. Until then the landing page is our home.'
							)}
						</p>
						<div className="actions">
							<Link className="btn btn-solid" href="/">
								{t('Zurück zur Startseite', 'Back to the home page')}
							</Link>
							{supportEnabled && (
								<Link className="btn btn-ghost" href="/support">
									{t('Unterstützen', 'Support us')}
								</Link>
							)}
						</div>
						<div className="elsewhere">
							<span>{t('Auch schon da:', 'Already here:')}</span>
							<Link href="/for-investors">
								{t('Für Investoren', 'For Investors')}
							</Link>
							<i />
							{supportEnabled && (
								<>
									<Link href="/support#merch">{t('Merch', 'Merch')}</Link>
									<i />
								</>
							)}
							<a href="mailto:team@notiva.de">team@notiva.de</a>
						</div>
					</div>
				</div>
			</section>

			<NotivaFooter
				left={{ de: 'Notiva · Deutschland', en: 'Notiva · Germany' }}
				right={{
					de: 'Der Start ist für 2026 geplant.',
					en: 'Launch is planned for 2026.',
				}}
			/>
		</div>
	);
}
