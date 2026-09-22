---
title: Privacy policy — open points
created: 2026-09-22
updated: 2026-09-22
version: 1.0.0
status: active
owners: [Hiki]
sources:
  - src/app/(notiva)/datenschutz/page.tsx
  - src/app/(notiva)/datenschutz/layout.tsx
---

# Privacy policy — open points

**Status:** Active · **Created:** 2026-09-22 · **Updated:** 2026-09-22 · **Version:** 1.0.0

<details>
<summary><strong>Revision history</strong></summary>

| Date | Version | Change | By |
|---|---|---|---|
| 2026-09-22 | 1.0.0 | Initial version: the eight placeholders removed from /datenschutz on main, what each still needs, and the draft banner verbatim. | Claude (Opus 5) |

</details>

On `main` the page at `/datenschutz` carries no placeholders any more: every
point only the operator can answer was removed rather than guessed. This branch
keeps the older draft, where each of them is still visible on the page as an
orange `[ … ]` marker — `src/app/(notiva)/datenschutz/page.tsx` on `dev`. This
file is the list of what those markers asked for.

Notiva is not a founded company yet, and four of the eight points below wait on
that. Until it is founded there is nothing to fill in, so the published page
says so in §1 instead of leaving a blank where a Verantwortlicher belongs.

## Open points

| § | What the placeholder asked for | What it needs |
|---|---|---|
| 1 Verantwortlicher | "Vollständiger Firmenname und Rechtsform, Straße und Hausnummer, PLZ und Ort, Land, vertreten durch" | Exists only once the company does. `main` names "das Team hinter Notiva" as controller and states that Notiva is not founded yet. Art. 13 Abs. 1 lit. a DSGVO expects an identity and a postal address, and the site deliberately publishes no personal name (`src/app/llms.txt/route.ts:120`) — put that conflict to the lawyer rather than leaving it to resolve itself. |
| 1 Datenschutzbeauftragter | DPO contact details, or the finding that none must be appointed (§ 38 BDSG: from 20 persons continuously processing) | Heading dropped on `main`. Art. 13 Abs. 1 lit. b asks for one only where a DPO exists; restore the block if one is ever appointed. |
| 3 Investoren-Anfragen | "Frist festlegen, z. B. 24 Monate" after the last contact | `main` keeps the criterion ("solange ein Kontakt für Folgerunden sinnvoll ist; anschließend löschen wir die Anfrage") but no cap. Decide the cap, then honour it: rows live in `public.investor_lead` (`src/app/api/investor-deck/route.ts:57`). |
| 6 Hosting und Server-Logs | "Aufbewahrungsdauer der Server-Logs angeben, sobald in Amplify geprüft" | Check the Amplify access-log window and the retention set on the CloudWatch log group of the SSR compute, then state a period. §6 currently states none. |
| 8 PostHog | The region actually chosen, the retention, and whether it stays cookieless without session replay | Confirm at integration time. The section describes a plan, and says so. |
| 9 Empfänger | AVV per provider, Verzeichnis der Verarbeitungstätigkeiten (Art. 30), DPF certification per provider, and whether a US parent can reach EU-region data | All still to do. Note that §9 asserts "Mit allen bestehen Verträge zur Auftragsverarbeitung nach Art. 28 DSGVO" without qualification, while §4 and §5 describe Stripe and Fourthwall as their own controllers — check which instrument actually applies to those two. |
| 10 Beschwerderecht | "Zuständige Aufsichtsbehörde nach Firmensitz eintragen, mit Anschrift und Website" | `main` cites Art. 77 DSGVO instead, which points a reader at the authority of their residence, workplace or the place of the alleged infringement. Name the competent authority once there is a seat. |
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

- §4 keeps payment records "nach § 147 AO und § 257 HGB zehn Jahre". Two doubts:
  the retention for Buchungsbelege was shortened to eight years by the fourth
  Bürokratieentlastungsgesetz with effect from 1 January 2025, and § 257 HGB
  binds Kaufleute, which an unfounded Notiva is not.
  <!-- unverified: read from memory of the statute, not re-checked against the current text -->
- The site has no Impressum route. § 5 DDG wants one, with a name and an
  address, for telemedia offered commercially — donations and merch are. Blocked
  on the founding in the same way §1 is.
