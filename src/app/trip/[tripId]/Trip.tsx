'use client';

import { getStopData, getTripInfo } from '@/app/(components)/actions';
import KVGTable, { SkeletonKVGTable } from '@/app/(components)/KVGTable';
import { useBusStore } from '@/stores/bus-store';
import { queryClient } from '@/utils/Providers';
import { useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import HealthIndicator from 'src/app/(components)/HealthIndicator';

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
		queryKey: ['tripInfo'],
		queryFn: async () => {
			queryClient.invalidateQueries({ queryKey: ['connectingBus'] });
			const res = await getTripInfo(tripId);
			return res;
		},
		refetchInterval: 15_000,
	});

	const { useRelativeTimes } = useBusStore();

	if (isError) {
		return (
			<div className='mx-2 grid gap-2'>
				<h1>Fehler</h1>
				<span>Die Fahrt konnte nicht geladen werden.</span>
				<button
					onClick={() => queryClient.refetchQueries({ queryKey: ['tripInfo'] })}
					className='rounded bg-primary px-2.5 py-1.5 text-darkMode-text md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-primary dark:text-text dark:md:hover:bg-darkMode-accent'
				>
					Erneut versuchen
				</button>
				<button
					onClick={() => router.back()}
					className='rounded bg-secondary px-2.5 py-1.5 text-text md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-secondary dark:text-darkMode-text dark:md:hover:bg-darkMode-accent'
				>
					Zurück
				</button>
			</div>
		);
	}

	if (!tripInfo) {
		return (
			<div className='mx-2 grid gap-3'>
				<h1 className='flex gap-2'>
					<span className='rounded-lg px-2 skeleton'>00</span>
					<span className='skeleton'>Lorem ipsum.</span>
				</h1>
				<div className='flex items-center justify-between'>
					<h2 className='skeleton'>Lorem ipsum dolor sit.</h2>
					<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} dataUpdatedAt={dataUpdatedAt} />
				</div>
				<div className='grid gap-2'>
					<SkeletonKVGTable />
					<SkeletonKVGTable />
					<SkeletonKVGTable />
				</div>
				<div className='flex items-center justify-between'>
					<h2 className='skeleton'>Lorem ipsum dolor sit.</h2>
					<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} dataUpdatedAt={dataUpdatedAt} />
				</div>
				<div className='grid gap-2'>
					<SkeletonKVGTable />
					<SkeletonKVGTable />
					<SkeletonKVGTable />
					<SkeletonKVGTable />
					<SkeletonKVGTable />
					<SkeletonKVGTable />
				</div>
			</div>
		);
	}

	const ConnectingBus: React.FC<{}> = () => {
		const {
			data: busStop,
			isFetching,
			isError,
			isPaused,
		} = useQuery({
			queryKey: ['connectingBus'],
			queryFn: () => getStopData({ stopId: tripInfo.actual[0].stop.shortName }),
			refetchInterval: 15_000,
		});

		if (!busStop) return;

		const filteredStop: NormalizedKVGStops = {
			...busStop,
			actual: busStop.actual.filter((a) => tripInfo.routeName !== a.patternText && a.actualRelativeTime < 1800 && a.actualDate > tripInfo.actual[0].actualDate).slice(0, 5),
		};

		if (!filteredStop.actual.length) return;

		return (
			<div className='grid gap-2'>
				<h2>Anschluss Busse für {tripInfo.actual[0].stop.name}</h2>
				<KVGTable data={filteredStop} isPaused={isPaused} />
				{busStop.actual.filter((a) => tripInfo.routeName !== a.patternText && a.actualRelativeTime < 1800 && a.actualDate > tripInfo.actual[0].actualDate).length !==
					filteredStop.actual.length && (
					<Link
						className='rounded text-center p-2 bg-secondary shadow transition duration-200 md:hover:bg-secondary/75 dark:bg-darkMode-secondary dark:md:hover:bg-secondary/10'
						href={`/stop/${tripInfo.actual[0].stop.shortName}`}
					>
						Mehr anzeigen
					</Link>
				)}
			</div>
		);
	};

	const NextStops: React.FC<{}> = () => {
		const stops = [...tripInfo.old, ...tripInfo.actual];
		const filteredStops = stops.filter((a) => a.status !== 'DEPARTED');

		return (
			<div className='grid gap-2'>
				<h2>Nächste Haltestellen</h2>
				<div className='grid grid-cols-[1.25rem_1fr] gap-x-2'>
					{filteredStops.map((a, index) => (
						<>
							<div
								className={`flex items-center justify-center bg-accent ${index === 0 ? 'rounded-t-full mt-0.5' : ''} ${index === filteredStops.length - 1 ? 'rounded-b-full mb-0.5' : ''}`}
							>
								<div className={`w-3 h-3 bg-secondary rounded-full`}></div>
							</div>
							<Link
								href={`/stop/${a.stop.shortName}`}
								key={a.stopSequenceNumber}
								className='flex items-center justify-between gap-2 rounded bg-secondary px-2 py-3 my-1 shadow transition duration-200 md:hover:bg-secondary/75 dark:bg-darkMode-secondary dark:md:hover:bg-secondary/10'
							>
								<span className='font-semibold'>{a.stop.name}</span>
								{a.actualDate && <span className='text-lg font-bold'>{getTimeDisplay(a.actualDate, useRelativeTimes, isPaused, false)}</span>}
							</Link>
						</>
					))}
				</div>
				<div className='flex mt-2 justify-center'>
					<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} dataUpdatedAt={dataUpdatedAt} />
				</div>
			</div>
		);
	};

	return (
		<div className='mx-2 grid gap-3'>
			<h1 className='flex gap-2'>
				<span className='rounded-lg bg-accent px-2 text-center text-darkMode-text dark:bg-darkMode-accent'>{tripInfo.routeName}</span>
				<span>{tripInfo.directionText}</span>
			</h1>
			{tripInfo.actual.length ? (
				<>
					<ConnectingBus />
					<NextStops />
				</>
			) : (
				<>
					<span>Der Bus hat die Endstation erreicht.</span>
					<button
						onClick={() => router.back()}
						className='rounded bg-primary px-2.5 py-1.5 text-darkMode-text md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-primary dark:text-text dark:md:hover:bg-darkMode-accent'
					>
						Zurück
					</button>
				</>
			)}
		</div>
	);
}
