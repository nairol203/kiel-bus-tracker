'use client';

import { useBusStore } from '@/stores/bus-store';
import { stops } from '@/utils/stops';
import { History, MapPin } from 'lucide-react';
import Link from 'next/link';

export const recommendedStops = [
	{ name: 'Hauptbahnhof', number: '2387' },
	{ name: 'Andreas-Gayk-Straße', number: '1256' },
	{ name: 'Dreiecksplatz', number: '2151' },
	{ name: 'Uni-Westring', number: '1491' },
];

export default function RecommendedSearches() {
	const { lastSearches } = useBusStore();

	return (
		<>
			{lastSearches.length ? (
				<div className='mt-2 grid gap-2'>
					<h2>Zuletzt gesucht</h2>
					{lastSearches
						.toReversed()
						.slice(0, 10)
						.map((stop, index) => (
							<Link
								className='group flex gap-3 rounded-sm bg-secondary font-semibold p-3 shadow-sm transition duration-200 md:hover:bg-secondary/75 dark:bg-darkMode-secondary dark:md:hover:bg-secondary/10'
								href={`/stop/${stop.number}`}
								key={`${index}_${stop.id}`}
							>
								<History className='h-5 w-5 shrink-0 opacity-60' />
								{stop.name}
							</Link>
						))}
				</div>
			) : (
				<></>
			)}
			<div className='mt-2 grid gap-2'>
				<h2>Vorschläge</h2>
				{recommendedStops.map((stop, i) => (
					<Link
						className='group flex gap-3 rounded-sm bg-secondary p-3 shadow-sm transition font-semibold duration-200 md:hover:bg-secondary/75 dark:bg-darkMode-secondary dark:md:hover:bg-secondary/10'
						href={`/stop/${stop.number}`}
						key={stop.number}
					>
						<MapPin className='h-5 w-5 shrink-0 opacity-60' />
						{stop.name}
					</Link>
				))}
			</div>
		</>
	);
}
