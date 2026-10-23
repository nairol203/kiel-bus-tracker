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
			<div className='mx-2 grid gap-2'>
				<div className='skeleton'>
					<input className='w-full rounded-sm p-3' placeholder='Suche nach einer Haltestelle' disabled />
				</div>
				<div className='mt-2 flex'>
					<h2 className='skeleton'>Abfahrten von Placeholder</h2>
				</div>
				<div className='mb-4 grid grid-cols-2 gap-2 md:flex'>
					<button className='skeleton z-10 flex gap-2 rounded-full p-2 transition'>
						Alle Linien
						<div className='h-6.25 w-6.25' />
					</button>
					<button className='skeleton z-10 flex gap-2 rounded-full p-2 transition'>
						Alle Richtungen
						<div className='h-6.25 w-6.25' />
					</button>
				</div>
				<div className='skeleton divide-background dark:divide-background/10 grid divide-y rounded'>
					<SkeletonKVGTable />
					<SkeletonKVGTable />
					<SkeletonKVGTable />
					<SkeletonKVGTable />
					<SkeletonKVGTable />
				</div>
			</div>
		);
	} else if (busStop) {
		return (
			<div className='mx-2 grid gap-4'>
				<Searchbar />
				<div className='mt-2 flex items-center justify-between'>
					<h2>Abfahrten von {busStop.stopName}</h2>
					<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} dataUpdatedAt={dataUpdatedAt} />
				</div>
				{busStop.actual.length > 1 && (
					<div className='grid grid-cols-2 gap-2 md:flex'>
						<RouteFilter stop={busStop} />
						<DirectionFilter stop={busStop} />
					</div>
				)}
				{isPlaceholderData ? (
					<div className='skeleton divide-background dark:divide-background/10 grid divide-y rounded'>
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
		);
	}

	return (
		<div className='mx-2 grid gap-2'>
			<Searchbar />
			<div className='mt-2 grid gap-2'>
				<h1>Fehler</h1>
				<span>Die Haltestelle konnte nicht geladen werden.</span>
				<button
					onClick={() => queryClient.refetchQueries({ queryKey: ['stopData', stopId, routeId, direction] })}
					className='bg-primary text-darkMode-text md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-primary dark:text-text dark:md:hover:bg-darkMode-accent rounded-sm px-2.5 py-1.5'
				>
					Erneut versuchen
				</button>
				<Link
					href='/'
					className='bg-secondary text-text md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-secondary dark:text-darkMode-text dark:md:hover:bg-darkMode-accent rounded-sm px-2.5 py-1.5 text-center'
				>
					Zurück zur Startseite
				</Link>
			</div>
		</div>
	);
}
