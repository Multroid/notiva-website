# Notiva Website Redesign — Implementation Plan

> Based on Figma file: `EyQEFMQt7rVZepDXRFRru9` (node `186:201` — WEB Marketing, Desktop-1)
> Compared against existing codebase as of March 2026.

---

## Design System Summary (from Figma)

### Color Tokens (already defined in `globals.css` ✅)

| Token | Value | Usage |
|---|---|---|
| `--notiva-blue` | `#0047BA` | Primary buttons, accents |
| `--multroid-blue` | `#0033A1` | Button borders |
| `--notiva-blue-light-hover` | `#D9E3F5` | Button outer wrapper bg |
| `--notiva-blue-light-active` | `#B0C6EA` | Feature card active bg |
| `--notiva-blue-darker` | `#001941` | Dark text, footer button |
| `--multroid-white` | `#F0EEE9` | Text on dark/blue backgrounds |
| `--multroid-white-light` | `#FEFDFD` | Card backgrounds |
| `--multroid-grey` | `#898C8E` | Secondary text |
| `--multroid-grey-dark` | `#67696B` | Nav text, body text |
| `--multroid-grey-light` | `#F3F4F4` | Secondary button inner bg |
| `--multroid-black` | `#101113` | Headings on light bg |
| Notiva Orange | `#F05627` | Important CTA, "Popular" badge, footer subscribe |
| Green (savings) | `#009966` | Pricing "Save X%" text |

### Typography (Montserrat throughout)

| Role | Weight | Size | Line Height |
|---|---|---|---|
| Hero H1 | Black (900) | 72px | 86.4px |
| Section H1 | Bold (700) | 44px | 48px |
| Card H2 | SemiBold (600) | 22px | 28px |
| Subheading | Regular (400) | 24px | 32px |
| Body | Regular (400) | 16px | 22px |
| Section label | Regular (400) | 14px | — |
| Pricing price | Bold (700) | 48px | 48px |
| Pricing title | SemiBold (600) | 60px | 60px |

---

## Reusable Components to Create/Update

### 1. `NotivaButton` — update `src/components/ui/notiva-button.tsx`
Currently CSS-class based. Rebuild as a proper React component with variant + size props. The Figma uses a **double-layer wrapper pattern** for all buttons.

**Variants:**
- `primary` — outer `bg-[#D9E3F5] border border-[#0033A1]` + inner `bg-[#0047BA] text-[#F0EEE9]`
- `secondary` — outer `bg-[#D9E3F5] border border-[#0047BA]` + inner `bg-[#F3F4F4] border border-[#0047BA] text-[#0047BA]`
- `important` — outer `bg-[#FEE9EB] border border-[#F05627]` + inner `bg-[#F05627] text-[#F0EEE9]`

**Sizes:**
- `sm` — h-[40px], outer p-[4px], outer rounded-[4px], inner rounded-[8px]
- `lg` — h-[52px], outer p-[4px], outer rounded-[4px], inner rounded-[8px]

### 2. `NotivaInputField` — create `src/components/ui/notiva-input-field.tsx`
Styled email input with inline CTA button, used in Newsletter section and Footer.

**Variants:**
- `blue` — `bg-[#D9E3F5] border border-[#0047BA]`, button `bg-[#0047BA]`, placeholder `text-[#00358C]`
- `orange` — `bg-[#D9E3F5] border border-[#F05627]`, button `bg-[#F05627]`, placeholder `text-[#AA3D1C]`

Both: outer `p-[8px] rounded-[4px]`, button `rounded-[12px] px-[24px]`

---

## Section-by-Section Implementation Plan

### Phase 1 — Foundation & Cleanup

#### A. Update `globals.css`
- Add missing token: `--notiva-fafaf8: #FAFAF8` (Features section bg)
- Remove unused animation keyframes: `heroGradientShift`, `heroCloudDrift` (old hero)
- Remove unused utility classes: `.hero-sky-bg`, `.text-hero`, `.text-high-contrast`

#### B. Delete Unused Components
| File | Reason |
|---|---|
| `src/components/BillingScanningSection.tsx` | Not in new design |
| `src/components/EverythingInOnePlaceSection.tsx` | Not in new design |
| `src/components/MagicBento.jsx` | Not in new design |
| `src/components/Aurora.jsx` | Not in new design |
| `src/components/Iridescence.jsx` | Not in new design |
| `src/components/LetterGlitch.jsx` | Not in new design |
| `src/components/feature-showcase.tsx` | Not in new design |
| `src/components/landing/` (directory) | Not in new design |

---

### Phase 2 — Reusable Primitives

#### C. Refactor `NotivaButton`
See spec above. Must support `asChild` for link wrapping (keep Radix Slot pattern).

#### D. Create `NotivaInputField`
See spec above. Should be a controlled component accepting `value`, `onChange`, `onSubmit` props.

---

### Phase 3 — Header

#### E. Update `src/app/(main)/layout.tsx`

**Current:** Generic shadcn nav with logo and dropdown menus.

**New design (Figma node 248:747):**
- Height: 84px, `backdrop-blur-[6px]`, sticky with bg transparency
- **Logo area** (left): Blue pill `bg-[#0047BA] rounded-[8px] px-[16px] py-[8px]`
  - 32×32 white logo mark + "NOTIVA" text in `#F0EEE9`, Montserrat Bold 24px, `tracking-[2px]` uppercase
- **Nav links** (center): Features ↓ · Pricing · For Business ↓ · About ↓
  - Font: 14px Regular `#67696B`
  - Dropdown chevron icon beside items that have dropdowns
- **Right controls**: theme toggle (20px icon) + `NotivaButton` variant="primary" size="sm" — "Login / Register"
- Mobile: keep existing hamburger/sheet pattern

---

### Phase 4 — Landing Page Sections

#### F. Hero Section — rewrite `src/components/HeroSection.tsx`
**Figma node:** 186:203

- Outer wrapper: `p-[16px]` full-width
- **Container:** `rounded-[40px]`, blue abstract gradient background (deep blue with circular light refractions), `shadow-[0px_0px_18.5px_4px_rgba(0,71,186,0.5)]`
  - Inner inset glow: `box-shadow: inset 0 0 1.1px 1px #00BBFF, inset 0 0 40px 0 #0047BA`
- **Content block** (`pt-[100px] gap-[72px]` centered column):
  - Headline: Montserrat Black 72px/86.4px `#F0EEE9` — "Your AI financial manager / powered by your inbox"
  - Subtext: Regular 18px `#F0EEE9` max-w-[800px] centered
  - `NotivaButton` variant="important" size="lg" — "Get control of your Finances"
- **Dashboard card** (below headline):
  - `backdrop-blur-[7.5px] bg-[rgba(0,0,0,0.3)] p-[24px] rounded-[12px]`
  - Inner blue inset glow: `shadow-[inset_0px_0px_5px_0px_#7DAFFF]`
  - Dashboard screenshot image (`930×607` `rounded-[16px]`) — use `/public/Dashboard-screenshot-example.png`
- Note: The old pastel gradient sky video background is **removed**. The new hero uses a CSS/image-based blue gradient.

---

#### G. Novi Section — rewrite `src/components/MeetNoviSection.tsx`
**Figma node:** 193:201

- Layout: horizontal flex, `px-[111px] py-[120px] gap-[32px]` centered
- Background: white (no special bg)
- **Left:** 400×400 Rive animation container
  - Use `@rive-app/react-canvas`, load `/public/animations/novi.riv`
  - Confirm correct artboard/state for the "waving Novi" pose
- **Right content** (max-w ~514px, `p-[16px] gap-[40px]`):
  - Heading: "Meet **Novi**" — 44px, "Meet " in Regular `#101113`, "Novi" in Bold `#0047BA`
  - Subtitle: "your finance co-pilot" — 20px Regular `#101113`, `tracking-[-1.4px]`
  - Body: 16px `#898C8E` paragraph + 3-item bullet list
  - Button group (`gap-[24px]`):
    - `NotivaButton` variant="primary" size="lg" — "Ask Novi / Talk to your Money"
    - `NotivaButton` variant="secondary" size="lg" — "See examples"

---

#### H. Features Section — rewrite `src/components/FeaturesGridSection.tsx`
**Figma node:** 530:591

- Background: `#FAFAF8`, `py-[80px] px-[16px]`
- **Header** (centered, `px-[200px] gap-[24px]`):
  - Title: 44px Bold `#0047BA` — "The Features you will love..."
  - Subtitle: 24px Regular `#898C8E` — "Notiva combines open banking..."
- **Bento grid** (`gap-[24px]`, 4 columns of 320px, 3 rows of 320px):

| Position | Content | Width | Icon |
|---|---|---|---|
| Row 1, Col 1 | "Private by default. Secure by design." | 320 | `Lock` |
| Row 1, Col 2–3 | "Your money, explained in plain language." | 664 | `Smile` + mobile screenshot |
| Row 1, Col 4 | "Proactive, not reactive." | 320 | `Sparkles` |
| Row 2, Col 1 | "German tax, handled automatically." | 320 | `PieChart` |
| Row 2, Col 2 | "Track investments across accounts." | 320 | `BarChart2` |
| Row 2, Col 3–4 | "A clear timeline of your spending." | 664 | `Calendar` + mobile screenshot |
| Row 3, Col 1 | "Kill subscriptions you forgot about." | 320 | `RefreshCw` |
| Row 3, Col 2 | "Optimize subscriptions and reduce overspending." | 320 | `DollarSign` |

- All cards: `bg-[#F0EEE9] border-2 border-[#0047BA] rounded-[8px] shadow-[0px_4px_15px_0px_rgba(0,0,0,0.2)] p-[16px]`
- Card content: 40px icon (Lucide) + 22px SemiBold `#101113` title + 16px Regular `#898C8E` body
- Wide cards (664px) have a mobile screenshot panel on the left side in `bg-[#B0C6EA] rounded-[16px]`
- **Bottom CTA** (`gap-[16px]`):
  - `NotivaButton` variant="primary" size="lg" — "Get Started"
  - `NotivaButton` variant="secondary" size="lg" — "See how Novi works"

---

#### I. How Notiva Works — rewrite `src/components/HowNotivaWorksSection.tsx`
**Figma node:** 230:178

- Background: radial gradient from center `rgba(0,71,186,0.3)` → transparent (implemented as inline SVG data-url or Tailwind)
- Layout: 50/50 split flex, `px-[48px] py-[79px] gap-[40px]`
- **Left column** (sticky `top-0`, `gap-[32px]`):
  - Label: "HOW IT WORKS" — 14px uppercase `tracking-[0.7px]` `text-[rgba(43,127,255,0.8)]`
  - H1: "How Notiva works" — 44px Bold `#101113`
  - Body: 24px Regular `#67696B`
  - Button group:
    - `NotivaButton` variant="primary" size="lg" — "Get Started"
    - `NotivaButton` variant="secondary" size="lg" — "Learn More"
- **Right column** (600px tall, `gap-[10px]`):
  - Vertical dashed/solid line (1px `#B0C6EA`) connecting 4 step icons
  - 4 steps evenly spaced:
    - Icon circle: 64px `bg-[#FEFDFD] border border-[#F0EEE9] rounded-[16px] shadow-[0px_10px_15px_-3px_rgba(226,232,240,0.5)]`
    - Step title: 16px SemiBold `#101113`
    - Step body: 18px Regular `#67696B`
  - Step 1: Upload icon — "Upload or Connect your email (read-only)"
  - Step 2: Extract/wand icon — "Notiva extracts what matters"
  - Step 3: Bell icon — "Novi keeps you informed"
  - Step 4: Shield icon — "Peace of mind"

---

#### J. Automatic vs Manual — rewrite `src/components/ComparisonSection.tsx`
**Figma node:** 240:159

- Background: radial gradient (top-center) blue → transparent
- Padding: `py-[100px]`
- **Title:** "Automatic vs Manual" — 48px SemiBold `#0047BA` centered
- **Comparison table card:**
  - Outer: `bg-[#E6EDF8] border-2 border-[#0047BA] rounded-[16px] p-[12px]`
  - Inner: `bg-[#FAFAF8] border border-[#B0C6EA] rounded-[24px] p-[24px]`
  - CSS Grid: 3 columns — `[capability name] [With Notiva] [Without Notiva]`
  - **Header row:**
    - Col 1: "Capabilities" — 16px SemiBold
    - Col 2: Notiva logo (colored, 40×40) + "With Notiva" label 12px Medium
    - Col 3: Grey/muted Notiva logo (40×40) + "Without Notiva" label 12px Medium
  - **Data rows** (5 rows, alternating `bg-[#E6EDF8]`):
    1. "Document deadline extraction" — Automatic (green text `#1AC200`) / Manual (grey text)
    2. "Automated Email and attachment scanning" — ✅ / ❌
    3. "Background processing" — ✅ / ❌
    4. "Automatic forecasting" — ✅ / ❌
    5. "Renewal and expiration tracking" — ✅ / ❌
  - Row left corners: `rounded-tl-[8px] rounded-bl-[8px]`
  - Row right corners: `rounded-tr-[8px] rounded-br-[8px]`
  - Checkmark: green circle check SVG (`#1AC200`)
  - Cross: red X SVG (`#F32735`)
- **Bottom CTA:** `NotivaButton` variant="secondary" size="lg" — "Compare in detail"

---

#### K. Plans Section — rewrite `src/components/PricingSection.tsx`
**Figma node:** 243:178

- Border: `border-t border-b border-dashed border-[rgba(0,71,186,0.5)]`
- Padding: `py-[124px] px-[190px]`
- **Header** (centered, `gap-[16px]`):
  - Label: "PLANS" — 14px Regular uppercase `#54545E` `tracking-[0.7px]`
  - Title: "Simple pricing" — 60px SemiBold `#09090B` `tracking-[-0.5px]`
  - Subtitle: "Choose what works for you" — 20px Regular `#54545E`
- **Cards** (`gap-[24px]`, equal height):
  - Both: `bg-[#FEFDFD] border-2 border-[#B0C6EA] rounded-[16px] p-[33px] shadow-[0px_0px_19.6px_-1px_rgba(0,71,186,0.2)]`
  - **Pro card:**
    - "Popular" badge: `bg-[#F05627] rounded-[16px] px-[16px] py-[8px] text-[#F0EEE9] 20px` (top right)
    - Plan name: "Pro" — 22px SemiBold `#101113`
    - Price: "€3.99" — 48px Bold `#0047BA` `tracking-[-1.2px]`
    - Period: "/mo" — 18px Regular `#898C8E`
    - Billing note: "or **€49** yearly · **Save 32%**" — 14px, save in green `#009966`
    - Divider: `border-t border-[#F0EEE9]`
    - Category: "FOR INDIVIDUALS" — 13px SemiBold uppercase `#898C8E`
    - 5 features with blue checkmark icon
    - `NotivaButton` variant="primary" size="lg" full-width — "Get Started with Pro"
    - "Start a free 30-day trial" — 16px centered black
  - **Family card:**
    - Same structure, no "Popular" badge
    - Price: "€11.99/mo", "or €99 yearly · Save 31%"
    - Category: "FOR HOUSEHOLDS"
    - 6 features
    - `NotivaButton` with inner `bg-[#001941]` (dark navy) — "Get Started with Family"
    - "Start a free 30-day trial"
- **Bottom note:** "All plans include a 30-day free trial. No credit card required for the trial." — 16px `#F05627` centered

---

#### L. Newsletter CTA Section — create `src/components/NewsletterSection.tsx`
**Figma node:** 259:269 (new component, replaces old "Final CTA")

- Layout: horizontal flex, `pt-[80px] pb-[200px] px-[16px] gap-[80px]` centered
- Background: white
- **Left content block** (`px-[32px] py-[16px] gap-[24px] max-w-[800px]`):
  - Heading: "**NOTIVA** Newsletter" — 48px SemiBold
    - "NOTIVA " in `#0047BA`, "Newsletter" in `#001941`
  - Subtext: 20px Regular `#001941` — "Get Finance Management tips and updates..."
  - `NotivaInputField` variant="blue" full-width
- **Right:** 260×260 Rive animation (Novi at laptop pose)
  - Load `/public/animations/novi.riv` — confirm correct artboard

---

### Phase 5 — Footer

#### M. Create `src/components/Footer.tsx` (new file)
**Figma node:** 246:712 (replaces inline footer in `page.tsx`)

- Full-width, `bg-[#0047BA]`
- `rounded-tl-[40px] rounded-tr-[40px]`
- `shadow-[0px_-27px_50px_0px_rgba(0,71,186,0.35)]`
- `pt-[32px] px-[24px] gap-[16px]`

**Top row** (3-column flex, `justify-between`):
1. **Company info card** (left, ~222px):
   - Logo mark (40×40) + "Notiva" — 40px Black `#FEFDFD`
   - Nothing else in this sub-column
2. **Tagline** (center, flex-1):
   - Paragraph: 16px Medium `#FEFDFD`
   - "Building the future of technology with innovative solutions..."
3. **Stay Updated CTA** (right, ~431px, `px-[32px] gap-[18px]`):
   - "Stay Updated" — 32px SemiBold `#FEFDFD`
   - Subtext: 16px Medium `#FEFDFD`
   - `NotivaInputField` variant="orange"

**Middle section** (`h-[300px]`, 3 link columns, `px-[40px]`):
- Solutions: Hoomara, Multroid Flow, All Solutions
- Company: About Us, Our Mission, Milestones, Contact Us
- Resources: (same as Company for now — Figma shows duplicate, to be updated)
- All: 32px SemiBold heading + 16px Medium links in `#FEFDFD`

**Bottom** (`h-[367px]`, centered):
- Giant wordmark: "NOTIVA" — 228px Black `#F0EEE9` uppercase centered
- Copyright bar below: `© {year} Notiva. Made and owned by Multroid.`

---

### Phase 6 — Homepage Assembly

#### N. Rewrite `src/app/(main)/page.tsx`

- Remove `'use client'` directive (page can be a server component if `useSession` is removed)
- Remove: `IntegrationMarquee`, `IntegrationCard`, inline `<footer>`, old "Final CTA" section
- New import list and section order:

```tsx
import HeroSection from '@/components/HeroSection'
import NoviSection from '@/components/MeetNoviSection'
import FeaturesGridSection from '@/components/FeaturesGridSection'
import HowNotivaWorksSection from '@/components/HowNotivaWorksSection'
import ComparisonSection from '@/components/ComparisonSection'
import PricingSection from '@/components/PricingSection'
import NewsletterSection from '@/components/NewsletterSection'
import Footer from '@/components/Footer'

export default function Home() {
  return (
    <>
      <HeroSection />
      <NoviSection />
      <FeaturesGridSection />
      <HowNotivaWorksSection />
      <ComparisonSection />
      <PricingSection />
      <NewsletterSection />
      <Footer />
    </>
  )
}
```

---

## Codebase Cleanup Summary

| File | Action |
|---|---|
| `src/components/BillingScanningSection.tsx` | **Delete** |
| `src/components/EverythingInOnePlaceSection.tsx` | **Delete** |
| `src/components/MagicBento.jsx` | **Delete** |
| `src/components/Aurora.jsx` | **Delete** |
| `src/components/Iridescence.jsx` | **Delete** |
| `src/components/LetterGlitch.jsx` | **Delete** |
| `src/components/feature-showcase.tsx` | **Delete** |
| `src/components/landing/` (directory) | **Delete** |
| `src/components/HeroSection.tsx` | **Full rewrite** |
| `src/components/MeetNoviSection.tsx` | **Full rewrite** |
| `src/components/FeaturesGridSection.tsx` | **Full rewrite** |
| `src/components/HowNotivaWorksSection.tsx` | **Full rewrite** |
| `src/components/ComparisonSection.tsx` | **Full rewrite** |
| `src/components/PricingSection.tsx` | **Full rewrite** |
| `src/components/Footer.tsx` | **Create new** |
| `src/components/NewsletterSection.tsx` | **Create new** |
| `src/components/ui/notiva-button.tsx` | **Refactor** with variant/size props |
| `src/components/ui/notiva-input-field.tsx` | **Create new** |
| `src/app/globals.css` | **Remove** old hero animation classes |
| `src/app/(main)/layout.tsx` | **Update** header to match Figma |
| `src/app/(main)/page.tsx` | **Full rewrite** of section assembly |

---

## Implementation Order

1. Primitives: `NotivaButton` refactor + `NotivaInputField` create
2. Header (`layout.tsx`)
3. Hero Section
4. Novi Section (Rive animation)
5. Features Grid (bento layout)
6. How It Works (timeline)
7. Comparison Table
8. Pricing (two cards)
9. Newsletter + Footer
10. Cleanup (delete old components)
11. Homepage assembly (`page.tsx`)

---

## Technical Notes

- **Rive animation**: Both Novi Section and Newsletter use `/public/animations/novi.riv`. Confirm the correct artboard name for each pose (waving vs. at laptop). Use `useRive({ src, artboard, stateMachines })`.
- **Hero background**: New design uses a rich blue gradient (CSS `radial-gradient` or a static image). The old `/public/video/pastel gradient sky.mp4` is **not used** in the new design and can be removed.
- **Bento grid screenshots**: Two mobile app screenshots are embedded in the Features grid cards. Download from Figma asset URLs and save to `/public/` (Figma URLs expire in 7 days).
- **No dark mode on marketing page**: The new design is light-mode only. The theme toggle stays in the header but the marketing page doesn't actively respond to it.
- **Logo Carousel section** (Figma node 186:229) is marked `hidden="true"` in the Figma — **not implemented** in this redesign.
- **`server component`**: With `useSession()` removed from `page.tsx`, it becomes a server component — better for performance and SEO.
