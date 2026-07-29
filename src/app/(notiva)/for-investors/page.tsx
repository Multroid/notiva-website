'use client';

/* Port of Designs/Example designs/Notiva Design/For Investors.html.
   Every data-de / data-en pair becomes <T de en/> or useT(); the FAQ uses real
   <details>/<summary> so the CSS "+ → ×" rotation still works; the
   [data-notiva-modal] click delegation from assets/notiva-modal.js becomes
   useNotivaModal().open(), including its e.preventDefault() (the anchors that
   carry it never navigate). */

import React from 'react';
import Link from 'next/link';

import { NotivaHeader } from '@/components/notiva/notiva-header';
import { useNotivaTitle } from '@/components/notiva/use-notiva-title';
import { NotivaFooter } from '@/components/notiva/notiva-footer';
import { Novi } from '@/components/notiva/novi';
import { T, useLang, useT } from '@/components/notiva/lang-context';
import { useNotivaModal } from '@/components/notiva/modal-context';

import '@/styles/notiva/for-investors.css';

export default function ForInvestorsPage(): React.JSX.Element {
	const { lang } = useLang();
	const t = useT();
	const { open } = useNotivaModal();

	/* <html data-title-*> equivalent: setLang() in the source rewrites
	   document.title on every language change. */
	useNotivaTitle('Notiva · Für Investoren', 'Notiva · For Investors');

	return (
		<div className="notiva-shell nv-investors" lang={lang}>
			<NotivaHeader current="investors" />

			<section className="hero">
				<div className="wrap">
					<T
						as="div"
						className="eyebrow"
						de="Pre-Seed · Notiva · Deutschland"
						en="Pre-seed · Notiva · Germany"
					/>
					<T
						as="h1"
						de="Nie wieder Angst vor dem Finanzamt. Als Geschäftsmodell."
						en="Never fear the Finanzamt again. As a business model."
					/>
					<T
						as="p"
						className="lede"
						de="Notiva ist das KI-native Finanz-Backoffice für Selbstständige in Deutschland. Es liest Bank, E-Mail und Dokumente das ganze Jahr, erledigt Buchhaltung und Steuerpflichten automatisch und warnt, bevor etwas Geld kostet."
						en="Notiva is the AI-native financial back office for the self-employed in Germany. It reads bank, email and documents year-round, handles bookkeeping and tax obligations automatically, and warns before anything costs money."
					/>
					<div className="actions">
						<a
							className="btn btn-solid"
							href="#kontakt"
							onClick={(e) => {
								e.preventDefault();
								open('deck');
							}}
						>
							{t('Deck anfragen', 'Request the deck')}
						</a>
						<a className="btn btn-ghost" href="#kontakt">
							{t('Gespräch vereinbaren', 'Book a call')}
						</a>
					</div>
					<div className="raise">
						<T
							de="Wir sammeln eine <b>Pre-Seed-Runde ein</b>"
							en="We are <b>raising a pre-seed round</b>"
						/>
						<i />
						<T de="Höhe auf Anfrage" en="Size on request" />
						<i />
						<T de="Deck nach kurzer Anfrage" en="Deck shared on request" />
					</div>
					<div className="facts">
						<div className="fact">
							<T de="Status" en="Status" />
							<T as="strong" de="Pre-Seed offen" en="Pre-seed open" />
							<T
								as="em"
								de="Höhe und Konditionen auf Anfrage"
								en="Size and terms on request"
							/>
						</div>
						<div className="fact">
							<T de="Pilotnutzer" en="Pilot users" />
							<T
								as="strong"
								de="3 Testphasen, ~250 Pilotnutzer"
								en="3 testing phases, ~250 pilot users"
							/>
							<T as="em" de="Weitere kommen dazu" en="More onboarding now" />
						</div>
						<div className="fact">
							<T de="Öffentliche Förderung" en="Public funding" />
							<T as="strong" de="EXIST eingereicht" en="EXIST filed" />
							<T
								as="em"
								de="Antrag liegt vor, Entscheidung offen"
								en="Application submitted, decision pending"
							/>
						</div>
						<div className="fact">
							<T de="Markt" en="Market" />
							<T as="strong" de="Deutschland zuerst" en="Germany first" />
							<T
								as="em"
								de="Umsatzsteuerpflichtige Solo-Selbstständige, €50 bis 200k Umsatz"
								en="VAT-registered solo self-employed, €50 to 200k revenue"
							/>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="wrap">
					<T as="div" className="eyebrow" de="Das Problem" en="The problem" />
					<T
						as="h2"
						de="Selbstständige führen ihre Finanzen im Blindflug."
						en="The self-employed run their finances blind."
					/>
					<T
						as="p"
						className="body"
						de="Der Kern ist nicht Zeit und nicht Geld, sondern Angst. Im November weiß niemand, was das Finanzamt im März verlangt: UStVA monatlich, Vorauszahlung quartalsweise, Bescheid irgendwann, dazwischen ein ungebuchter Beleg im Postfach."
						en="The core is not time or money, it is fear. In November nobody knows what the Finanzamt will ask in March: UStVA monthly, prepayment quarterly, the Bescheid whenever, and an unbooked receipt sitting in an inbox."
					/>
					<T
						as="p"
						className="body"
						de="Bestehende Werkzeuge sind episodisch: Hilfe zur Steuererklärung, elf Monate Stille. Notiva verkauft Gewissheit. Ersparnis und Zeit sind Belege, nie die Überschrift."
						en="Existing tools are episodic: help at filing season, eleven months of silence. Notiva sells certainty. Savings and time are proof points, never the headline."
					/>
					<T
						as="div"
						className="quote"
						de="„Berechnet, nie geraten. Jede Empfehlung mit Beleg.“"
						en="“Calculated, never guessed. Every recommendation with its evidence.”"
					/>
				</div>
			</section>

			<section>
				<div className="wrap">
					<T as="div" className="eyebrow" de="Warum jetzt" en="Why now" />
					<T
						as="h2"
						de="Fünf Verschiebungen, die gleichzeitig eintreten."
						en="Five shifts arriving at the same time."
					/>
					<div className="grid g3">
						<div className="card">
							<span className="num">01</span>
							<T as="h3" de="E-Rechnungspflicht" en="E-invoicing mandate" />
							<T
								as="p"
								de="XRechnung und ZUGFeRD rollen durch Deutschland. Jeder Selbstständige muss strukturierte Rechnungen verarbeiten, ein erzwungener Anlass zum Werkzeugwechsel."
								en="XRechnung and ZUGFeRD are rolling through Germany. Every self-employed person must process structured invoices, a forced reason to change tools."
							/>
						</div>
						<div className="card">
							<span className="num">02</span>
							<T as="h3" de="FIDA und Open Finance" en="FIDA and open finance" />
							<T
								as="p"
								de="Der regulatorische Rahmen öffnet Finanzdaten über Konten hinaus. Wer die Ingestion-, Kategorisierungs- und Pflichten-Engine sauber baut, kann sie später lizenzieren."
								en="The regulatory frame opens financial data beyond accounts. Whoever builds the ingestion, categorisation and obligation engines cleanly can license them later."
							/>
						</div>
						<div className="card">
							<span className="num">03</span>
							<T as="h3" de="Steuerberatermangel" en="Steuerberater shortage" />
							<T
								as="p"
								de="Kanzleien nehmen kleine Mandate ungern an, Honorare steigen. Solo-Selbstständige brauchen Vorarbeit, die eine Kanzlei akzeptiert."
								en="Kanzleien are reluctant to take small mandates and fees are rising. The solo self-employed need preparatory work a Kanzlei will accept."
							/>
						</div>
						<div className="card">
							<span className="num">04</span>
							<T
								as="h3"
								de="Solo-Selbstständigkeit wächst"
								en="Solo self-employment is growing"
							/>
							<T
								as="p"
								de="Beratung, IT, Design, Marketing, Coaching, Medien: dienstleistungsbasiert, laptopgebunden, oft mit internationalen B2B-Kunden. Genau unser ICP."
								en="Consulting, IT, design, marketing, coaching, media: service-based, laptop-bound, often with international B2B clients. Precisely our ICP."
							/>
						</div>
						<div className="card">
							<span className="num">05</span>
							<T
								as="h3"
								de="Bank-APIs sind Infrastruktur"
								en="Banking APIs are infrastructure"
							/>
							<T
								as="p"
								de="PSD2-Zugang über finAPI ist Commodity. Der Wettbewerbsvorteil liegt nicht mehr im Kontozugang, sondern darin, was zusätzlich gelesen wird."
								en="PSD2 access via finAPI is a commodity. The advantage is no longer account access but what else you read."
							/>
						</div>
						<div className="card tri">
							<span className="num">Fazit</span>
							<T
								as="h3"
								de="KI ist der Mechanismus, nicht die Überschrift"
								en="AI is the mechanism, not the headline"
							/>
							<T
								as="p"
								de="„KI-native“ ist als Claim weitgehend verbraucht, Wettbewerber nutzen ihn selbst. Verteidigbar ist Compliance-Tiefe: zertifizierte Abgabewege, deutsche Steuerlogik, GoBD-Archivierung, Kanzlei-Workflows."
								en="“AI-native” is largely spent as a claim, competitors use it themselves. What is defensible is compliance depth: certified filing rails, German tax logic, GoBD archiving, Kanzlei workflows."
							/>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="wrap">
					<T as="div" className="eyebrow" de="Der Unterschied" en="The differentiator" />
					<T
						as="h2"
						de="Durchgehende Tri-Source-Erfassung."
						en="Continuous tri-source ingestion."
					/>
					<T
						as="p"
						className="lede"
						de="Bank plus E-Mail plus Dokumente, das ganze Jahr gelesen und in ein belegverknüpftes Journal abgeglichen. Kein Wettbewerber im deutschen Freelancer-Markt macht alle drei."
						en="Bank plus email plus documents, read year-round and reconciled into one evidence-linked ledger. No competitor in the German freelancer market does all three."
					/>
					<div className="grid g3">
						<div className="card">
							<T as="span" className="num" de="Quelle 1" en="Source 1" />
							<T as="h3" de="Bank" en="Bank" />
							<T
								as="p"
								de="Kontobewegungen über PSD2. Zeigt, dass Geld geflossen ist, nie warum."
								en="Account movement via PSD2. Shows that money moved, never why."
							/>
						</div>
						<div className="card">
							<T as="span" className="num" de="Quelle 2" en="Source 2" />
							<T as="h3" de="E-Mail" en="Email" />
							<T
								as="p"
								de="Rechnungen, Preiserhöhungen, Kündigungsfristen, Bescheide. Der Kontext, den die Bank nicht kennt."
								en="Invoices, price increases, notice periods, Bescheide. The context the bank does not have."
							/>
						</div>
						<div className="card">
							<T as="span" className="num" de="Quelle 3" en="Source 3" />
							<T as="h3" de="Dokumente" en="Documents" />
							<T
								as="p"
								de="Belege, Verträge und Bescheide: OCR-gelesen, GoBD-konform archiviert, an die Buchung geknüpft."
								en="Receipts, contracts and notices: OCR-read, archived GoBD-compliant, tied to the booking."
							/>
						</div>
					</div>
					<T
						as="p"
						className="body"
						de="Alles andere folgt daraus: die Preiserhöhung in einer E-Mail, die unbezahlte Rechnung, die nicht notierte Frist. Novi erklärt und begründet; die Zahlen kommen aus einer deterministischen Engine, nicht aus einem Sprachmodell."
						en="Everything else follows: the price hike in an email, the unpaid invoice, the deadline nobody noted. Novi explains and reasons; the numbers come from a deterministic engine, not a language model."
					/>
				</div>
			</section>

			<section>
				<div className="wrap">
					<T as="div" className="eyebrow" de="Produkt" en="Product" />
					<T as="h2" de="Gebaut, nicht gezeichnet." en="Built, not drawn." />
					<T
						as="p"
						className="lede"
						de="Aufnahmen aus dem laufenden Produkt. Zahlen sind Testdaten aus den Pilotphasen."
						en="Captures from the working product. Figures are pilot-phase test data."
					/>
					<div className="shots">
						<div>
							<div className="shot">
								<div className="chrome">
									<b />
									<b />
									<b />
									<span>Notiva · Steuern</span>
								</div>
								<div className="frame">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src="/notiva/shot-tax-crop.png" alt="Notiva Steuer-Ansicht" />
								</div>
							</div>
							<T
								as="p"
								className="cap"
								de="<b>Steuern.</b> Zurückgelegter Steuerbetrag, Vollständigkeit der Bücher, UStVA-Stand des Quartals, Vorauszahlungen im Jahresverlauf, plus DATEV-fähige Übergabe an die Kanzlei."
								en="<b>Tax.</b> Money set aside, completeness of the books, this quarter's UStVA position, prepayments across the year, plus a DATEV-ready handoff to the Kanzlei."
							/>
						</div>
						<div>
							<div className="shot">
								<div className="chrome">
									<b />
									<b />
									<b />
									<span>Notiva · Finanzen</span>
								</div>
								<div className="frame">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src="/notiva/shot-fin-crop.png" alt="Notiva Finanz-Ansicht" />
								</div>
							</div>
							<T
								as="p"
								className="cap"
								de="<b>Finanzen.</b> Alle Konten in einem Bild, Auffälligkeiten und Betrugsverdacht markiert, wiederkehrende Kosten erkannt. Jede Empfehlung von Novi verweist auf den Beleg."
								en="<b>Finances.</b> Every account in one view, anomalies and suspected fraud flagged, recurring costs detected. Every Novi recommendation points at its evidence."
							/>
						</div>
						<div>
							<div className="shot">
								<div className="chrome">
									<b />
									<b />
									<b />
									<span>Notiva · Übersicht</span>
								</div>
								<div className="frame">
									{/* eslint-disable-next-line @next/next/no-img-element */}
									<img src="/notiva/shot-home.png" alt="Notiva Übersicht" />
								</div>
							</div>
							<T
								as="p"
								className="cap"
								de="<b>Übersicht.</b> Was als Nächstes fällig ist, was Aufmerksamkeit braucht, was zurückgelegt ist. Die Action Inbox ist der monatliche Rhythmus, der Retention erzeugt."
								en="<b>Overview.</b> What is due next, what needs attention, what is set aside. The Action Inbox is the monthly rhythm that produces retention."
							/>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="wrap">
					<T as="div" className="eyebrow" de="Verteidigbarkeit" en="Defensibility" />
					<T
						as="h2"
						de="Compliance-Tiefe ist der Burggraben."
						en="Compliance depth is the moat."
					/>
					<div className="grid g2">
						<div className="card">
							<T as="h3" de="Zertifizierte Abgabewege" en="Certified filing rails" />
							<T
								as="p"
								de="ERiC-Entwicklerregistrierung und ELSTER-Abgabe für UStVA, EÜR und ZM. Das ist Arbeit, die eine Plattformschicht nicht nebenbei erledigt."
								en="ERiC developer registration and ELSTER filing for UStVA, EÜR and ZM. This is work a platform layer does not do casually."
							/>
						</div>
						<div className="card">
							<T as="h3" de="StBerG-Grenze, schriftlich" en="The StBerG line, in writing" />
							<T
								as="p"
								de="Ein anwaltlich geprüftes Memo definiert genau, was Novi sagen darf und was nicht. Novi erteilt keine individuelle Steuerberatung."
								en="A counsel-reviewed memo defines exactly what Novi may and may not say. Novi does not give individual tax advice."
							/>
						</div>
						<div className="card">
							<T as="h3" de="GoBD und DSGVO" en="GoBD and GDPR" />
							<T
								as="p"
								de="Revisionssichere Archivierung, AVV mit finAPI, Verzeichnis der Verarbeitungstätigkeiten, DSFA für KI-Verarbeitung, dokumentierte TOMs, EU-AI-Act-Einordnung."
								en="Audit-proof archiving, DPA with finAPI, ROPA, DPIA for AI processing, documented TOMs, EU AI Act classification."
							/>
						</div>
						<div className="card">
							<T
								as="h3"
								de="Mit der Kanzlei, nicht gegen sie"
								en="With the Kanzlei, not against it"
							/>
							<T
								as="p"
								de="Notiva ersetzt keinen Steuerberater, sondern liefert eine DATEV-fähige Übergabe mit Deckblatt für Urteilsfragen. Das macht die Kanzlei zum Vertriebskanal."
								en="Notiva does not replace a Steuerberater. It delivers a DATEV-ready handoff with a coversheet for judgement calls, which turns the Kanzlei into a distribution channel."
							/>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="wrap">
					<T as="div" className="eyebrow" de="Weg" en="Path" />
					<T
						as="h2"
						de="Eine Firma in vier Stufen, nicht vier Firmen."
						en="One company in four stages, not four companies."
					/>
					<div className="stages">
						<div className="stage">
							<T as="div" className="when" de="Jetzt · Stufe 1" en="Now · Stage 1" />
							<div>
								<T as="h3" de="Compliance-Autopilot" en="Compliance Autopilot" />
								<T
									as="p"
									de="Das Freelancer-Backoffice: Erfassung, deterministische Analyse, UStVA und EÜR, Fristen, Action Inbox, Novi. Der monatliche Rhythmus löst das Retention-Problem episodischer Steuerprodukte."
									en="The freelancer back office: ingestion, deterministic analytics, UStVA and EÜR, deadlines, Action Inbox, Novi. The monthly rhythm solves the retention problem episodic tax products have."
								/>
							</div>
						</div>
						<div className="stage">
							<T as="div" className="when" de="Jahr 2 · Stufe 2" en="Year 2 · Stage 2" />
							<div>
								<T as="h3" de="Steuerberater-Schicht" en="Steuerberater layer" />
								<T
									as="p"
									de="Partnerportal und SaaS pro Mandat. 500 Kanzleien entsprechen 50.000 Nutzern bei nahezu keinen Akquisitionskosten, setzt aber Stufe 1 als Nachweis voraus."
									en="Partner portal and per-mandate SaaS. 500 Kanzleien equals 50,000 users at near-zero acquisition cost, but requires Stage 1 as its proof."
								/>
							</div>
						</div>
						<div className="stage">
							<T as="div" className="when" de="Jahr 3+ · Stufe 3" en="Year 3+ · Stage 3" />
							<div>
								<T as="h3" de="FIDA-Infrastruktur" en="FIDA infrastructure" />
								<T
									as="p"
									de="Lizenzierung der Erfassungs-, Kategorisierungs- und Pflichten-Engines an Banken und Versicherer. Verlangt heute nichts außer architektonischer Disziplin."
									en="Licensing the ingestion, categorisation and obligation engines to banks and insurers. Requires nothing today beyond architectural discipline."
								/>
							</div>
						</div>
						<div className="stage">
							<T as="div" className="when" de="Ab Seed · Stufe 4" en="At seed · Stage 4" />
							<div>
								<T as="h3" de="Banking" en="Banking" />
								<T
									as="p"
									de="Geschäftskonto, Karte, Steuer-Sweeps. Tiefster Burggraben und höchster ARPU, aber operativ schwer, bewusst nicht im Pre-Seed."
									en="Business account, card, tax sweeps. Deepest moat and highest ARPU, but operationally heavy, deliberately not at pre-seed."
								/>
							</div>
						</div>
					</div>
					<T
						as="p"
						className="body"
						de="Bewusst nicht aktiviert: die Consumer-Erzählung. Beste Geschichte, schlechtestes erstes Geschäft. Sie wird zur Expansionsgeschichte, sobald der Freelancer-Kern belegt ist."
						en="Deliberately not activated: the consumer narrative. Best story, worst first business. It becomes the expansion story once the freelancer core is proven."
					/>
				</div>
			</section>

			<section>
				<div className="wrap">
					<T as="div" className="eyebrow" de="Traction" en="Traction" />
					<T as="h2" de="Was heute belegt ist." en="What is proven today." />
					<div className="grid g3">
						<div className="card">
							<T as="span" className="num" de="Pilot" en="Pilot" />
							<T
								as="h3"
								de="3 Testphasen, ~250 Pilotnutzer"
								en="3 testing phases, ~250 pilot users"
							/>
							<T
								as="p"
								de="Drei Testphasen mit echten Selbstständigen. Weitere Nutzer kommen laufend dazu."
								en="Three testing phases with real self-employed users. More are onboarding continuously."
							/>
						</div>
						<div className="card">
							<T as="span" className="num" de="Förderung" en="Funding" />
							<T as="h3" de="EXIST eingereicht" en="EXIST filed" />
							<T
								as="p"
								de="Der Antrag liegt vor. Die Pre-Seed-Runde ist neben EXIST geplant, nicht als Ersatz."
								en="The application is filed. The pre-seed round is planned alongside EXIST, not instead of it."
							/>
						</div>
						<div className="card">
							<T as="span" className="num" de="Produkt" en="Product" />
							<T as="h3" de="Kern läuft" en="Core is running" />
							<T
								as="p"
								de="Erfassung aus Bank, E-Mail und Dokumenten, deterministische Analyse und Steueransicht sind gebaut und im Pilot im Einsatz."
								en="Ingestion from bank, email and documents, deterministic analytics and the tax view are built and in pilot use."
							/>
						</div>
					</div>
					<T
						as="p"
						className="body"
						de="Wir nennen keine Umsatz- oder Retention-Zahlen, solange sie nicht belastbar sind. Alles Weitere, von Kohorten und Pilot-Feedback bis Roadmap-Details und Finanzplan, liegt im Deck und im Gespräch."
						en="We do not quote revenue or retention figures until they are robust. Everything else, from cohorts and pilot feedback to roadmap detail and the financial plan, is in the deck and in conversation."
					/>
				</div>
			</section>

			<section>
				<div className="wrap">
					<T as="div" className="eyebrow" de="Risiken, offen benannt" en="Risks, stated openly" />
					<T
						as="h2"
						de="Drei Dinge, die schiefgehen können."
						en="Three things that can go wrong."
					/>
					<div className="grid g3">
						<div className="risk">
							<T as="h3" de="Etablierter Wettbewerb" en="Incumbent competition" />
							<T
								as="p"
								de="Accountable hat über 100.000 Nutzer, menschliche Coaches und eine Steuergarantie. Der Preis ist vom Markt auf €19 bis 30 festgelegt, über den Preis ist nicht zu gewinnen."
								en="Accountable has 100K+ users, human coaches and a tax guarantee. Price is fixed by the market at €19 to 30, so price is not a way to win."
							/>
							<div className="mit">
								<T as="b" de="Antwort" en="Answer" />
								<T
									de="Gewinnen über Erfassungsbreite und Ergebnisqualität, nicht über Preis. Die Antwort auf die Steuergarantie ist eine offene Entscheidung vor Launch und liegt im Deck."
									en="Win on breadth of ingestion and quality of outcome, not price. Our answer to the tax guarantee is an open pre-launch decision and is in the deck."
								/>
							</div>
						</div>
						<div className="risk">
							<T as="h3" de="Die Plattformschicht" en="The platform layer" />
							<T
								as="p"
								de="Modellanbieter und Neobanken könnten Finanzassistenz bündeln und verschenken. Das entwertet den Assistenten als Produktkategorie."
								en="Model providers and neobanks could bundle financial assistance and give it away. That devalues the assistant as a product category."
							/>
							<div className="mit">
								<T as="b" de="Antwort" en="Answer" />
								<T
									de="Sie werden keine ERiC-Abgabe, keine GoBD-Archivierung, keine regulierte Vermittlung und keine Kanzlei-Workflows bauen. Genau dort liegt unser Produkt."
									en="They will not build ERiC filing, GoBD archiving, regulated brokerage or Kanzlei workflows. That is exactly where our product sits."
								/>
							</div>
						</div>
						<div className="risk">
							<T as="h3" de="Kleines Team" en="Small team" />
							<T
								as="p"
								de="Ein kleines Gründungsteam baut gleichzeitig Regulatorik, Erfassung und Produkt. Zwei Stufen parallel zu verfolgen ist der wahrscheinlichste Fehlermodus."
								en="A small founding team is building regulation, ingestion and product at once. Pursuing two stages at the same time is the most likely failure mode."
							/>
							<div className="mit">
								<T as="b" de="Antwort" en="Answer" />
								<T
									de="Nur Stufe 1 ist aktiv. Die Runde finanziert erste Einstellungen und 18 bis 20 Monate Runway bis zu den Seed-Kennzahlen."
									en="Only Stage 1 is active. The round funds first hires and 18 to 20 months of runway to seed metrics."
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section>
				<div className="wrap">
					<T as="div" className="eyebrow" de="Häufige Fragen" en="Frequently asked" />
					<T as="h2" de="Was Investoren zuerst fragen." en="What investors ask first." />
					<div className="faq">
						<details>
							<T
								as="summary"
								de="Wie hoch ist die Runde?"
								en="How large is the round?"
							/>
							<T
								as="p"
								de="Wir sammeln eine Pre-Seed-Runde neben der EXIST-Förderung ein. Höhe, Konditionen und Verwendung der Mittel nennen wir auf Anfrage und im Deck."
								en="We are raising a pre-seed round alongside EXIST funding. Size, terms and use of funds are shared on request and in the deck."
							/>
						</details>
						<details>
							<T
								as="summary"
								de="Ersetzt Notiva den Steuerberater?"
								en="Does Notiva replace the Steuerberater?"
							/>
							<T
								as="p"
								de="Nein. Notiva arbeitet mit der Kanzlei: DATEV-fähige Übergabe, kategorisierte Buchungen, gescannte Belege, Deckblatt für Urteilsfragen. Das StBerG setzt die Grenze, wir halten sie schriftlich fest."
								en="No. Notiva works with the Kanzlei: DATEV-ready handoff, categorised bookings, scanned receipts, a coversheet for judgement calls. The StBerG draws the line and we hold it in writing."
							/>
						</details>
						<details>
							<T
								as="summary"
								de="Was passiert, wenn das Sprachmodell halluziniert?"
								en="What happens when the language model hallucinates?"
							/>
							<T
								as="p"
								de="Novi erzeugt keine Zahlen. Jede Zahl kommt reproduzierbar aus einer deterministischen Engine; Novi erklärt sie und verweist auf den Beleg. Das ist Korrektheitsanforderung und Argument gegen Chat-Produkte zugleich."
								en="Novi does not generate numbers. Every figure comes reproducibly from a deterministic engine; Novi explains it and points at the evidence. That is both a correctness requirement and our argument against chat-first products."
							/>
						</details>
						<details>
							<T
								as="summary"
								de="Warum Deutschland zuerst und nicht Europa?"
								en="Why Germany first and not Europe?"
							/>
							<T
								as="p"
								de="Steuern folgen dem Wohnsitz, nicht dem Sitz der Kunden: Ein Freelancer in Deutschland mit Kunden in fünf Ländern reicht hier ein. Tiefe in einer Jurisdiktion schlägt Breite. Europa ist eine Erzählung ab Jahr 3."
								en="Tax follows residency, not the clients' locations: a Germany-resident freelancer with clients in five countries files here. Depth in one jurisdiction beats breadth. Europe is a year-3 narrative."
							/>
						</details>
						<details>
							<T
								as="summary"
								de="Verdient Notiva an Provisionen?"
								en="Does Notiva earn commissions?"
							/>
							<T
								as="p"
								de="Abonnements sind die Haupteinnahmequelle. Kommt später Vermittlung dazu, wird sie von der Empfehlungslogik getrennt und offengelegt, mit Rückvergütung oder Pauschaloption für bezahlte Tarife. Ein Interessenkonflikt wäre die schärfste Angriffslinie gegen uns."
								en="Subscriptions are the primary revenue. Where brokerage is added later it is separated from the recommendation logic and disclosed, with a rebate or flat-fee option on paid tiers. A conflict of interest would be the sharpest attack line against us."
							/>
						</details>
						<details>
							<T
								as="summary"
								de="Wie sieht die nächste Runde aus?"
								en="What does the next round look like?"
							/>
							<T
								as="p"
								de="Die Seed-Runde wird mit Kennzahlen gekauft, nicht mit Erzählung: zahlende Nutzer im vierstelligen Bereich, Sechs-Monats-Retention, LTV/CAC, erste Kanzlei-Partner, ERiC live, ein vollständiges Steuerjahr. Zielwerte im Deck."
								en="The seed round is bought with metrics, not narrative: paying users in the low thousands, six-month retention, proven LTV/CAC, first Kanzlei partners, ERiC filing live, one complete tax year. Targets are in the deck."
							/>
						</details>
					</div>
				</div>
			</section>

			<section className="cta" id="kontakt">
				<div className="wrap">
					<div className="split">
						<div>
							<div className="novi-cta">
								<Novi pose="hold-doc" alt="" />
								<T
									as="p"
									de="Novi hält das Deck bereit."
									en="Novi has the deck ready."
								/>
							</div>
							<T
								as="div"
								className="eyebrow"
								style={{ color: 'var(--paper)' }}
								de="Kontakt"
								en="Contact"
							/>
							<T as="h2" de="Deck anfragen." en="Request the deck." />
							<T
								as="p"
								className="lede"
								de="Das Deck und der Finanzplan gehen nach einer kurzen Anfrage heraus. Drei Felder, keine Formalitäten."
								en="The deck and financial plan go out after a short request. Three fields, no formalities."
							/>
							<div className="ctabtns">
								<button
									className="btn btn-paper-solid"
									type="button"
									onClick={() => open('deck')}
								>
									{t('Deck anfragen', 'Request the deck')}
								</button>
								<button
									className="btn btn-paper"
									type="button"
									onClick={() => open('waitlist')}
								>
									{t('Auf die Warteliste', 'Join the waitlist')}
								</button>
							</div>
							<T
								as="p"
								className="note"
								de="Drei Felder: Name, Firma, E-Mail. Ein Onepager ist in Arbeit, bis dahin verschicken wir Deck und Kurzprofil auf Anfrage."
								en="Three fields: name, company, email. A one-pager is in preparation, until then we send the deck and a short profile on request."
							/>
						</div>
						<div className="direct">
							<div className="line">
								<T de="Direkt an" en="Direct to" />
								<a href="mailto:hikmat.imanov@notiva.de?subject=Notiva%20Pre-Seed">
									hikmat.imanov@notiva.de
								</a>
								<T as="em" de="Gründer · Notiva" en="Founder · Notiva" />
							</div>
							<div className="line">
								<T de="Gespräch" en="Call" />
								<a href="mailto:hikmat.imanov@notiva.de?subject=Notiva%20-%20Gespraech">
									{t('30 Minuten vereinbaren', 'Book 30 minutes')}
								</a>
								<T
									as="em"
									de="Schreib zwei Zeitfenster, wir bestätigen eines."
									en="Send two time windows and we confirm one."
								/>
							</div>
							<div className="line">
								<T
									de="Unterstützen ohne zu investieren"
									en="Support without investing"
								/>
								{/* the source anchor points at the landing page but is
								    intercepted by [data-notiva-modal], so it never navigates */}
								<Link
									href="/"
									onClick={(e) => {
										e.preventDefault();
										open('waitlist');
									}}
								>
									{t('Auf die Warteliste →', 'Join the waitlist →')}
								</Link>
								<T
									as="em"
									de="Pilotnutzer, Kanzlei-Partner und Weiterempfehlungen helfen uns genauso."
									en="Pilot users, Kanzlei partners and referrals help us just as much."
								/>
							</div>
						</div>
					</div>
				</div>
			</section>

			<NotivaFooter
				left={{ de: 'Notiva · Deutschland', en: 'Notiva · Germany' }}
				right={{
					de: 'Diese Seite ist keine Anlageberatung und kein Angebot von Wertpapieren.',
					en: 'This page is not investment advice and not an offer of securities.',
				}}
			/>
		</div>
	);
}
