'use client';

import { Clock } from 'lucide-react';
import Link from 'next/link';

function parseTime(time?: string) {
	if (!time) return new Date(NaN);
	const [hours, minutes] = time.split(':').map(Number);
	const date = new Date();
	date.setHours(hours, minutes, 0, 0);
	return date;
}

function hasBusDelay(plannedTime: string, actualTime?: string) {
	const plannedDate = parseTime(plannedTime);
	const actualDate = parseTime(actualTime);
	const diffMinutes = (actualDate.getTime() - plannedDate.getTime()) / 60000;
	return diffMinutes > 2;
}

export default function KVGTable({ data }: { data: KVGStops }) {
	return (
		<div className='divide-border divide-y'>
			{data.actual.length ? (
				data.actual.map((actual, index) => (
					<Link
						href={`/trip/${actual.tripId}`}
						className='md:hover:bg-surface-hover grid grid-cols-[35px_1fr_75px] items-center justify-between gap-x-6 p-4 transition duration-200'
						key={`${index}-${actual.tripId}`}
					>
						<span className='bg-primary flex h-12 w-12 items-center justify-center rounded-lg text-center text-lg font-semibold text-white'>{actual.patternText}</span>
						<div className='grid'>
							<span className='text-lg font-semibold whitespace-nowrap'>{actual.direction}</span>
							{hasBusDelay(actual.plannedTime, actual.actualTime) ? (
								<div className='flex gap-2 text-sm font-semibold'>
									<span className='text-muted flex items-center gap-1 line-through'>
										<Clock className='h-3.5 w-3.5' /> {actual.plannedTime}
									</span>
									<span className='text-red-400'>{actual.actualTime}</span>
									<span className='shrink-0 rounded border border-red-500/20 bg-red-500/10 px-1.5 py-0.5 text-[10px] tracking-wider text-red-400 uppercase'>
										Verspätet
									</span>
								</div>
							) : (
								<span className='text-muted flex items-center gap-1 text-sm font-semibold'>
									<Clock className='h-3.5 w-3.5' /> {actual.actualTime || actual.plannedTime}
								</span>
							)}
						</div>
						<span className='flex items-center justify-end text-lg font-semibold'>
							{actual.actualRelativeTime < 60 ? 'Jetzt' : `${Math.round(actual.actualRelativeTime / 60)} min`}
						</span>
					</Link>
				))
			) : (
				<div className='text-muted p-8 text-center'>Keine anstehenden Abfahrten.</div>
			)}
		</div>
	);
}
