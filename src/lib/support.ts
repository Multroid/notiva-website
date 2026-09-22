/* The "Unterstützen" section: /support (donations + the merch grid), the eight
   /merch/<slug> PDPs that hang off it, and /basket. One switch for all three —
   the grid on /support is the only way into the PDPs, so with /support gone
   every breadcrumb and "back to the shop" link would point at a redirect.

   Off means next.config.ts 307s all three to / (temporary, same reasoning as
   ARCHIVED_MARKETING_PATHS: they come back), and every link to them — header
   nav, landing CTA, 404, /datenschutz, sitemap, llms.txt, waitlist emails — is
   left out. The pages themselves stay in the tree untouched; set this to true
   to restore the section.

   Imported by next.config.ts, so this file must stay free of imports. */

export const supportEnabled: boolean = false;

/** Route prefixes owned by the section; each is redirected with its sub-paths. */
export const SUPPORT_PATHS = ['/support', '/merch', '/basket'];
