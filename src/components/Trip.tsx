'use client';

import { useBusStore } from '@/stores/bus-store';
import { queryClient } from '@/utils/Providers';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getTripInfo } from './actions';
import HealthIndicator from './HealthIndicator';

function getTimeDisplay(date: Date, useRelative: boolean, isPaused: boolean, departed = false) {
	if (isPaused || !useRelative) {
		return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
	}
	const timeDifferenceMin = Math.floor(((new Date().getTime() - date.getTime()) * (departed ? 1 : -1)) / 60000);
	if (departed) return `vor ${timeDifferenceMin} min`;
	return timeDifferenceMin < 1 ? 'Sofort' : `${timeDifferenceMin} min`;
}

export default function Trip({ tripId }: { tripId: string }) {
	const router = useRouter();
	const {
		data: tripInfo,
		isFetching,
		isError,
		isPaused,
		dataUpdatedAt,
	} = useQuery({
		queryKey: ['tripInfo', tripId],
		queryFn: () => getTripInfo(tripId),
		refetchInterval: 15_000,
	});

	const { useRelativeTimes } = useBusStore();

	if (isError) {
		return (
			<div className='mx-2 grid gap-2'>
				<h1>Fehler</h1>
				<span>Die Fahrt konnte nicht geladen werden.</span>
				<button onClick={() => queryClient.refetchQueries({ queryKey: ['tripInfo', tripId] })} className='bg-primary/40 md:hover:bg-primary/60 rounded-sm px-2.5 py-1.5'>
					Erneut versuchen
				</button>
				<button onClick={() => router.back()} className='bg-primary/5 md:hover:bg-primary/10 rounded-sm px-2.5 py-1.5'>
					Zurück
				</button>
			</div>
		);
	}

	if (!tripInfo) {
		return (
			<div className='mx-2 grid gap-3'>
				<h1 className='flex items-center gap-2'>
					<div className='skeleton h-12 w-12 rounded-lg' />
					<div className='skeleton h-7 w-48 rounded-md' />
				</h1>
				<div className='flex'>
					<div className='skeleton mt-3 h-6 w-40 rounded-md' />
				</div>
				<div className='bg-primary/5 rounded-sm p-4'>
					<ul className='border-border relative mt-2 ml-2 grid gap-4 border-s-2'>
						{[...Array(6)].map((_, index) => (
							<li className='ms-6 mb-2 flex items-center justify-between gap-2' key={index}>
								<div className='bg-surface-hover/80 border-border absolute -inset-s-2.25 mt-1.5 h-4 w-4 rounded-full border-2 animate-pulse' />
								<div className='skeleton h-5 w-36 rounded-md' />
								<div className='skeleton h-5 w-16 rounded-md' />
							</li>
						))}
					</ul>
				</div>
			</div>
		);
	}

	const stops = [...tripInfo.old, ...tripInfo.actual];
	const filteredStops = stops.filter((a) => a.status !== 'DEPARTED');

	return (
		<div className='mx-2 grid gap-3'>
			<h1 className='flex items-center gap-2'>
				<span className='bg-primary/60 flex h-12 w-12 items-center justify-center rounded-lg text-center'>{tripInfo.routeName}</span>
				<span>{tripInfo.directionText}</span>
			</h1>
			{tripInfo.actual.length ? (
				<>
					<h2>Nächste Haltestellen</h2>
					<div className='bg-primary/5 rounded-sm p-4'>
						<ul className='border-default border-text relative mt-2 ml-2 grid gap-4 border-s-2'>
							{filteredStops.map((a, index) => (
								<li className='ms-6 mb-2' key={a.stopSequenceNumber}>
									<div className={`bg-primary absolute -inset-s-2.25 mt-1.5 h-4 w-4 rounded-full border-4 ${index === 0 ? 'border-primary' : 'border-text'}`} />
									<Link href={`/stop/${a.stop.shortName}`} className='flex items-center justify-between gap-2 rounded-sm'>
										<span className='font-semibold'>{a.stop.name}</span>
										{a.actualDate && <span className='text-lg font-bold'>{getTimeDisplay(a.actualDate, useRelativeTimes, isPaused, false)}</span>}
									</Link>
								</li>
							))}
						</ul>
					</div>
					<div className='mt-2 flex justify-center'>
						<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} dataUpdatedAt={dataUpdatedAt} />
					</div>
				</>
			) : (
				<>
					<span>Der Bus hat die Endstation erreicht.</span>
					<button onClick={() => router.back()} className='bg-primary/40 md:hover:bg-primary/60 rounded-sm px-2.5 py-1.5'>
						Zurück
					</button>
				</>
			)}
		</div>
	);
}
