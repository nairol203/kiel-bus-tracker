import { Select } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function RouteFilter({ stop }: { stop: NormalizedKVGStops }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const routeId = searchParams.get('routeId');
	const direction = searchParams.get('direction');

	const defaultRoute = {
		alerts: [],
		authority: '',
		directions: [],
		id: 'all',
		name: 'Alle Linien',
		routeType: 'unkown',
		shortName: '',
	};

	const routes = [defaultRoute, ...(direction ? stop.routes.filter((route) => route.directions.includes(direction)) : stop.routes)];

	const updatedSearchParams = new URLSearchParams(searchParams);

	return (
		<Select
			className={`border-border ${!!routeId ? 'bg-primary' : 'bg-background text-muted'} flex items-center justify-between gap-2 rounded-sm border p-2 transition duration-200`}
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
			defaultValue={routeId ?? defaultRoute.id}
		>
			{routes.map((route) => (
				<option key={route.id} value={route.id}>
					{route.authority} {route.name}
				</option>
			))}
		</Select>
	);
}
