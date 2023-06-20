'use client';

import { useMemo, useState } from 'react';
import { getStopData } from './actions';
import KVGTable from './KVGTable';
import Image from 'next/image';
import Draggable from './Draggable';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@lib/reactQuery';
import { useLocalStorage } from './useLocalStorage';
import Searchbar from './Searchbar';
import HealthIndicator from './HealthIndicator';

function filterUniqueAndSortAscending(arr: string[]) {
	const uniqueArr = Array.from(new Set(arr));
	const sortedArr = uniqueArr.sort();
	return sortedArr;
}

function concatenateDirectionsFromRoutes(arr: Route[]) {
	const concatenatedArray: string[] = [];
	arr.forEach(obj => {
		concatenatedArray.push(...obj.directions);
	});
	return concatenatedArray;
}

export default function Realtime({ allStops }: { allStops: StopByCharacter[] }) {
	const [query, setQuery] = useState('');
	const [selectedStop, setSelectedStop] = useLocalStorage<StopByCharacter | null>('stop', null);
	const [currentRouteId, setRouteId] = useLocalStorage<string | null>('routeId', null);
	const [currentDirection, setDirection] = useLocalStorage<string | null>('direction', null);

	const filteredStops = useMemo(() => {
		const formattedQuery = query.toLowerCase().replace(/\s+/g, '');
		return allStops.filter(stop => stop.name.toLowerCase().replace(/\s+/g, '').includes(formattedQuery)).slice(0, 15);
	}, [query, allStops]);

	const {
		data: currentStop,
		isFetching,
		isError,
		isPaused,
		isLoading,
	} = useQuery({
		queryKey: ['stopData'],
		queryFn: async () => {
			if (!selectedStop) return null;
			const res = await getStopData({ stopId: selectedStop.number, routeId: currentRouteId, direction: currentDirection });
			return res;
		},
		refetchInterval: 10_000,
	});

	const mutation = useMutation({
		mutationFn: getStopData,
		onSuccess: data => queryClient.setQueryData(['stopData'], data),
	});

	if (isLoading)
		return (
			<div className='grid gap-2 mx-2'>
				<div className='skeleton'>
					<input className='bg-black/10 dark:bg-white/25 rounded p-2 w-full' placeholder='Suche nach einer Haltestelle' disabled />
				</div>
				<div className='flex gap-2 whitespace-nowrap overflow-x-auto no-scrollbar'>
					<button className='px-2.5 py-1.5 rounded-full transition z-10 skeleton'>Lorem.</button>
					<button className='px-2.5 py-1.5 rounded-full transition z-10 skeleton'>Lorem.</button>
					<button className='px-2.5 py-1.5 rounded-full transition z-10 skeleton'>Lorem.</button>
					<button className='px-2.5 py-1.5 rounded-full transition z-10 skeleton'>Lorem.</button>
				</div>
				<div className='flex mt-2'>
					<h2 className='skeleton'>Lorem, ipsum dolor.</h2>
				</div>
				<div className='grid gap-1'>
					<div className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10 skeleton'>Lorem ipsum dolor sit amet.</div>
					<div className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10 skeleton'>Lorem ipsum dolor sit amet.</div>
					<div className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10 skeleton'>Lorem ipsum dolor sit amet.</div>
					<div className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10 skeleton'>Lorem ipsum dolor sit amet.</div>
					<div className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10 skeleton'>Lorem ipsum dolor sit amet.</div>
				</div>
			</div>
		);

	return (
		<div className='grid gap-2 mx-2'>
			<Searchbar
				selectedStop={selectedStop}
				setSelectedStop={setSelectedStop}
				setRouteId={setRouteId}
				setDirection={setDirection}
				mutation={mutation}
				filteredStops={filteredStops}
				setQuery={setQuery}
			/>
			{currentStop && (
				<div className='grid gap-2 relative'>
					<Draggable>
						{currentRouteId && (
							<button
								className='shrink-0 px-2.5 py-1.5 bg-white/80 dark:bg-white/10 rounded-full md:hover:bg-gray-100 dark:md:hover:bg-white/20 transition duration-200'
								onClick={() => {
									setRouteId(null);
									setDirection(null);
									mutation.mutate({ stopId: selectedStop!.number, direction: undefined, routeId: undefined });
								}}
							>
								<Image src='/xmark-light.svg' alt='X Icon' height={15} width={15} className='dark:hidden' />
								<Image src='/xmark-dark.svg' alt='X Icon' height={15} width={15} className='hidden dark:block' />
							</button>
						)}
						{currentStop.routes
							.filter(route => (currentDirection ? route.directions.includes(currentDirection) : true))
							.map(route => (
								<button
									className={
										`${currentRouteId && currentRouteId !== route.id && 'hidden'} ` +
										`${
											currentRouteId === route.id
												? 'bg-black dark:bg-white text-white dark:text-black'
												: 'bg-white/80 dark:bg-white/10 md:hover:bg-gray-100 dark:md:hover:bg-white/20 transition duration-200'
										} ` +
										`${currentDirection && '-mr-6'} ` +
										'px-2.5 py-1.5 rounded-full transition z-10'
									}
									onClick={() => {
										if (currentRouteId) {
											setRouteId(null);
											setDirection(null);
											mutation.mutate({ stopId: selectedStop!.number, direction: undefined, routeId: undefined });
										} else {
											setRouteId(route.id);
											mutation.mutate({ stopId: selectedStop!.number, direction: currentDirection, routeId: route.id });
										}
									}}
									key={route.id}
								>
									{route.authority} {route.name}
								</button>
							))}
						{currentRouteId &&
							filterUniqueAndSortAscending(concatenateDirectionsFromRoutes(currentStop.routes.filter(route => route.id === currentRouteId))).map(direction => (
								<button
									className={
										`${currentDirection && currentDirection !== direction && 'hidden'} ` +
										`${
											currentDirection === direction
												? 'bg-black/80 md:hover:bg-black/90 text-white dark:bg-white/80 dark:md:hover:bg-white/90 dark:text-black rounded-r-full pl-6'
												: 'bg-white/80 dark:bg-white/10 rounded-full md:hover:bg-gray-100 dark:md:hover:bg-white/20 transition duration-200'
										} ` +
										'px-2.5 py-1.5 transition'
									}
									onClick={() => {
										setDirection(currentDirection ? null : direction);
										mutation.mutate({ stopId: selectedStop!.number, direction: currentDirection ? undefined : direction, routeId: currentRouteId });
									}}
									key={direction}
								>
									{direction}
								</button>
							))}
					</Draggable>
					<div className='flex justify-between items-center mt-2'>
						<h2>{currentStop.stopName}</h2>
						<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} />
					</div>
					{mutation.isLoading ? (
						<div className='grid gap-1'>
							<div className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10 skeleton'>Lorem ipsum dolor sit amet.</div>
							<div className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10 skeleton'>Lorem ipsum dolor sit amet.</div>
							<div className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10 skeleton'>Lorem ipsum dolor sit amet.</div>
							<div className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10 skeleton'>Lorem ipsum dolor sit amet.</div>
							<div className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10 skeleton'>Lorem ipsum dolor sit amet.</div>
						</div>
					) : (
						<KVGTable data={currentStop.actual} />
					)}
				</div>
			)}
		</div>
	);
}
