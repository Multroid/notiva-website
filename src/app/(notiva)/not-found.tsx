import { NotFoundView } from '@/components/notiva/not-found-view';

/* Fallback boundary for a notFound() thrown inside the group. Rendered inside
   (notiva)/layout.tsx, so the fonts and the Lang / Basket / Modal providers are
   already in scope.

   Nothing routes here today: the only segment that could throw was
   /merch/<unknown slug>, and that now sets `dynamicParams = false`, so the
   router 404s to the root /_not-found before this boundary is reached. That
   was a deliberate move — a notFound() raised mid-render inside this group did
   not produce this component's HTML at all. Next served its error shell
   (`<html id="__next_error__">`, no lang, empty <body>, the markup below
   present only in the RSC flight payload), which also means the <meta> here
   never reached <head>. Measured on a production build.

   Keep the file: a future notFound() elsewhere in the group needs a boundary,
   and a wrong-looking 404 beats an unhandled error. But do not treat the tag
   below as a load-bearing index signal — the 404 status and Next's own
   automatic `noindex` are what actually keep these responses out of an index.

   No `metadata` export: a nested not-found is a render boundary, not a route
   segment, so Next resolves the head from whichever segment matched. */

export default function NotivaNotFound() {
	return (
		<>
			<meta name="robots" content="noindex, nofollow" />
			<NotFoundView />
		</>
	);
}
