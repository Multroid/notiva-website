import { NotFoundView } from '@/components/notiva/not-found-view';

/* Catches notFound() thrown inside the group — today that is an unknown
   /merch/<slug>. Rendered inside (notiva)/layout.tsx, so the fonts and the
   Lang / Basket / Modal providers are already in scope. */

export default function NotivaNotFound() {
	return <NotFoundView />;
}
