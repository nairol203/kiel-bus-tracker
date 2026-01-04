'use client';

import { getStopData } from '@/app/(components)/actions';
import DirectionFilter from '@/app/(components)/DirectionFilter';
import HealthIndicator from '@/app/(components)/HealthIndicator';
import KVGTable, { SkeletonKVGTable } from '@/app/(components)/KVGTable';
import RouteFilter from '@/app/(components)/RouteFilter';
import Searchbar from '@/app/(components)/Searchbar';
import { queryClient } from '@/utils/Providers';
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

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
					<input className='w-full rounded p-3' placeholder='Suche nach einer Haltestelle' disabled />
				</div>
				<div className='grid grid-cols-2 gap-2 md:flex mb-4'>
					<button className='skeleton z-10 flex gap-2 rounded-full p-2 transition'>
						Alle Linien
						<div className='h-[25px] w-[25px]' />
					</button>
					<button className='skeleton z-10 flex gap-2 rounded-full p-2 transition'>
						Alle Richtungen
						<div className='h-[25px] w-[25px]' />
					</button>
				</div>
				<div className='grid gap-2'>
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
			<div className='mx-2 grid gap-2'>
				<Searchbar currentStop={busStop} />
				<div className='grid grid-cols-2 gap-2 md:flex mb-4'>
					<RouteFilter stop={busStop} />
					<DirectionFilter stop={busStop} />
				</div>
				{isPlaceholderData ? (
					<div className='grid gap-2'>
						<SkeletonKVGTable />
						<SkeletonKVGTable />
						<SkeletonKVGTable />
						<SkeletonKVGTable />
						<SkeletonKVGTable />
					</div>
				) : (
					<KVGTable data={busStop} isPaused={isPaused} routeId={routeId} direction={direction} />
				)}
				<div className='flex items-center justify-center mt-2'>
					<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} dataUpdatedAt={dataUpdatedAt} />
				</div>
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
					className='rounded bg-primary px-2.5 py-1.5 text-darkMode-text md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-primary dark:text-text dark:md:hover:bg-darkMode-accent'
				>
					Erneut versuchen
				</button>
				<Link
					href='/'
					className='text-center rounded bg-secondary px-2.5 py-1.5 text-text md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-secondary dark:text-darkMode-text dark:md:hover:bg-darkMode-accent'
				>
					Zurück zur Startseite
				</Link>
			</div>
		</div>
	);
}
