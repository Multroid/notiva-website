# Cookiebot — was in welches Feld

Field-by-field values for the Cookiebot **Content** page (domain group `3411f02d-…`),
written against what notiva.de actually does.

**Workflow:** the left-hand *Language* panel switches which language you are editing.
Click the pencil next to **German**, fill every field with the DE column, then switch to
**English** and fill the same fields with the EN column. The fields are identical per
language; only the values differ.

---

## Before you type anything

**Set Default Language to German.** It is currently English. Every server-rendered page
of this site is `<html lang="de">`, so with *Auto-detect language* on, Cookiebot resolves
to German for effectively everyone — the default only applies when detection fails, and
for a German site under German law that fallback should be German, not English. Leave
*Auto-detect* checked.

**Why the stock text has to go.** The default body text is currently live on
`/datenschutz` and says the site personalises **ads**, offers **social media features**,
and **shares your usage data with advertising and social-media partners**. None of it is
true here, and it sits two paragraphs from § 8 of the privacy policy saying
"Keine Werbenetzwerke, kein Profiling". One document, two opposite claims.

**Voice.** Cookiebot defaults use *Sie*. The entire site, privacy policy included, uses
*du*. Everything below is *du*.

---

## CMP Banner

| Field | DE | EN |
|---|---|---|
| **Dialog heading** | `Cookies auf notiva.de` | `Cookies on notiva.de` |
| **Decline button text** | `Ablehnen` | `Decline` |
| **Accept button text** | `Alle zulassen` | `Allow all` |
| **Text in [OK] button** | `OK` | `OK` |
| **Text in [Allow all] button** | `Alle zulassen` | `Allow all` |
| **Text in [Allow selection] button** | `Auswahl zulassen` | `Allow selection` |
| **Text in [Show details] button** | `Details anzeigen` | `Show details` |
| **Text in [Hide details] button** | `Details ausblenden` | `Hide details` |
| **Text in [Customize] button** | `Anpassen` | `Customise` |

### Dialog body text

**DE**
```
Notwendige Cookies halten diese Website funktionsfähig — mehr setzen wir derzeit nicht ein. Kommt später etwas zur Reichweitenmessung dazu, lädt es erst, wenn du hier zustimmst. Keine Werbung, kein Profiling, keine Weitergabe zu Werbezwecken.

Du kannst deine Auswahl jederzeit ändern: im Fußbereich unter „Cookie-Einstellungen“. Einzelheiten in der Datenschutzerklärung.
```

**EN**
```
Necessary cookies keep this website working — at present we use nothing else. If anything for analytics is added later, it will load only once you agree here. No advertising, no profiling, nothing passed on for advertising purposes.

You can change your choice at any time under “Cookie settings” in the footer. Details in the privacy policy.
```

Link "Datenschutzerklärung" / "privacy policy" to `/datenschutz` with the link button in
the editor toolbar.

---

## Cookie declaration

### General cookie introduction

**DE**
```
Diese Website speichert nur, was für die von dir aufgerufenen Funktionen nötig ist. Es gibt keine Werbe-Cookies, kein Profiling und keine Weitergabe deiner Nutzungsdaten an Werbe- oder Social-Media-Partner. Derzeit findet auch keine Reichweitenmessung statt.

Cookies sind kleine Textdateien, die Websites auf deinem Gerät ablegen. Die folgende Liste stammt aus einem automatischen Scan dieser Website und nennt zu jedem Eintrag Zweck, Anbieter und Laufzeit. Wer die Daten erhält und auf welcher Rechtsgrundlage, steht ausführlich in der Datenschutzerklärung.

Deine Einwilligung kannst du jederzeit ändern oder widerrufen. Wenn du uns deswegen schreibst, nenne bitte deine Einwilligungs-ID und das Datum — beides steht unter dieser Liste.
```

**EN**
```
This website stores only what the functions you use require. There are no advertising cookies, no profiling, and nothing about your usage is passed to advertising or social-media partners. At present there is no analytics either.

Cookies are small text files that websites place on your device. The list below comes from an automated scan of this website and gives the purpose, provider and lifetime of every entry. Who receives data and on what legal basis is set out in full in the privacy policy.

You can change or withdraw your consent at any time. If you write to us about it, please quote your consent ID and the date — both appear below this list.
```

### Category titles

| Field | DE | EN |
|---|---|---|
| **Necessary cookies category title** | `Notwendig` | `Necessary` |
| **Statistics cookies category title** | `Statistiken` | `Statistics` |
| **Preference cookies category title** | `Präferenzen` | `Preferences` |
| **Marketing cookies category title** | `Marketing` | `Marketing` |
| **Unclassified cookies category titles** | `Nicht klassifiziert` | `Unclassified` |

### Necessary cookies introduction

**DE**
```
Machen die Website überhaupt nutzbar: Sprachwahl, Merch-Warenkorb, das technische Cookie des Anmeldesystems und — nur auf der Seite /support — die Betrugserkennung von Stripe. Dazu kommt die Speicherung deiner Antwort auf dieses Banner, ohne die wir dich bei jedem Seitenaufruf erneut fragen müssten. Diese Einträge sind nach § 25 Abs. 2 Nr. 2 TDDDG unbedingt erforderlich und lassen sich nicht abwählen.
```

**EN**
```
These make the website usable at all: your language choice, the merch basket, the technical cookie of the sign-in system and — only on the /support page — Stripe's fraud detection. Plus the record of your answer to this banner, without which we would have to ask you again on every page view. These entries are strictly necessary under § 25(2)(2) TDDDG and cannot be switched off.
```

### Statistics cookies introduction

**DE**
```
Anonyme Statistik darüber, welche Inhalte gelesen werden. Derzeit leer: auf dieser Website läuft keine Reichweitenmessung. Google Analytics war früher eingebunden und wurde entfernt. Geplant ist PostHog auf EU-Servern, bewusst ohne Cookies — sollte es doch welche setzen, erscheinen sie hier und laden nur mit deiner Zustimmung.
```

**EN**
```
Anonymous statistics about which content gets read. Currently empty: this website runs no analytics. Google Analytics was embedded previously and has been removed. PostHog on EU servers is planned, deliberately cookieless — should it set cookies after all, they will appear here and load only with your agreement.
```

### Preference cookies introduction

**DE**
```
Merken sich Einstellungen, die das Verhalten der Seite verändern. Bei uns liegt die einzige solche Einstellung — deine Sprachwahl — im Local Storage und zählt als notwendig. Diese Kategorie ist deshalb leer.
```

**EN**
```
Remember settings that change how the site behaves. The only such setting here — your language choice — lives in local storage and counts as necessary. This category is therefore empty.
```

### Marketing cookies introduction

**DE**
```
Cookies, die Werbung ausspielen oder dich über Websites hinweg verfolgen. Diese Kategorie ist leer und soll es bleiben: Notiva bindet keine Werbenetzwerke ein und gibt keine Daten zu Werbezwecken weiter.
```

**EN**
```
Cookies that serve advertising or follow you across websites. This category is empty and is meant to stay that way: Notiva embeds no ad networks and passes no data on for advertising purposes.
```

### Unclassified cookies introduction

**DE**
```
Cookies, die wir gemeinsam mit ihren Anbietern noch einordnen. Auf notiva.de sollte diese Kategorie leer bleiben — steht hier etwas, ist es neu dazugekommen und noch nicht geprüft.
```

**EN**
```
Cookies we are still classifying together with their providers. On notiva.de this category should stay empty — anything listed here is new and has not been reviewed yet.
```

---

## Privacy Trigger

The consent-status block under the declaration. Defaults are English labels; German
visitors see them too until these are filled.

| Field | DE | EN |
|---|---|---|
| **Cookie settings** | `Cookie-Einstellungen` | `Cookie settings` |
| **Your current state** | `Dein aktueller Status` | `Your current state` |
| **Consent date** | `Datum der Einwilligung` | `Consent date` |
| **Your consent ID** | `Deine Einwilligungs-ID` | `Your consent ID` |
| **Change your consent** | `Einwilligung ändern` | `Change your consent` |
| **Withdraw your consent** | `Einwilligung widerrufen` | `Withdraw your consent` |
| **Show details** | `Details anzeigen` | `Show details` |
| **Hide details** | `Details ausblenden` | `Hide details` |

Keep **Cookie settings** / **Cookie-Einstellungen** worded exactly like the footer link in
`cookie-settings-link.tsx` — same control, two entry points, and a visitor should not have
to work out that they are the same thing.

---

## Outside the Content page

| Setting | Value | Why |
|---|---|---|
| Consent mode | **Opt-in** | Implied / opt-out is not lawful under § 25 TDDDG. |
| "Ablehnen" on the **first** layer, same visual weight as "Alle zulassen" | On | The Content page has the Decline text, but whether the button is *shown* on layer one is a Banner-layout setting. A reject option hidden one layer down, or styled weaker, is the most-cited defect in German DPA banner decisions (DSK Orientierungshilfe; EDPB cookie-banner taskforce). |
| Floating widget | On | `/` renders no footer, so the widget is the only withdrawal control there. Art. 7 Abs. 3 DSGVO wants withdrawal as easy as consent. |
| Scan frequency | Monthly | What § 7 of the policy claims. |
| Domains to scan | `notiva.de` **and** `www.notiva.de` | Production redirects apex → www. |

---

## Check after the first scan

**Stripe must land in "Notwendig".** `__stripe_mid` / `__stripe_sid` are declared strictly
necessary in § 7 of the privacy policy. If the scanner files them under Marketing, the
policy contradicts the declaration *and* auto-blocking holds Stripe.js back on `/support`
until someone accepts marketing — donations silently stop working for anyone who declines.
Re-file if the scanner guessed wrong.

Confirm these are found and filed as necessary:

- `CookieConsent` — Cookiebot's own, 12 months
- `next-auth.callback-url` / `__Secure-next-auth.callback-url`
- Local storage: `notiva.lang`, `notiva.basket`

And that **Statistics, Marketing and Unclassified come back empty**. An entry in any of
them means something is loading that the privacy policy says is not there — fix the site,
not the text.

---

## Keep in sync

Three places state the same facts and must agree:

- this dashboard copy
- `§ 7` and `§ 8` of `src/app/(notiva)/datenschutz/page.tsx`
- the comment block in `src/app/layout.tsx`

Anything new that touches browser storage means editing all three.
