'use client';

import { Fragment, useState } from 'react';
import { getStopData } from './actions';
import { Combobox, Transition } from '@headlessui/react';
import KVGTable from './KVGTable';
import Image from 'next/image';
import Draggable from './Draggable';
import { useMutation, useQuery } from '@tanstack/react-query';
import { queryClient } from '@lib/reactQuery';
import { useLocalStorage } from './useLocalStorage';

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

	const {
		data: activeStop,
		isFetching,
		isError,
		isPaused,
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

	const filteredStops = query === '' ? [] : allStops.filter(stop => stop.name.toLowerCase().replace(/\s+/g, '').includes(query.toLowerCase().replace(/\s+/g, ''))).slice(0, 15);

	const statusColor = isError ? 'bg-red-500' : isPaused ? 'bg-yellow-500' : 'bg-green-500';
	const statusColorPulse = isError ? 'bg-red-400' : isPaused ? 'bg-yellow-400' : 'bg-green-400';

	return (
		<div className='grid gap-2 mx-2'>
			<Combobox
				value={selectedStop}
				onChange={e => {
					setSelectedStop(e);
					setRouteId(null);
					setDirection(null);
					mutation.mutate({ stopId: e!.number, direction: undefined, routeId: undefined });
				}}
			>
				<div className='relative'>
					<div className='relative w-full'>
						<Combobox.Input
							className='bg-white/80 dark:bg-white/10 rounded p-2 w-full'
							onChange={event => setQuery(event.target.value)}
							displayValue={(stop?: StopByCharacter) => stop?.name || ''}
							placeholder='Suche nach einer Haltestelle'
						/>
						<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
							<Image src='/chevron-down-light.svg' alt='Arrow Down Icon' height={20} width={20} aria-hidden='true' className='dark:hidden' />
							<Image src='/chevron-down-dark.svg' alt='Arrow Down Icon' height={20} width={20} aria-hidden='true' className='hidden dark:block' />
						</Combobox.Button>
					</div>
					<Transition
						as={Fragment}
						enter='transition ease-in duration-100'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<Combobox.Options className='absolute mt-1 bg-background dark:bg-darkMode-background rounded overflow-auto w-full z-50 shadow'>
							{filteredStops.length ? (
								filteredStops.map(stop => (
									<Combobox.Option key={stop.id} value={stop} as={Fragment}>
										{({ active }) => (
											<li className={`${active ? 'bg-blue-600 text-white' : 'bg-white/80 dark:bg-white/10'} p-2 cursor-pointer`}>{stop.name}</li>
										)}
									</Combobox.Option>
								))
							) : (
								<li className='bg-white/80 dark:bg-white/10 rounded p-2 wrap'>Keine Ergebnisse</li>
							)}
						</Combobox.Options>
					</Transition>
				</div>
			</Combobox>
			{activeStop && (
				<div className='grid gap-2 relative'>
					<Draggable>
						{currentRouteId && (
							<button
								className='shrink-0 px-2.5 py-1.5 bg-white/80 dark:bg-white/10 rounded-full transition'
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
						{activeStop.routes
							.filter(route => (currentDirection ? route.directions.includes(currentDirection) : true))
							.map(route => (
								<button
									className={
										`${currentRouteId && currentRouteId !== route.id && 'hidden'} ` +
										`${currentRouteId === route.id ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-white/80 dark:bg-white/10'} ` +
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
							filterUniqueAndSortAscending(concatenateDirectionsFromRoutes(activeStop.routes.filter(route => route.id === currentRouteId))).map(direction => (
								<button
									className={
										`${currentDirection && currentDirection !== direction && 'hidden'} ` +
										`${
											currentDirection === direction
												? 'bg-black/80 md:hover:bg-black/90 text-white dark:bg-white/80 dark:md:hover:bg-white/90 dark:text-black rounded-r-full pl-6'
												: 'bg-white/80 dark:bg-white/10 rounded-full'
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
						<h2>{activeStop.stopName}</h2>
						<span className='relative flex h-3 w-3'>
							<span className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full ${statusColorPulse} opacity-75`}></span>
							<span className={`relative inline-flex rounded-full h-3 w-3 ${statusColor}`}></span>
						</span>
					</div>
					<KVGTable data={activeStop.actual} />
				</div>
			)}
		</div>
	);
}
