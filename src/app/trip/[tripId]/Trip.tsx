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
				<h2 className='skeleton my-3'>Lorem ipsum dolor sit.</h2>
				<div className='grid gap-2'>
					<SkeletonKVGTable />
					<SkeletonKVGTable />
					<SkeletonKVGTable />
				</div>
				<h2 className='skeleton mt-3'>Lorem ipsum dolor sit.</h2>
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
				<h2>Anschluss bei {tripInfo.actual[0].stop.name}</h2>
				<KVGTable data={filteredStop} isPaused={isPaused} orientation='horizontal' />
			</div>
		);
	};

	const NextStops: React.FC<{}> = () => {
		const stops = [...tripInfo.old, ...tripInfo.actual];
		const filteredStops = stops.filter((a) => a.status !== 'DEPARTED');

		return (
			<>
				<h2>Nächste Haltestellen</h2>
				<div className='bg-secondary dark:bg-darkMode-secondary p-4 rounded'>
					<ul className='grid relative gap-4 border-s-2 ml-2 mt-2 border-slate-300 dark:border-slate-700 border-default'>
						{filteredStops.map((a, index) => (
							<li className='ms-6 mb-2'>
								<div
									className={`absolute w-4 h-4 mt-1.5 -start-[9px] rounded-full border-4 bg-secondary dark:bg-darkMode-secondary ${index === 0 ? ' border-accent border-8' : 'border-slate-300 dark:border-slate-700'}`}
								/>
								<Link href={`/stop/${a.stop.shortName}`} key={a.stopSequenceNumber} className='flex items-center justify-between gap-2 rounded'>
									<span className='text-lg font-semibold'>{a.stop.name}</span>
									{a.actualDate && <span className='text-lg font-bold'>{getTimeDisplay(a.actualDate, useRelativeTimes, isPaused, false)}</span>}
								</Link>
							</li>
						))}
					</ul>
				</div>
				<div className='flex mt-2 justify-center'>
					<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} dataUpdatedAt={dataUpdatedAt} />
				</div>
			</>
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
