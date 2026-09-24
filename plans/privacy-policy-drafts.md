---
title: Privacy policy — open points
created: 2026-09-22
updated: 2026-09-24
version: 1.1.0
status: active
owners: [Hiki]
sources:
  - src/app/(notiva)/datenschutz/page.tsx
  - src/app/(notiva)/datenschutz/layout.tsx
---

# Privacy policy — open points

**Status:** Active · **Created:** 2026-09-22 · **Updated:** 2026-09-24 · **Version:** 1.1.0

<details>
<summary><strong>Revision history</strong></summary>

| Date | Version | Change | By |
|---|---|---|---|
| 2026-09-24 | 1.1.0 | main merged into dev, so the draft page now lives only in git history. Sections renumbered after donations and merch left the policy (1–8). | Claude |
| 2026-09-22 | 1.0.0 | Initial version: the eight placeholders removed from /datenschutz on main, what each still needs, and the draft banner verbatim. | Claude (Opus 5) |

</details>

On `main` the page at `/datenschutz` carries no placeholders any more: every
point only the operator can answer was removed rather than guessed. The older
draft, where each of them is still visible on the page as an orange `[ … ]`
marker, is no longer on any branch since main was merged into dev; read it with
`git show 58b2c29:'src/app/(notiva)/datenschutz/page.tsx'`. This file is the
list of what those markers asked for.

The section numbers below are the current ones. With the support section
switched off (`src/lib/support.ts`) the policy no longer covers donations or
merch, so the former §4 Spenden and §5 Merch-Bestellungen are gone and
everything after them moved up by two.

Notiva is not a founded company yet, and four of the eight points below wait on
that. Until it is founded there is nothing to fill in, so the published page
says so in §1 instead of leaving a blank where a Verantwortlicher belongs.

## Open points

| § | What the placeholder asked for | What it needs |
|---|---|---|
| 1 Verantwortlicher | "Vollständiger Firmenname und Rechtsform, Straße und Hausnummer, PLZ und Ort, Land, vertreten durch" | Exists only once the company does. `main` names "das Team hinter Notiva" as controller and states that Notiva is not founded yet. Art. 13 Abs. 1 lit. a DSGVO expects an identity and a postal address, and the site deliberately publishes no personal name (`src/app/llms.txt/route.ts:120`) — put that conflict to the lawyer rather than leaving it to resolve itself. |
| 1 Datenschutzbeauftragter | DPO contact details, or the finding that none must be appointed (§ 38 BDSG: from 20 persons continuously processing) | Heading dropped on `main`. Art. 13 Abs. 1 lit. b asks for one only where a DPO exists; restore the block if one is ever appointed. |
| 3 Investoren-Anfragen | "Frist festlegen, z. B. 24 Monate" after the last contact | `main` keeps the criterion ("solange ein Kontakt für Folgerunden sinnvoll ist; anschließend löschen wir die Anfrage") but no cap. Decide the cap, then honour it: rows live in `public.investor_lead` (`src/app/api/investor-deck/route.ts:57`). |
| 4 Hosting und Server-Logs | "Aufbewahrungsdauer der Server-Logs angeben, sobald in Amplify geprüft" | Check the Amplify access-log window and the retention set on the CloudWatch log group of the SSR compute, then state a period. §4 currently states none. |
| 6 PostHog | The region actually chosen, the retention, and whether it stays cookieless without session replay | Confirm at integration time. The section describes a plan, and says so. |
| 7 Empfänger | AVV per provider, Verzeichnis der Verarbeitungstätigkeiten (Art. 30), DPF certification per provider, and whether a US parent can reach EU-region data | All still to do. Note that §7 asserts "Mit allen bestehen Verträge zur Auftragsverarbeitung nach Art. 28 DSGVO" without qualification. The removed donations and merch sections described Stripe and Fourthwall as their own controllers — check which instrument applies to those two before they come back. |
| 8 Beschwerderecht | "Zuständige Aufsichtsbehörde nach Firmensitz eintragen, mit Anschrift und Website" | `main` cites Art. 77 DSGVO instead, which points a reader at the authority of their residence, workplace or the place of the alleged infringement. Name the competent authority once there is a seat. |
| Stand | "Datum der ersten Veröffentlichung" | `main` reads "Stand: September 2026". Move it whenever the text moves. |

## Before the page is released to search engines

1. Lawyer review of the whole text — the reason the page is still `NOINDEX`.
2. `src/app/(notiva)/datenschutz/layout.tsx`: drop `robots: NOINDEX`.
3. `src/app/sitemap.ts`: add `/datenschutz`.

## The draft banner, as it stood

Removed from `main` together with the `.draft` and `.todo` styles in
`src/styles/notiva/legal.css`. Kept here in case the page has to be marked as a
draft again:

```
DE  Entwurf — noch nicht rechtlich geprüft
    Diese Fassung ist eine Vorlage. Die Angaben zur Technik sind korrekt und aus
    dem Quellcode dieser Website abgeleitet. Die orange markierten Stellen müssen
    noch ausgefüllt werden, und der Text muss vor dem Start von einer
    Rechtsanwältin oder einem Rechtsanwalt geprüft werden. Bis dahin ist diese
    Seite nicht für Suchmaschinen freigegeben.

EN  Draft — not yet reviewed by a lawyer
    This version is a template. The technical statements are accurate and derived
    from this website's source code. The passages highlighted in orange still need
    to be filled in, and the text must be reviewed by a lawyer before launch.
    Until then this page is not released to search engines.
```

## Noticed while clearing the placeholders, left unchanged

Neither was a placeholder, so neither was touched — both belong in the lawyer
review.

- The removed Spenden section kept payment records "nach § 147 AO und § 257 HGB zehn Jahre". Two doubts:
  the retention for Buchungsbelege was shortened to eight years by the fourth
  Bürokratieentlastungsgesetz with effect from 1 January 2025, and § 257 HGB
  binds Kaufleute, which an unfounded Notiva is not.
  <!-- unverified: read from memory of the statute, not re-checked against the current text -->
- The site has no Impressum route. § 5 DDG wants one, with a name and an
  address, for telemedia offered commercially — donations and merch are, once
  the support section is switched back on. Blocked on the founding in the same
  way §1 is.
