'use client';

/* /rwu — QR-code landing for the RWU event. Phone first: the visitor has just
   scanned at the booth, so the signup card sits directly under a short intro
   instead of behind a button. Built from page.css primitives plus rwu.css,
   like the 404. */

import React from 'react';

import { T, useLang, useT } from '@/components/notiva/lang-context';
import { NotivaFooter } from '@/components/notiva/notiva-footer';
import { NotivaHeader } from '@/components/notiva/notiva-header';
import { useNotivaTitle } from '@/components/notiva/use-notiva-title';
import { WaitlistForm } from '@/components/notiva/waitlist-form';

import '@/styles/notiva/page.css';
import './rwu.css';

const POINTS = [
	{
		de: 'Liest Bank, E-Mail und Belege das ganze Jahr',
		en: 'Reads your bank, email and receipts all year',
	},
	{
		de: 'Bereitet UStVA und EÜR für dich vor',
		en: 'Prepares your UStVA and EÜR for you',
	},
	{
		de: 'Warnt, bevor eine Frist Geld kostet',
		en: 'Warns you before a deadline costs money',
	},
] as const;

export function RwuPage(): React.JSX.Element {
	const { lang } = useLang();
	const t = useT();

	useNotivaTitle('Notiva · Warteliste RWU', 'Notiva · RWU waitlist');

	return (
		<div className="notiva-shell nv-page nv-rwu" lang={lang}>
			<NotivaHeader />

			<section className="rwu">
				<div className="wrap rwu-grid">
					<div className="rwu-intro">
						<div className="eyebrow">{t('Hallo, RWU', 'Hello, RWU')}</div>
						<T
							as="h1"
							de="Nie wieder <em>Angst</em> vor dem Finanzamt"
							en="Never <em>fear</em> the Finanzamt again"
						/>
						<p className="lede">
							{t(
								'Notiva ist das KI-native Finanz-Backoffice für Selbstständige in Deutschland. Trag dich ein, und wir melden uns, sobald dein früher Zugang bereit ist.',
								'Notiva is the AI-native finance back office for the self-employed in Germany. Sign up and we will write to you as soon as your early access is ready.'
							)}
						</p>
					</div>

					<div className="rwu-card">
						<WaitlistForm />
					</div>

					<div className="rwu-points">
						<ul>
							{POINTS.map((p) => (
								<li key={p.en}>
									<s aria-hidden="true">
										<svg viewBox="0 0 24 24">
											<path d="m5 12.5 4.5 4.5L19 7.5" />
										</svg>
									</s>
									<span>{t(p.de, p.en)}</span>
								</li>
							))}
						</ul>
						<div className="rwu-trust">
							<span>{t('DSGVO-konform by design', 'GDPR-compliant by design')}</span>
							<i />
							<span>{t('Daten in der EU gehostet', 'Data hosted in the EU')}</span>
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
