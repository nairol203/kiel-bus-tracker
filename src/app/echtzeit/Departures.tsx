'use client';

import { queryClient } from '@/utils/Providers';
import useLocalStorage from '@/utils/useSessionStorage';
import { useMutation, useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getStopData } from '../(components)/actions';
import HealthIndicator from '../(components)/HealthIndicator';
import KVGTable, { SkeletonKVGTable } from '../(components)/KVGTable';
import DirectionFilter from './DirectionFilter';
import RecommendedSearches from './RecommendedSearches';
import RouteFilter from './RouteFilter';
import Searchbar from './Searchbar';

export default function Departures({ stops }: { stops: StopByCharacter[] }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const [useRelativeTimes, _] = useLocalStorage<boolean>('useRelativeTimes', true);

	const stopId = searchParams.get('stop');
	const routeId = searchParams.get('routeId') ?? undefined;
	const direction = searchParams.get('direction') ?? undefined;

	useEffect(() => {
		if (!stopId) {
			queryClient.removeQueries({ queryKey: ['stopData'] });
		} else {
			mutation.mutate({ stopId, routeId, direction });
		}
	}, [pathname, searchParams, stopId, routeId, direction]);

	const {
		data: busStop,
		isFetching,
		isError,
		isPaused,
		isLoading,
	} = useQuery({
		queryKey: ['stopData'],
		queryFn: async () => {
			if (!stopId) return null;
			const res = await getStopData({ stopId, routeId, direction });
			return res;
		},
		refetchInterval: 15_000,
	});

	const mutation = useMutation({
		mutationFn: getStopData,
		onSuccess: (data) => queryClient.setQueryData(['stopData'], data),
	});

	if (isLoading) {
		return (
			<div className='mx-2 grid gap-2'>
				<div className='skeleton'>
					<input className='w-full rounded p-3' placeholder='Suche nach einer Haltestelle' disabled />
				</div>
				<div className='grid grid-cols-2 gap-2 md:flex'>
					<button className='skeleton z-10 flex gap-2 rounded-full p-2 transition'>
						Alle Linien
						<div className='h-[25px] w-[25px]' />
					</button>
					<button className='skeleton z-10 flex gap-2 rounded-full p-2 transition'>
						Alle Richtungen
						<div className='h-[25px] w-[25px]' />
					</button>
					<div className='flex justify-end col-span-2 md:ml-auto items-center'>
						<div className='px-2.5 py-1'>
							<span className='relative flex h-3 w-3'>
								<span className='h-3 w-3 skeleton'></span>
							</span>
						</div>
					</div>
				</div>
				<div className='grid gap-1'>
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
				<Searchbar allStops={stops} currentStop={busStop} />
				<div className='grid grid-cols-2 gap-2 md:flex'>
					<RouteFilter stop={busStop} />
					<DirectionFilter stop={busStop} />
					<div className='flex justify-end col-span-2 md:ml-auto items-center'>
						<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} />
					</div>
				</div>
				{/* <div className='mt-2 flex items-center justify-between'>
					<h1 className='line-clamp-1'>{busStop.stopName}</h1>
				</div> */}
				{mutation.isPending ? (
					<div className='grid gap-1'>
						<SkeletonKVGTable />
						<SkeletonKVGTable />
						<SkeletonKVGTable />
						<SkeletonKVGTable />
						<SkeletonKVGTable />
					</div>
				) : (
					<KVGTable data={busStop} isPaused={isPaused} routeId={routeId} direction={direction} useRelativeTimes={useRelativeTimes} />
				)}
			</div>
		);
	} else if (mutation.isPending) {
		return (
			<div className='mx-2 grid gap-2'>
				<Searchbar allStops={stops} />
				<div className='grid grid-cols-2 gap-2 md:flex'>
					<button className='skeleton z-10 flex gap-2 rounded-full p-2 transition'>
						Alle Linien
						<div className='h-[15px] w-[15px]' />
					</button>
					<button className='skeleton z-10 flex gap-2 rounded-full p-2 transition'>
						Alle Richtungen
						<div className='h-[15px] w-[15px]' />
					</button>
				</div>
				<div className='grid gap-1'>
					<SkeletonKVGTable />
					<SkeletonKVGTable />
					<SkeletonKVGTable />
					<SkeletonKVGTable />
					<SkeletonKVGTable />
				</div>
			</div>
		);
	} else if (isError) {
		return (
			<div className='mx-2 grid gap-2'>
				<Searchbar allStops={stops} />
				<div className='grid gap-2 mt-2'>
					<h1>Fehler</h1>
					<span>Die Haltestelle konnte nicht geladen werden.</span>
					<button
						onClick={() => router.back()}
						className='rounded bg-primary text-darkMode-text px-2.5 py-1.5 dark:bg-darkMode-primary dark:text-text md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
					>
						Zurück
					</button>
				</div>
			</div>
		);
	}

	return (
		<div className='mx-2 grid gap-2'>
			<Searchbar allStops={stops} />
			<RecommendedSearches stops={stops} />
		</div>
	);
}
