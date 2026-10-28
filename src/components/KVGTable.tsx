'use client';

import { StopDepartures } from '@/lib/schemas';
import Link from 'next/link';

function getDelayMinutes(plannedTime: string, actualTime?: string) {
	if (!actualTime) return 0;

	const [plannedHours, plannedMinutes] = plannedTime.split(':').map(Number);
	const [actualHours, actualMinutes] = actualTime.split(':').map(Number);

	const totalPlanned = plannedHours * 60 + plannedMinutes;
	let totalActual = actualHours * 60 + actualMinutes;

	// Handle midnight crossover (if time2 is on the next day)
	if (totalActual < totalPlanned) {
		totalActual += 24 * 60; // Add 24 hours in minutes (1440)
	}

	return totalActual - totalPlanned;
}

export default function KVGTable({ data, direction, routeId }: { data: StopDepartures; routeId?: string | null; direction?: string | null }) {
	return (
		<div className='divide-border divide-y'>
			{data.actual.length ? (
				data.actual.map((actual, index) => {
					if (direction && actual.direction !== direction) return null;
					if (routeId && actual.routeId !== routeId) return null;
					const delayMin = getDelayMinutes(actual.plannedTime, actual.actualTime);
					return (
						<Link
							href={`/trip/${actual.tripId}`}
							className='md:hover:bg-surface-hover flex items-center gap-x-3 p-3 transition duration-200'
							key={`${index}-${actual.tripId}`}
						>
							<span className='bg-primary flex h-10 w-10 shrink-0 items-center justify-center rounded text-center text-lg text-white'>{actual.patternText}</span>
							<div className='flex w-full flex-wrap items-center justify-between gap-x-3'>
								<span className={`text-lg text-nowrap ${delayMin > 2 ? '' : 'row-span-2'}`}>{actual.direction}</span>
								{delayMin > 2 && (
									<div className=''>
										<span className='rounded border border-red-500/20 bg-red-500/10 px-1.5 py-0.5 text-xs text-red-400'>{delayMin} min verspätet</span>
									</div>
								)}
							</div>
							<span className='text-lg text-nowrap'>{actual.actualRelativeTime < 60 ? 'Jetzt' : `${Math.round(actual.actualRelativeTime / 60)} min`}</span>
						</Link>
					);
				})
			) : (
				<div className='text-muted p-8 text-center'>Keine anstehenden Abfahrten.</div>
			)}
		</div>
	);
}
