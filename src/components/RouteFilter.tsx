import { StopDepartures } from '@/lib/schemas';
import { Select } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function RouteFilter({ stop }: { stop: StopDepartures }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const routeId = searchParams.get('routeId');
	const direction = searchParams.get('direction');

	const defaultRoute = {
		routeId: 'all',
		patternText: 'Alle Linien',
	};

	const routes = stop.actual.filter((a) => (direction ? a.direction === direction : true)).map((a) => ({ routeId: a.routeId, patternText: a.patternText }));
	const seen = new Set<string>();
	const uniqueRoutes = routes.filter((route) => {
		if (seen.has(route.patternText)) {
			return false;
		}
		seen.add(route.patternText);
		return true;
	});
	uniqueRoutes.sort((a, b) => a.patternText.localeCompare(b.patternText));
	uniqueRoutes.unshift(defaultRoute);

	const updatedSearchParams = new URLSearchParams(searchParams);

	return (
		<Select
			className={`border-border ${!!routeId ? 'bg-primary text-white' : 'bg-background text-muted'} flex items-center justify-between gap-2 rounded-sm border p-2 transition duration-200`}
			onChange={(e) => {
				if (!e.target.value || routeId === e.target.value) return;
				if (e.target.value === 'all') {
					updatedSearchParams.delete('routeId');
					router.push(pathname + '?' + updatedSearchParams.toString());
				} else {
					updatedSearchParams.set('routeId', e.target.value);
					router.push(pathname + '?' + updatedSearchParams.toString());
				}
			}}
			defaultValue={routeId || defaultRoute.routeId}
		>
			{uniqueRoutes.map((route) => (
				<option key={route.routeId} value={route.routeId}>
					{route.patternText}
				</option>
			))}
		</Select>
	);
}
