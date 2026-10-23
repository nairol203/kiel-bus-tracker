'use client';

import { queryClient } from '@/utils/Providers';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { getStopData } from './actions';
import DirectionFilter from './DirectionFilter';
import HealthIndicator from './HealthIndicator';
import KVGTable, { SkeletonKVGTable } from './KVGTable';
import RouteFilter from './RouteFilter';
import Searchbar from './Searchbar';

export default function Departures({ stopId }: { stopId: string }) {
	const searchParams = useSearchParams();

	const routeId = searchParams.get('routeId');
	const direction = searchParams.get('direction');

	const {
		data: busStop,
		isFetching,
		isError,
		isPaused,
		isLoading,
		isPlaceholderData,
		dataUpdatedAt,
	} = useQuery({
		queryKey: ['stopData', stopId, routeId, direction],
		queryFn: async () => getStopData({ stopId, direction, routeId }),
		placeholderData: keepPreviousData,
		refetchInterval: 15_000,
	});

	if (isLoading) {
		return (
			<div className='mx-2'>
				<Searchbar />
				<div className='bg-surface border-border mt-4 grid rounded border shadow'>
					<div className='bg-primary/10 flex items-center justify-between rounded-t p-4'>
						<div className='skeleton h-7 w-48 rounded-md' />
						<div className='skeleton h-4 w-24 rounded-md' />
					</div>
					<div className='border-border bg-primary/10 flex gap-2 border-b p-2'>
						<div className='skeleton h-10 w-28 rounded-md' />
						<div className='skeleton h-10 w-32 rounded-md' />
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
	} else if (busStop) {
		return (
			<div className='mx-2'>
				<Searchbar />
				<div className='bg-surface border-border mt-4 grid rounded border shadow'>
					<div className='bg-primary/10 flex items-center justify-between rounded-t p-4'>
						<h2 className='font-bold'>Abfahrten von {busStop.stopName}</h2>
						<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} dataUpdatedAt={dataUpdatedAt} />
					</div>
					{busStop.actual.length > 1 && (
						<div className='border-border bg-primary/10 grid grid-cols-2 gap-2 border-b p-2 md:flex'>
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

	return (
		<div className='mx-2'>
			<Searchbar />
			<div className='bg-surface mt-4 grid rounded shadow'>
				<div className='bg-primary/10 border-border flex items-center justify-between rounded-t border-b p-4'>
					<h2>Es ist ein Fehler aufgetreten.</h2>
					<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} dataUpdatedAt={dataUpdatedAt} />
				</div>
				<div className='text-muted p-8 text-center'>Die Haltestelle konnte nicht geladen werden.</div>
			</div>
		</div>
	);
}
