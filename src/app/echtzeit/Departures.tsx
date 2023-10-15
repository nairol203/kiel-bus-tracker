'use client';

import { queryClient } from '@/utils/Providers';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getStopData } from '../(components)/actions';
import HealthIndicator from '../(components)/HealthIndicator';
import KVGTable from '../(components)/KVGTable';
import DirectionFilter from './DirectionFilter';
import RecommendedSearches from './RecommendedSearches';
import RouteFilter from './RouteFilter';
import Searchbar from './Searchbar';

export default function Departures({ stops }: { stops: StopByCharacter[] }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const stopId = searchParams.get('stop');
	const routeId = searchParams.get('routeId') ?? undefined;
	const direction = searchParams.get('direction') ?? undefined;

	useEffect(() => {
		if (!stopId) {
			queryClient.removeQueries(['stopData']);
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
		refetchInterval: 10_000,
	});

	const mutation = useMutation({
		mutationFn: getStopData,
		onSuccess: (data) => queryClient.setQueryData(['stopData'], data),
	});

	if (isLoading)
		return (
			<div className='mx-2 grid gap-2'>
				<div className='skeleton'>
					<input className='w-full rounded p-2' placeholder='Suche nach einer Haltestelle' disabled />
				</div>
				<div className=' flex'>
					<h2 className='skeleton'>Lorem, ipsum do.</h2>
				</div>
				<div className='no-scrollbar flex gap-2 overflow-x-auto whitespace-nowrap'>
					<button className='skeleton flex gap-2 z-10 rounded-full px-2 py-1 transition'>
						Linie
						<div className='h-[15px] w-[15px]' />
					</button>
					<button className='skeleton flex gap-2 z-10 rounded-full px-2 py-1 transition'>
						Richtung
						<div className='h-[15px] w-[15px]' />
					</button>
				</div>
				<div className='grid gap-1'>
					<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
				</div>
			</div>
		);

	return (
		<div className='mx-2 grid gap-2'>
			<Searchbar allStops={stops} />
			{busStop ? (
				<div className='relative grid gap-2'>
					{/* <Filter busStop={busStop} /> */}
					<div className='mt-2 flex items-center justify-between'>
						<h1 className='h2'>{busStop.stopName}</h1>
						<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} />
					</div>
					<div className='flex gap-2'>
						<RouteFilter stop={busStop} />
						<DirectionFilter stop={busStop} />
					</div>
					{mutation.isLoading ? (
						<div className='grid gap-1'>
							<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
							<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
							<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
							<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
							<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
						</div>
					) : (
						<KVGTable data={busStop} isPaused={isPaused} routeId={routeId} direction={direction} />
					)}
				</div>
			) : !mutation.isLoading ? (
				<RecommendedSearches stops={stops} />
			) : (
				<></>
			)}
			{!busStop && mutation.isLoading && (
				<>
					<div className='no-scrollbar flex gap-2 overflow-x-auto whitespace-nowrap'>
						<button className='skeleton z-10 rounded-full px-2.5 py-1.5 transition'>Lorem.</button>
						<button className='skeleton z-10 rounded-full px-2.5 py-1.5 transition'>Lorem.</button>
						<button className='skeleton z-10 rounded-full px-2.5 py-1.5 transition'>Lorem.</button>
						<button className='skeleton z-10 rounded-full px-2.5 py-1.5 transition'>Lorem.</button>
					</div>
					<div className='mt-2 flex'>
						<h2 className='skeleton'>Lorem, ipsum dolor.</h2>
					</div>
					<div className='grid gap-1'>
						<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
						<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
						<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
						<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
						<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
					</div>
				</>
			)}
		</div>
	);
}
