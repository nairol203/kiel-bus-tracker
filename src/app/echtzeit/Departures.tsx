'use client';

import { queryClient } from '@/utils/Providers';
import { useMutation, useQuery } from '@tanstack/react-query';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';
import { getStopData } from '../(components)/actions';
import HealthIndicator from '../(components)/HealthIndicator';
import KVGTable from '../(components)/KVGTable';
import DirectionFilter from './DirectionFilter';
import RecommendedSearches from './RecommendedSearches';
import RouteFilter from './RouteFilter';
import Searchbar from './Searchbar';

export default function Departures({ stops }: { stops: StopByCharacter[] }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

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
		refetchInterval: 10_000,
	});

	const mutation = useMutation({
		mutationFn: getStopData,
		onSuccess: (data) => queryClient.setQueryData(['stopData'], data),
	});

	if (isLoading) {
		return (
			<div className='mx-2 grid gap-2'>
				<div className='skeleton'>
					<input className='w-full rounded p-2' placeholder='Suche nach einer Haltestelle' disabled />
				</div>
				<div className='flex'>
					<h1 className='skeleton'>Lorem, ipsum do.</h1>
				</div>
				<div className='mb-2 flex flex-wrap gap-2'>
					<button className='skeleton z-10 flex gap-2 rounded-full px-2 py-1 transition'>
						Alle Linien
						<div className='h-[15px] w-[15px]' />
					</button>
					<button className='skeleton z-10 flex gap-2 rounded-full px-2 py-1 transition'>
						Alle Richtungen
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
		);
	} else if (mutation.isPending) {
		return (
			<div className='mx-2 grid gap-2'>
				<Searchbar allStops={stops} />
				<div className='mt-2 flex'>
					<h1 className='skeleton'>Lorem, ipsum do.</h1>
				</div>
				<div className='mb-2 flex flex-wrap gap-2'>
					<button className='skeleton z-10 flex gap-2 rounded-full px-2 py-1 transition'>
						Alle Linien
						<div className='h-[15px] w-[15px]' />
					</button>
					<button className='skeleton z-10 flex gap-2 rounded-full px-2 py-1 transition'>
						Alle Richtungen
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
