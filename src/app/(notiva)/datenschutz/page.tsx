'use client';

/* Datenschutzerklärung — the page the waitlist consent checkbox links to.
   Structured to Art. 13 DSGVO, in the same DE/EN pattern as the rest of the
   (notiva) group.

   Everything describing the software is accurate and was read off this
   codebase (see the recipients table). Notiva has not been founded yet, so §1
   names no company, no legal form and no seat, and §10 no competent authority:
   none of them exists. Do not invent one — when the company is founded, add it
   here together with the postal address Art. 13 Abs. 1 lit. a DSGVO expects.

   The earlier draft of this page, with a visible placeholder at every open
   point, stays on the dev branch together with the list of what is still
   outstanding. layout.tsx keeps the page out of the index until a lawyer has
   signed the text off. */

import '@/styles/notiva/legal.css';

import React from 'react';
import Link from 'next/link';

import { CookieDeclaration } from '@/components/notiva/cookie-declaration';
import { CookieSettingsLink } from '@/components/notiva/cookie-settings-link';
import { NotivaHeader } from '@/components/notiva/notiva-header';
import { NotivaFooter } from '@/components/notiva/notiva-footer';
import { useNotivaTitle } from '@/components/notiva/use-notiva-title';
import { T, useLang, useT } from '@/components/notiva/lang-context';
import { cookiebotEnabled } from '@/lib/cookiebot';
import { supportEnabled } from '@/lib/support';

export default function DatenschutzPage(): React.JSX.Element {
	const { lang } = useLang();
	const t = useT();

	useNotivaTitle('Notiva · Datenschutz', 'Notiva · Privacy');

	return (
		<div className="notiva-shell nv-legal" lang={lang}>
			<NotivaHeader />

			<section>
				<div className="wrap prose">
					<T as="div" className="eyebrow" de="Datenschutz" en="Privacy" />
					<T as="h1" de="Datenschutzerklärung" en="Privacy policy" />
					<T
						as="p"
						className="lede"
						de="Diese Seite erklärt, welche personenbezogenen Daten notiva.de erhebt, warum, auf welcher Rechtsgrundlage und wie lange sie gespeichert werden. Notiva ist vor dem Start: die Website verarbeitet heute Wartelisten-Anmeldungen, Investorenanfragen, Spenden und Merch-Bestellungen — und misst keine Reichweite."
						en="This page explains what personal data notiva.de collects, why, on what legal basis, and for how long it is kept. Notiva is pre-launch: today the website processes waitlist signups, investor enquiries, donations and merch orders — and runs no analytics."
					/>

					<ul className="toc">
						{[
							['1. Verantwortlicher', '1. Controller'],
							['2. Warteliste', '2. Waitlist'],
							['3. Investoren-Anfragen', '3. Investor enquiries'],
							['4. Spenden', '4. Donations'],
							['5. Merch-Bestellungen', '5. Merch orders'],
							['6. Hosting und Server-Logs', '6. Hosting and server logs'],
							['7. Cookies und Speicherung im Browser', '7. Cookies and storage in your browser'],
							['8. Analyse und Reichweitenmessung', '8. Analytics'],
							['9. Empfänger', '9. Recipients'],
							['10. Deine Rechte', '10. Your rights'],
						].map(([de, en]) => (
							<li key={de}>
								<T de={de} en={en} />
							</li>
						))}
					</ul>
				</div>
			</section>

			{/* 1 ------------------------------------------------------------ */}
			<section>
				<div className="wrap prose">
					<T as="h2" de="1. Verantwortlicher" en="1. Controller" />
					<T
						as="p"
						de="Verantwortlich für die Datenverarbeitung auf dieser Website im Sinne von Art. 4 Nr. 7 DSGVO ist das Team hinter Notiva. Notiva ist noch kein gegründetes Unternehmen; die Gründung ist geplant. Deshalb stehen hier noch kein Firmenname, keine Rechtsform und kein Sitz."
						en="The controller for data processing on this website within the meaning of Art. 4(7) GDPR is the team behind Notiva. Notiva has not been founded as a company yet; founding one is planned. That is why no company name, legal form or registered office appears here."
					/>
					<T
						as="p"
						de={`Für Fragen zum Datenschutz und zur Ausübung deiner Rechte: <a href="mailto:team@notiva.de">team@notiva.de</a>.`}
						en={`For privacy questions and to exercise your rights: <a href="mailto:team@notiva.de">team@notiva.de</a>.`}
					/>
				</div>
			</section>

			{/* 2 ------------------------------------------------------------ */}
			<section>
				<div className="wrap prose">
					<T as="h2" de="2. Warteliste" en="2. Waitlist" />
					<T
						as="p"
						de="Wenn du dich für die Warteliste einträgst, bekommst du zuerst eine E-Mail mit einem Bestätigungslink. Erst wenn du diesen Link anklickst, gilt deine Einwilligung als erteilt und wir dürfen dir schreiben (Double-Opt-in). Klickst du nicht, senden wir dir keine weiteren E-Mails."
						en="When you join the waitlist you first receive an email with a confirmation link. Only once you click that link is your consent given and may we write to you (double opt-in). If you do not click it, we send you no further email."
					/>
					<dl>
						<T as="dt" de="Daten" en="Data" />
						<T
							as="dd"
							de="E-Mail-Adresse, gewählte Sprache, die Seite, auf der du dich eingetragen hast, Zeitpunkt der Einwilligung, der Wortlaut der Einwilligung, deine IP-Adresse und dein Browser-Kennzeichen (User-Agent) sowie ein Zufallstoken für den Bestätigungslink."
							en="Email address, chosen language, the page you signed up on, the time of consent, the wording of the consent, your IP address and browser identifier (user agent), and a random token for the confirmation link."
						/>
						<T as="dt" de="Zweck" en="Purpose" />
						<T
							as="dd"
							de="Dich über den Start von Notiva und den frühen Zugang zu informieren. IP-Adresse, User-Agent und Zeitpunkt dienen zusätzlich dem Nachweis der Einwilligung und der Abwehr von Missbrauch."
							en="To inform you about the Notiva launch and early access. IP address, user agent and timestamp additionally serve to evidence the consent and to prevent abuse."
						/>
						<T as="dt" de="Rechtsgrundlage" en="Legal basis" />
						<T
							as="dd"
							de="Deine Einwilligung, Art. 6 Abs. 1 lit. a DSGVO. Für die Missbrauchsabwehr zusätzlich unser berechtigtes Interesse, Art. 6 Abs. 1 lit. f DSGVO."
							en="Your consent, Art. 6(1)(a) GDPR. For abuse prevention additionally our legitimate interest, Art. 6(1)(f) GDPR."
						/>
						<T as="dt" de="Widerruf" en="Withdrawal" />
						<T
							as="dd"
							de="Jederzeit über den Abmeldelink am Fuß jeder Wartelisten-E-Mail, über die Abmelden-Schaltfläche deines E-Mail-Programms oder per Nachricht an team@notiva.de. Der Widerruf gilt ab sofort und braucht keine Begründung; die Rechtmäßigkeit der Verarbeitung bis dahin bleibt unberührt."
							en="At any time via the unsubscribe link at the foot of every waitlist email, via your mail client's own unsubscribe button, or by message to team@notiva.de. Withdrawal takes effect immediately and needs no reason; the lawfulness of processing up to that point is unaffected."
						/>
						<T as="dt" de="Speicherdauer" en="Retention" />
						<T
							as="dd"
							de="Bis zum Widerruf, spätestens jedoch bis zum Ende der Wartelistenphase. Nicht bestätigte Einträge löschen wir spätestens nach 14 Tagen — so lange ist der Bestätigungslink gültig. Nach einer Abmeldung behalten wir deine Adresse als Sperrvermerk, damit wir dir nicht versehentlich erneut schreiben; du kannst stattdessen die vollständige Löschung verlangen."
							en="Until withdrawal, and at the latest at the end of the waitlist phase. Unconfirmed entries are deleted after 14 days at the latest — that is how long the confirmation link is valid. After an unsubscribe we keep your address as a suppression record so we cannot accidentally write to you again; you may instead request full deletion."
						/>
					</dl>
				</div>
			</section>

			{/* 3 ------------------------------------------------------------ */}
			<section>
				<div className="wrap prose">
					<T as="h2" de="3. Investoren-Anfragen" en="3. Investor enquiries" />
					<T
						as="p"
						de="Über das Formular auf /for-investors kannst du unser Deck anfragen. Diese Anfrage ist keine Werbung, sondern Korrespondenz, die du selbst angestoßen hast; ein Double-Opt-in gibt es hier deshalb nicht. Das Deck versenden wir von Hand, nachdem wir die Anfrage gelesen haben."
						en="You can request our deck through the form on /for-investors. That request is not marketing but correspondence you initiated yourself, so there is no double opt-in here. We send the deck by hand once we have read the request."
					/>
					<dl>
						<T as="dt" de="Daten" en="Data" />
						<T
							as="dd"
							de="Name, Fonds oder Firma, E-Mail-Adresse, optional deine Nachricht, gewählte Sprache, die anfragende Seite, IP-Adresse und User-Agent."
							en="Name, fund or company, email address, optionally your message, chosen language, the requesting page, IP address and user agent."
						/>
						<T as="dt" de="Zweck" en="Purpose" />
						<T
							as="dd"
							de="Deine Anfrage zu beantworten, dir Deck und Kurzprofil zu schicken und ein Gespräch abzustimmen."
							en="To answer your enquiry, send you the deck and a short profile, and arrange a conversation."
						/>
						<T as="dt" de="Rechtsgrundlage" en="Legal basis" />
						<T
							as="dd"
							de="Anbahnung eines Vertragsverhältnisses bzw. Erfüllung deiner Anfrage, Art. 6 Abs. 1 lit. b DSGVO, sowie unser berechtigtes Interesse an der Kapitalbeschaffung, Art. 6 Abs. 1 lit. f DSGVO."
							en="Pre-contractual steps and handling your request, Art. 6(1)(b) GDPR, and our legitimate interest in raising capital, Art. 6(1)(f) GDPR."
						/>
						<T as="dt" de="Speicherdauer" en="Retention" />
						<T
							as="dd"
							de="Für die Dauer der Finanzierungsrunde und danach, solange ein Kontakt für Folgerunden sinnvoll ist; anschließend löschen wir die Anfrage. Handels- und steuerrechtliche Aufbewahrungspflichten bleiben unberührt."
							en="For the duration of the financing round and afterwards for as long as contact for follow-on rounds is meaningful; after that we delete the enquiry. Statutory commercial and tax retention duties are unaffected."
						/>
					</dl>
				</div>
			</section>

			{/* 4 ------------------------------------------------------------ */}
			<section>
				<div className="wrap prose">
					<T as="h2" de="4. Spenden" en="4. Donations" />
					<T
						as="p"
						de="Spenden auf /support werden über Stripe abgewickelt. Deine Zahlungsdaten — Kartennummer, IBAN und Ähnliches — gibst du direkt bei Stripe ein. Sie erreichen unsere Server nicht und wir speichern sie nicht. Wir erhalten von Stripe nur die Information, dass und in welcher Höhe eine Zahlung erfolgt ist, sowie die zugehörige Vorgangsnummer."
						en="Donations on /support are processed by Stripe. You enter your payment data — card number, IBAN and the like — directly with Stripe. It does not reach our servers and we do not store it. From Stripe we receive only that a payment was made and its amount, plus the associated transaction reference."
					/>
					<T
						as="p"
						de="Beim Aufruf der Seite <b>/support</b> lädt dein Browser bereits Code von js.stripe.com — nicht erst, wenn du auf Bezahlen klickst. Stripe erhält dabei deine IP-Adresse und setzt die Cookies <b>__stripe_mid</b> und <b>__stripe_sid</b>, die Stripe zur Betrugserkennung braucht. Auf allen anderen Seiten dieser Website passiert das nicht. Stripe ist als Zahlungsdienstleister zugleich eigener Verantwortlicher; Einzelheiten in der Datenschutzerklärung von Stripe."
						en="Opening the page <b>/support</b> already loads code from js.stripe.com — not only when you click to pay. Stripe thereby receives your IP address and sets the cookies <b>__stripe_mid</b> and <b>__stripe_sid</b>, which Stripe needs for fraud detection. This does not happen on any other page of this website. As a payment institution Stripe is also its own controller; see Stripe's privacy policy for details."
					/>
					<T
						as="p"
						de="Rechtsgrundlage ist die Durchführung der von dir gewünschten Zahlung, Art. 6 Abs. 1 lit. b DSGVO. Zahlungsbelege bewahren wir nach § 147 AO und § 257 HGB zehn Jahre auf. Notiva ist keine gemeinnützige Organisation: Spenden sind nicht steuerlich abzugsfähig und wir stellen keine Zuwendungsbestätigung aus."
						en="The legal basis is performing the payment you requested, Art. 6(1)(b) GDPR. Payment records are kept for ten years under § 147 AO and § 257 HGB. Notiva is not a charity: donations are not tax-deductible and we issue no donation receipt."
					/>
				</div>
			</section>

			{/* 5 ------------------------------------------------------------ */}
			<section>
				<div className="wrap prose">
					<T as="h2" de="5. Merch-Bestellungen" en="5. Merch orders" />
					<T
						as="p"
						de="Der Shop wird von Fourthwall betrieben. Der Warenkorb entsteht in deinem Browser; sobald du zur Kasse gehst, wechselst du auf eine von Fourthwall betriebene Seite. Lieferadresse und Zahlungsdaten gibst du dort ein, nicht bei uns. Fourthwall ist für die Abwicklung der Bestellung verantwortlich und sitzt in den USA."
						en="The shop is operated by Fourthwall. The basket is built in your browser; as soon as you check out you move to a page operated by Fourthwall. You enter delivery address and payment data there, not with us. Fourthwall is responsible for fulfilling the order and is based in the USA."
					/>
					<T
						as="p"
						de="Rechtsgrundlage ist die Erfüllung des Kaufvertrags, Art. 6 Abs. 1 lit. b DSGVO. Zur Übermittlung in die USA siehe Abschnitt 9."
						en="The legal basis is performance of the purchase contract, Art. 6(1)(b) GDPR. On transfers to the USA see section 9."
					/>
				</div>
			</section>

			{/* 6 ------------------------------------------------------------ */}
			<section>
				<div className="wrap prose">
					<T as="h2" de="6. Hosting und Server-Logs" en="6. Hosting and server logs" />
					<T
						as="p"
						de="Diese Website wird bei AWS Amplify gehostet. Beim Aufruf einer Seite verarbeitet der Server technisch notwendige Verbindungsdaten: IP-Adresse, Zeitpunkt, aufgerufene URL, übertragene Datenmenge, Referrer und User-Agent. Diese Daten sind nötig, damit die Seite ausgeliefert werden kann, und dienen der Sicherheit und Stabilität des Betriebs."
						en="This website is hosted on AWS Amplify. When a page is requested the server processes technically necessary connection data: IP address, time, requested URL, volume transferred, referrer and user agent. This data is required to deliver the page and serves the security and stability of operations."
					/>
					<T
						as="p"
						de="Rechtsgrundlage ist unser berechtigtes Interesse am sicheren Betrieb der Website, Art. 6 Abs. 1 lit. f DSGVO."
						en="The legal basis is our legitimate interest in the secure operation of the website, Art. 6(1)(f) GDPR."
					/>
					<T
						as="p"
						de="Die Server stehen in der AWS-Region eu-central-1 (Frankfurt am Main), also in Deutschland."
						en="The servers are located in AWS region eu-central-1 (Frankfurt am Main), that is, in Germany."
					/>
					<T
						as="h3"
						de="Wo die Daten liegen"
						en="Where the data is stored"
					/>
					<T
						as="p"
						de="Wartelisten-Einträge und Investoren-Anfragen speichern wir in einer Postgres-Datenbank bei Supabase in der Region eu-west-1 (Irland), also innerhalb der Europäischen Union. Die Tabellen sind nicht öffentlich erreichbar: der Zugriff erfolgt ausschließlich serverseitig aus dieser Website heraus."
						en="Waitlist entries and investor enquiries are stored in a Postgres database at Supabase in region eu-west-1 (Ireland), that is, inside the European Union. The tables are not publicly reachable: access happens exclusively server-side from this website."
					/>
					<T
						as="p"
						de="Auch der Versand unserer E-Mails läuft über einen Dienst in der Region eu-west-1 (Irland). Wartelisten-Adressen und Investoren-Anfragen verlassen damit im Regelbetrieb die EU nicht."
						en="Our email dispatch likewise runs through a service in region eu-west-1 (Ireland). Waitlist addresses and investor enquiries therefore do not leave the EU in normal operation."
					/>
				</div>
			</section>

			{/* 7 ------------------------------------------------------------ */}
			<section>
				<div className="wrap prose">
					<T
						as="h2"
						de="7. Cookies und Speicherung im Browser"
						en="7. Cookies and storage in your browser"
					/>
					<T
						as="p"
						de="Diese Website setzt <b>keine Cookies zu Werbe- oder Analysezwecken</b>. Gespeichert wird nur, was für die von dir aufgerufenen Funktionen nötig ist. Damit das so bleibt und nachprüfbar ist, läuft auf dieser Website ein Einwilligungsbanner: Cookiebot blockiert alles, was nicht unbedingt erforderlich ist, bis du zustimmst — heute steht dort nichts zur Auswahl, was wir nicht ohnehin bräuchten."
						en="This website sets <b>no cookies for advertising or analytics</b>. Only what is necessary for the functions you use is stored. To keep it that way and make it verifiable, a consent banner runs on this website: Cookiebot blocks everything that is not strictly necessary until you agree — today there is nothing on offer there that we would not need anyway."
					/>

					<T as="h3" de="Das Einwilligungsbanner" en="The consent banner" />
					<T
						as="p"
						de="Das Banner stammt von <b>Cookiebot</b>, einem Dienst der Usercentrics A/S, Havnegade 39, 1058 Kopenhagen, Dänemark. Cookiebot verarbeitet in unserem Auftrag deine IP-Adresse (gekürzt), die Browserkennung, die aufgerufene Adresse und deine Auswahl — nur um deine Entscheidung zu speichern und sie später belegen zu können, wie es Art. 7 Abs. 1 DSGVO verlangt. Die Verarbeitung findet in der EU statt."
						en="The banner comes from <b>Cookiebot</b>, a service of Usercentrics A/S, Havnegade 39, 1058 Copenhagen, Denmark. Acting on our instructions, Cookiebot processes your IP address (truncated), your browser identifier, the address you visited and your choice — solely to store your decision and be able to evidence it later, as Art. 7(1) GDPR requires. The processing takes place in the EU."
					/>
					{/* Sentence and button travel together — on a build with no CBID
					    the promise of a one-click withdrawal would otherwise stand
					    above nothing at all. */}
					{cookiebotEnabled && (
						<>
							<T
								as="p"
								de="Deine Auswahl kannst du jederzeit ändern oder widerrufen, ohne Angabe von Gründen und mit einem Klick:"
								en="You can change or withdraw your choice at any time, without giving reasons and with a single click:"
							/>
							<p className="nv-cookie-settings-cta">
								<CookieSettingsLink />
							</p>
						</>
					)}

					<T
						as="h3"
						de="Was tatsächlich gespeichert wird"
						en="What is actually stored"
					/>
					<dl>
						<T as="dt" de="notiva.lang" en="notiva.lang" />
						<T
							as="dd"
							de="Deine Sprachwahl (Deutsch oder Englisch), damit die Seite beim nächsten Besuch in derselben Sprache erscheint. Local Storage, bleibt bis du sie löschst."
							en="Your language choice (German or English), so the site appears in the same language on your next visit. Local storage, kept until you delete it."
						/>
						<T as="dt" de="notiva.basket" en="notiva.basket" />
						<T
							as="dd"
							de="Der Inhalt deines Merch-Warenkorbs, damit er beim Seitenwechsel nicht verloren geht. Local Storage, bleibt bis du sie löschst."
							en="The contents of your merch basket, so it is not lost when you move between pages. Local storage, kept until you delete it."
						/>
						<T as="dt" de="next-auth.callback-url" en="next-auth.callback-url" />
						<T
							as="dd"
							de="Ein technisches Cookie des Anmeldesystems, das diese Website mit der Notiva-App teilt. Vor dem Start ist hier keine Anmeldung möglich; es enthält dann keine personenbezogenen Daten."
							en="A technical cookie of the sign-in system that this website shares with the Notiva app. Before launch no sign-in is possible here, in which case it contains no personal data."
						/>
						<T as="dt" de="__stripe_mid, __stripe_sid" en="__stripe_mid, __stripe_sid" />
						<T
							as="dd"
							de="Nur auf der Seite /support: Cookies von Stripe zur Betrugserkennung, siehe Abschnitt 4. __stripe_sid läuft nach 30 Minuten ab, __stripe_mid nach einem Jahr."
							en="Only on the /support page: Stripe cookies for fraud detection, see section 4. __stripe_sid expires after 30 minutes, __stripe_mid after one year."
						/>
						<T as="dt" de="CookieConsent" en="CookieConsent" />
						<T
							as="dd"
							de="Deine Antwort auf das Einwilligungsbanner, damit du nicht bei jedem Seitenaufruf erneut gefragt wirst und wir belegen können, wofür du dich entschieden hast. Cookie von Cookiebot, läuft nach zwölf Monaten ab."
							en="Your answer to the consent banner, so you are not asked again on every page view and so we can evidence what you chose. Cookie set by Cookiebot, expires after twelve months."
						/>
					</dl>
					<T
						as="p"
						de="Rechtsgrundlage für diese Einträge ist § 25 Abs. 2 Nr. 2 TDDDG: sie sind unbedingt erforderlich, damit der von dir gewünschte Dienst funktioniert, und brauchen deshalb keine Einwilligung. Das gilt auch für das Einwilligungs-Cookie selbst — ohne es ließe sich deine Entscheidung nicht speichern. Für Analyse- oder Werbe-Cookies würde es nicht gelten; solche setzen wir nicht, und falls sich das ändert, werden sie über das Banner freigegeben und nicht vorher geladen."
						en="The legal basis for these entries is § 25(2)(2) TDDDG: they are strictly necessary for the service you requested to work and therefore need no consent. That includes the consent cookie itself — without it your decision could not be stored. It would not apply to analytics or advertising cookies; we set none, and should that change they will be released through the banner rather than loaded beforehand."
					/>

					<T
						as="h3"
						de="Vollständige Cookie-Erklärung"
						en="Full cookie declaration"
					/>
					<T
						as="p"
						de="Die folgende Liste wird von Cookiebot erzeugt und stammt aus einem monatlichen automatischen Scan dieser Website — sie ist damit auch dann noch aktuell, wenn der Text darüber es einmal nicht sein sollte."
						en="The list below is generated by Cookiebot from a monthly automated scan of this website — so it stays current even if the text above should ever fall behind."
					/>
					<CookieDeclaration />
				</div>
			</section>

			{/* 8 ------------------------------------------------------------ */}
			<section>
				<div className="wrap prose">
					<T as="h2" de="8. Analyse und Reichweitenmessung" en="8. Analytics" />
					<T
						as="p"
						de="Derzeit findet auf dieser Website <b>keine Reichweitenmessung</b> statt. Google Analytics war früher eingebunden und wurde entfernt, weil es Cookies gesetzt hat, bevor jemand zustimmen konnte. Die Cookies <b>_ga</b> und <b>_ga_BF5YGPRDQ7</b> werden nicht mehr gesetzt; bereits vorhandene laufen von selbst ab und du kannst sie jederzeit in den Browsereinstellungen löschen."
						en="At present there is <b>no analytics</b> on this website. Google Analytics was previously embedded and has been removed, because it set cookies before anyone could agree to them. The cookies <b>_ga</b> and <b>_ga_BF5YGPRDQ7</b> are no longer set; any that already exist expire on their own and you can delete them in your browser settings at any time."
					/>

					<T as="h3" de="PostHog (geplant)" en="PostHog (planned)" />
					<T
						as="p"
						de="Wir planen, die Reichweitenmessung mit PostHog wieder aufzunehmen, und zwar bewusst ohne Cookies: geplant sind die EU-Cloud in Frankfurt, keine dauerhafte Kennung im Browser, anonymisierte IP-Adressen und keine Sitzungsaufzeichnung. Weil dabei nicht auf Informationen in deinem Gerät zugegriffen wird, greift § 25 TDDDG nicht und es braucht kein Einwilligungsbanner. Rechtsgrundlage wäre unser berechtigtes Interesse an einer anonymen Statistik darüber, welche Inhalte gelesen werden, Art. 6 Abs. 1 lit. f DSGVO."
						en="We plan to resume analytics with PostHog, deliberately without cookies: the plan is the EU cloud in Frankfurt, no persistent identifier in your browser, anonymised IP addresses and no session recording. Because that does not access information on your device, § 25 TDDDG does not apply and no consent banner is needed. The legal basis would be our legitimate interest in anonymous statistics about which content is read, Art. 6(1)(f) GDPR."
					/>
					<T
						as="p"
						de="Sollte es doch bei Cookies oder Session Replay bleiben, wird PostHog erst nach deiner Zustimmung im Einwilligungsbanner geladen (Kategorie „Statistiken&ldquo;, siehe Abschnitt 7) — ohne Zustimmung läuft es dann gar nicht."
						en="Should it end up using cookies or session replay after all, PostHog will only load once you have agreed in the consent banner (category &ldquo;Statistics&rdquo;, see section 7) — without agreement it does not run at all."
					/>

					<T as="h3" de="Was wir nicht tun" en="What we do not do" />
					<ul>
						<T
							as="li"
							de="<b>Keine Werbenetzwerke, kein Profiling, keine automatisierte Entscheidungsfindung</b> im Sinne von Art. 22 DSGVO."
							en="<b>No ad networks, no profiling, no automated decision-making</b> within the meaning of Art. 22 GDPR."
						/>
						<T
							as="li"
							de="<b>Keine Verbindung zu Google Fonts.</b> Die Schriften werden beim Erstellen der Website mitgeliefert und von unserem eigenen Server ausgeliefert. Dein Browser lädt keine Schrift von Google."
							en="<b>No connection to Google Fonts.</b> The fonts are bundled when the website is built and served from our own server. Your browser loads no font from Google."
						/>
						<T
							as="li"
							de="<b>Wir verkaufen keine Daten</b> und geben sie nicht zu Werbezwecken weiter."
							en="<b>We do not sell data</b> and do not pass it on for advertising purposes."
						/>
					</ul>
				</div>
			</section>

			{/* 9 ------------------------------------------------------------ */}
			<section>
				<div className="wrap prose">
					<T as="h2" de="9. Empfänger" en="9. Recipients" />
					<T
						as="p"
						de="Wir setzen die folgenden Dienstleister ein. Mit allen bestehen Verträge zur Auftragsverarbeitung nach Art. 28 DSGVO; bei Anbietern aus den USA stützt sich die Übermittlung auf die EU-Standardvertragsklauseln nach Art. 46 Abs. 2 lit. c DSGVO und, soweit der Anbieter zertifiziert ist, auf das EU-US Data Privacy Framework nach Art. 45 DSGVO."
						en="We use the following service providers. Data processing agreements under Art. 28 GDPR are in place with all of them; for US providers the transfer relies on the EU standard contractual clauses under Art. 46(2)(c) GDPR and, where the provider is certified, on the EU-US Data Privacy Framework under Art. 45 GDPR."
					/>
					<div className="tablewrap">
						<table>
							<thead>
								<tr>
									<th>{t('Dienst', 'Service')}</th>
									<th>{t('Wofür', 'What for')}</th>
									<th>{t('Ort der Verarbeitung', 'Place of processing')}</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>AWS Amplify</td>
									<td>{t('Hosting der Website', 'Website hosting')}</td>
									<td>
										{t(
											'Frankfurt am Main (eu-central-1), Deutschland',
											'Frankfurt am Main (eu-central-1), Germany'
										)}
									</td>
								</tr>
								<tr>
									<td>Supabase</td>
									<td>
										{t(
											'Datenbank für Warteliste und Investoren-Anfragen',
											'Database for waitlist and investor enquiries'
										)}
									</td>
									<td>{t('Irland (eu-west-1), EU', 'Ireland (eu-west-1), EU')}</td>
								</tr>
								<tr>
									<td>Resend</td>
									<td>
										{t(
											'Versand der Bestätigungs- und Benachrichtigungs-E-Mails',
											'Sending confirmation and notification emails'
										)}
									</td>
									<td>{t('Irland (eu-west-1), EU', 'Ireland (eu-west-1), EU')}</td>
								</tr>
								<tr>
									<td>Stripe</td>
									<td>{t('Abwicklung von Spenden', 'Processing donations')}</td>
									<td>{t('Irland und USA', 'Ireland and USA')}</td>
								</tr>
								<tr>
									<td>Fourthwall</td>
									<td>{t('Merch-Shop und Versand', 'Merch shop and shipping')}</td>
									<td>{t('USA', 'USA')}</td>
								</tr>
								<tr>
									<td>Cookiebot (Usercentrics A/S)</td>
									<td>
										{t(
											'Einwilligungsbanner und Cookie-Erklärung',
											'Consent banner and cookie declaration'
										)}
									</td>
									<td>{t('Dänemark, EU', 'Denmark, EU')}</td>
								</tr>
								<tr>
									<td>PostHog</td>
									<td>
										{t('Reichweitenmessung (geplant)', 'Analytics (planned)')}
									</td>
									<td>
										{t(
											'Frankfurt am Main, EU (geplant)',
											'Frankfurt am Main, EU (planned)'
										)}
									</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</section>

			{/* 10 ----------------------------------------------------------- */}
			<section>
				<div className="wrap prose">
					<T as="h2" de="10. Deine Rechte" en="10. Your rights" />
					<T
						as="p"
						de="Dir stehen gegenüber uns die folgenden Rechte zu. Eine Nachricht an team@notiva.de genügt, eine Begründung brauchst du nicht."
						en="You have the following rights in relation to us. A message to team@notiva.de is enough; you do not need to give a reason."
					/>
					<ul>
						<T
							as="li"
							de="<b>Auskunft</b> darüber, welche Daten wir zu dir gespeichert haben (Art. 15 DSGVO)."
							en="<b>Access</b> to what data we hold about you (Art. 15 GDPR)."
						/>
						<T
							as="li"
							de="<b>Berichtigung</b> unrichtiger Daten (Art. 16 DSGVO)."
							en="<b>Rectification</b> of inaccurate data (Art. 16 GDPR)."
						/>
						<T
							as="li"
							de="<b>Löschung</b> (Art. 17 DSGVO) und <b>Einschränkung der Verarbeitung</b> (Art. 18 DSGVO)."
							en="<b>Erasure</b> (Art. 17 GDPR) and <b>restriction of processing</b> (Art. 18 GDPR)."
						/>
						<T
							as="li"
							de="<b>Datenübertragbarkeit</b>: Herausgabe deiner Daten in einem maschinenlesbaren Format (Art. 20 DSGVO)."
							en="<b>Data portability</b>: your data in a machine-readable format (Art. 20 GDPR)."
						/>
						<T
							as="li"
							de="<b>Widerspruch</b> gegen Verarbeitungen, die auf einem berechtigten Interesse beruhen (Art. 21 DSGVO)."
							en="<b>Objection</b> to processing based on a legitimate interest (Art. 21 GDPR)."
						/>
						<T
							as="li"
							de="<b>Widerruf deiner Einwilligung</b> jederzeit und ohne Angabe von Gründen (Art. 7 Abs. 3 DSGVO)."
							en="<b>Withdrawal of your consent</b> at any time and without giving reasons (Art. 7(3) GDPR)."
						/>
					</ul>
					<T
						as="h3"
						de="Beschwerderecht"
						en="Right to complain"
					/>
					<T
						as="p"
						de="Du kannst dich außerdem bei einer Datenschutz-Aufsichtsbehörde beschweren (Art. 77 DSGVO), insbesondere bei der Behörde deines gewöhnlichen Aufenthaltsorts, deines Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes."
						en="You may also lodge a complaint with a data protection supervisory authority (Art. 77 GDPR), in particular the authority of your habitual residence, your place of work or the place of the alleged infringement."
					/>
					<T
						as="h3"
						de="Änderungen dieser Erklärung"
						en="Changes to this policy"
					/>
					<T
						as="p"
						de="Wir passen diese Erklärung an, wenn sich die Website oder die eingesetzten Dienste ändern. Zum Start von Notiva wird sie vollständig überarbeitet, weil dann deutlich mehr Daten verarbeitet werden als heute."
						en="We adapt this policy when the website or the services used change. It will be fully revised at the Notiva launch, because considerably more data will be processed then than today."
					/>
					<T
						as="p"
						className="updated"
						de="Stand: September 2026"
						en="Last updated: September 2026"
					/>
					<T
						as="p"
						de={`Zurück zur <a href="/">Startseite</a>.`}
						en={`Back to the <a href="/">home page</a>.`}
					/>
					{/* Link kept as a real <Link> as well, so client navigation works
					    for the common path back to the landing page. */}
					<p>
						<Link href="/">{t('Startseite', 'Home')}</Link>
						{' · '}
						{supportEnabled && (
							<>
								<Link href="/support">{t('Unterstützen', 'Support')}</Link>
								{' · '}
							</>
						)}
						<Link href="/for-investors">{t('Für Investoren', 'For investors')}</Link>
					</p>
				</div>
			</section>

			<NotivaFooter
				left={{ de: 'Notiva · Deutschland', en: 'Notiva · Germany' }}
				right={{
					de: 'Keine Cookies zu Werbe- oder Analysezwecken.',
					en: 'No cookies for advertising or analytics.',
				}}
			/>
		</div>
	);
}
