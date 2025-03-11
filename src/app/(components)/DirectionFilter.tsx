import { Select } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

function filterUniqueAndSortAscending(arr: string[]) {
	const uniqueArr = Array.from(new Set(arr));
	const sortedArr = uniqueArr.sort();
	return sortedArr;
}

export default function DirectionFilter({ stop }: { stop: NormalizedKVGStops }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const routeId = searchParams.get('routeId');
	const direction = searchParams.get('direction') ?? 'Alle Richtungen';
	let directions =
		routeId && stop.routes.find((route) => route.id === routeId)
			? stop.routes.find((route) => route.id === routeId)!.directions
			: [''].concat(...stop.routes.map((route) => route.directions));

	if (!routeId || !stop.routes.find((route) => route.id === routeId)) {
		directions.shift();
	}

	directions = filterUniqueAndSortAscending(directions);
	directions.unshift('Alle Richtungen');

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
			className='flex items-center justify-between gap-2 rounded bg-secondary p-2 shadow transition duration-200 dark:bg-darkMode-secondary'
			onChange={(e) => {
				if (!e.target.value || direction === e.target.value) return;
				if (e.target.value === 'Alle Richtungen') {
					router.push(pathname + '?' + removeQueryStrings(['direction']));
				} else {
					router.replace(pathname + '?' + createQueryString('direction', e.target.value));
				}
			}}
			defaultValue={direction}
		>
			{directions.map((_direction) => (
				<option key={_direction} value={_direction}>
					{_direction}
				</option>
			))}
		</Select>
	);
}
