'use client';

import { queryClient } from '@/utils/Providers';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useMemo, useState } from 'react';
import { useSessionStorage } from '../../utils/useSessionStorage';
import { getStopData } from '../(components)/actions';
import HealthIndicator from '../(components)/HealthIndicator';
import KVGTable from '../(components)/KVGTable';
import Draggable from './Draggable';
import Searchbar from './Searchbar';

function filterUniqueAndSortAscending(arr: string[]) {
	const uniqueArr = Array.from(new Set(arr));
	const sortedArr = uniqueArr.sort();
	return sortedArr;
}

function concatenateDirectionsFromRoutes(arr: Route[]) {
	const concatenatedArray: string[] = [];
	arr.forEach((obj) => {
		concatenatedArray.push(...obj.directions);
	});
	return concatenatedArray;
}

export default function Realtime({ allStops }: { allStops: StopByCharacter[] }) {
	const [query, setQuery] = useState('');
	const [selectedStop, setSelectedStop] = useSessionStorage<StopByCharacter | null>('stop', null);
	const [currentRouteId, setRouteId] = useSessionStorage<string | null>('routeId', null);
	const [currentDirection, setDirection] = useSessionStorage<string | null>('direction', null);

	const filteredStops = useMemo(() => {
		const formattedQuery = query.toLowerCase().replace(/\s+/g, '');
		return allStops.filter((stop) => stop.name.toLowerCase().replace(/\s+/g, '').includes(formattedQuery)).slice(0, 15);
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
		onSuccess: (data) => queryClient.setQueryData(['stopData'], data),
	});

	if (isLoading)
		return (
			<div className='mx-2 grid gap-2'>
				<div className='skeleton'>
					<input className='w-full rounded bg-black/10 p-2 dark:bg-white/25' placeholder='Suche nach einer Haltestelle' disabled />
				</div>
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
					<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
				</div>
			</div>
		);

	return (
		<div className='mx-2 grid gap-2'>
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
				<div className='relative grid gap-2'>
					<Draggable>
						{currentRouteId && (
							<button
								className='shrink-0 rounded-full bg-white/80 px-2.5 py-1.5 transition duration-200 dark:bg-white/10 md:hover:bg-gray-100 dark:md:hover:bg-white/20'
								onClick={() => {
									setRouteId(null);
									setDirection(null);
									mutation.mutate({ stopId: selectedStop!.number, direction: undefined, routeId: undefined });
								}}
							>
								<Image src='/xmark.svg' alt='X Icon' height={15} width={15} className='dark:invert' />
							</button>
						)}
						{currentStop.routes
							.filter((route) => (currentDirection ? route.directions.includes(currentDirection) : true))
							.map((route) => (
								<button
									className={
										`${currentRouteId && currentRouteId !== route.id && 'hidden'} ` +
										`${
											currentRouteId === route.id
												? 'bg-black text-white dark:bg-white dark:text-black'
												: 'bg-white/80 transition duration-200 dark:bg-white/10 md:hover:bg-gray-100 dark:md:hover:bg-white/20'
										} ` +
										`${currentDirection && '-mr-6'} ` +
										'z-10 rounded-full px-2.5 py-1.5 transition'
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
							filterUniqueAndSortAscending(concatenateDirectionsFromRoutes(currentStop.routes.filter((route) => route.id === currentRouteId))).map((direction) => (
								<button
									className={
										`${currentDirection && currentDirection !== direction && 'hidden'} ` +
										`${
											currentDirection === direction
												? 'rounded-r-full bg-black/80 pl-6 text-white dark:bg-white/80 dark:text-black md:hover:bg-black/90 dark:md:hover:bg-white/90'
												: 'rounded-full bg-white/80 transition duration-200 dark:bg-white/10 md:hover:bg-gray-100 dark:md:hover:bg-white/20'
										} ` +
										'px-2.5 py-1.5 transition'
									}
									onClick={() => {
										setDirection(currentDirection ? null : direction);
										mutation.mutate({
											stopId: selectedStop!.number,
											direction: currentDirection ? undefined : direction,
											routeId: currentRouteId,
										});
									}}
									key={direction}
								>
									{direction}
								</button>
							))}
					</Draggable>
					<div className='mt-2 flex items-center justify-between'>
						<h1 className='h2'>{currentStop.stopName}</h1>
						<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} />
					</div>
					{mutation.isLoading ? (
						<div className='grid gap-1'>
							<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
							<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
							<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
							<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
							<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
						</div>
					) : (
						<KVGTable data={currentStop} routeId={currentRouteId} direction={currentDirection} />
					)}
				</div>
			)}
			{!currentStop && mutation.isLoading && (
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
						<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
						<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
						<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
						<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
						<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
					</div>
				</>
			)}
		</div>
	);
}
