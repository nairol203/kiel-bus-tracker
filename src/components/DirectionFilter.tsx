import { StopDepartures } from '@/lib/schemas';
import { Select } from '@headlessui/react';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';

export default function DirectionFilter({ stop }: { stop: StopDepartures }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const routeId = searchParams.get('routeId');
	const direction = searchParams.get('direction') ?? 'Alle Richtungen';

	const directions = stop.actual.filter((a) => (routeId ? a.routeId === routeId : true)).map((d) => d.direction, direction);

	const uniqueDirections = Array.from(new Set(directions));
	uniqueDirections.sort();
	uniqueDirections.unshift('Alle Richtungen');

	const updatedSearchParams = new URLSearchParams(searchParams);

	return (
		<Select
			className={`border-border ${!!searchParams.get('direction') ? 'bg-primary text-white' : 'bg-background text-muted'} flex items-center justify-between gap-2 rounded-sm border p-2 transition duration-200`}
			onChange={(e) => {
				if (!e.target.value || direction === e.target.value) return;
				if (e.target.value === 'Alle Richtungen') {
					updatedSearchParams.delete('direction');
					router.push(pathname + '?' + updatedSearchParams.toString());
				} else {
					updatedSearchParams.set('direction', e.target.value);
					router.push(pathname + '?' + updatedSearchParams.toString());
				}
			}}
			defaultValue={direction}
		>
			{uniqueDirections.map((_direction) => (
				<option key={_direction} value={_direction}>
					{_direction}
				</option>
			))}
		</Select>
	);
}
