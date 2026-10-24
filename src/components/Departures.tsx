'use client';

import { queryClient } from '@/utils/Providers';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { AlertCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getStopData } from './actions';
import DirectionFilter from './DirectionFilter';
import HealthIndicator from './HealthIndicator';
import KVGTable, { SkeletonKVGTable } from './KVGTable';
import RouteFilter from './RouteFilter';
import Searchbar from './Searchbar';

export default function Departures({ stopId }: { stopId: string }) {
	const searchParams = useSearchParams();
	const router = useRouter();

	const routeId = searchParams.get('routeId');
	const direction = searchParams.get('direction');

	const {
		data: busStop,
		isFetching,
		isError,
		isPaused,
		isPlaceholderData,
		dataUpdatedAt,
	} = useQuery({
		queryKey: ['stopData', stopId, routeId, direction],
		queryFn: async () => getStopData({ stopId, direction, routeId }),
		placeholderData: keepPreviousData,
		refetchInterval: 15_000,
	});

	if (isError) {
		return (
			<div className='mx-2'>
				<Searchbar />
				<div className='mt-4'>
					<div className='bg-surface/50 border-border flex flex-col items-center justify-center rounded border p-12 text-center shadow-lg'>
						<AlertCircle className='text-muted mb-4 h-10 w-10' />
						<h1 className='text-text mb-2 text-xl font-bold'>Fehler beim Laden der Haltestelle</h1>
						<p className='text-muted mb-6 text-sm'>Die Fahrtdaten konnten nicht abgerufen werden.</p>
						<div className='flex gap-3'>
							<button
								onClick={() => queryClient.refetchQueries({ queryKey: ['stopData', stopId, routeId, direction] })}
								className='bg-primary hover:bg-primary/90 rounded-lg px-4 py-2 text-white shadow'
							>
								Erneut versuchen
							</button>
							<button onClick={() => router.back()} className='bg-surface hover:bg-surface-hover text-muted border-border rounded-lg border px-4 py-2'>
								Zurück
							</button>
						</div>
					</div>
				</div>
			</div>
		);
	}

	if (!busStop) {
		return (
			<div className='mx-2'>
				<Searchbar />
				<div className='bg-surface border-border mt-4 grid rounded border shadow'>
					<div className='bg-primary/10 border-border flex items-center justify-between rounded-t border-b p-4'>
						<div className='skeleton h-7 w-64 rounded-md' />
						<div className='skeleton h-4 w-24 rounded-md' />
					</div>
					<div className='border-border bg-surface-hover/30 grid grid-cols-2 gap-2 border-b p-2 md:flex'>
						<div className='skeleton h-10 rounded-md md:w-28' />
						<div className='skeleton h-10 rounded-md md:w-60' />
					</div>
					<div className='divide-border grid divide-y'>
						<SkeletonKVGTable />
						<SkeletonKVGTable />
						<SkeletonKVGTable />
						<SkeletonKVGTable />
						<SkeletonKVGTable />
					</div>
				</div>
			</div>
		);
	}

	return (
		<div className='mx-2'>
			<Searchbar />
			<div className='bg-surface border-border mt-4 grid rounded border shadow'>
				<div className='bg-primary/10 border-border flex items-center justify-between rounded-t border-b p-4'>
					<h2 className='font-bold'>Abfahrten von {busStop.stopName}</h2>
					<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} dataUpdatedAt={dataUpdatedAt} />
				</div>
				{(busStop.actual.length > 1 || !!routeId || !!direction) && (
					<div className='border-border bg-surface-hover/30 grid grid-cols-2 gap-2 border-b p-2 md:flex'>
						<RouteFilter stop={busStop} />
						<DirectionFilter stop={busStop} />
					</div>
				)}
				{isPlaceholderData ? (
					<div className='divide-border grid divide-y'>
						<SkeletonKVGTable />
						<SkeletonKVGTable />
						<SkeletonKVGTable />
						<SkeletonKVGTable />
						<SkeletonKVGTable />
					</div>
				) : (
					<KVGTable data={busStop} isPaused={isPaused} routeId={routeId} direction={direction} />
				)}
			</div>
		</div>
	);
}
