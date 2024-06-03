import { Select } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function RouteFilter({ stop }: { stop: KVGStops }) {
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

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams],
	);

	const removeQueryStrings = useCallback(
		(names: string[]) => {
			const params = new URLSearchParams(searchParams);
			names.forEach((name) => params.delete(name));

			return params.toString();
		},
		[searchParams],
	);

	return (
		<Select
			className='bg-secondary dark:bg-darkMode-secondary flex items-center justify-between gap-2 rounded p-2 shadow transition duration-200'
			onChange={(e) => {
				if (!e.target.value || routeId === e.target.value) return;
				if (e.target.value === 'all') {
					router.push(pathname + '?' + removeQueryStrings(['routeId']));
				} else {
					router.push(pathname + '?' + createQueryString('routeId', e.target.value));
				}
			}}
		>
			{routes.map((route) => (
				<option value={route.id}>
					{route.authority} {route.name}
				</option>
			))}
		</Select>
	);
}
