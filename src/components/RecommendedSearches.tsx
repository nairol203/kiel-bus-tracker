'use client';

import { useBusStore } from '@/stores/bus-store';
import { ChevronRight, History, MapPin } from 'lucide-react';
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
				<>
					<h2 className='mt-2'>Zuletzt gesucht</h2>
					<div className='bg-secondary dark:bg-darkMode-secondary divide-background dark:divide-background/10 grid divide-y rounded'>
						{lastSearches
							.toReversed()
							.slice(0, 10)
							.map((stop, index) => (
								<Link
									className='group md:hover:bg-darkMode-secondary/10 dark:md:hover:bg-secondary/10 flex items-center gap-3 p-3 font-semibold transition duration-200 first:rounded-t last:rounded-b'
									href={`/stop/${stop.number}`}
									key={`${index}_${stop.id}`}
								>
									<History className='h-5 w-5 shrink-0 text-gray-400' />
									{stop.name}
									<ChevronRight className='ml-auto h-4 w-4 text-gray-400' />
								</Link>
							))}
					</div>
				</>
			) : (
				<></>
			)}
			<h2 className='mt-2'>Vorschläge</h2>
			<div className='bg-secondary dark:bg-darkMode-secondary divide-background dark:divide-background/10 grid divide-y rounded'>
				{recommendedStops.map((stop) => (
					<Link
						className='group md:hover:bg-darkMode-secondary/10 dark:md:hover:bg-secondary/10 flex items-center gap-3 p-3 font-semibold transition duration-200 first:rounded-t last:rounded-b'
						href={`/stop/${stop.number}`}
						key={stop.number}
					>
						<MapPin className='h-5 w-5 shrink-0 text-gray-400' />
						{stop.name}
						<ChevronRight className='ml-auto h-4 w-4 text-gray-400' />
					</Link>
				))}
			</div>
		</>
	);
}
