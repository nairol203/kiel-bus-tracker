'use client';

import { Fragment, useEffect, useState } from 'react';
import { getStopData, getAutocompleteData } from '../(components)/actions';
import { Combobox } from '@headlessui/react';
import KVGTable from '../(components)/KVGTable';
import Image from 'next/image';

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

export default function Fahrplan() {
	const [autocompleteStops, setAutocompleteStops] = useState<AutocompleteStop[]>([]);
	const [selectedStop, setSelectedStop] = useState<AutocompleteStop | null>(null);
	const [activeStop, setActiveStop] = useState<KVGStops | null>(null);
	const [currentRouteId, setRouteId] = useState<string | undefined>(undefined);
	const [currentDirection, setDirection] = useState<string | undefined>(undefined);

	useEffect(() => {
		async function fetchStopData() {
			if (!selectedStop) return;
			const stopData = await getStopData({ stopId: selectedStop.stop, routeId: currentRouteId, direction: currentDirection });
			setActiveStop(stopData);
		}

		fetchStopData();
	}, [selectedStop, currentRouteId, currentDirection]);

	return (
		<div className='grid gap-4 pt-2 m-2'>
			<h1>Echtzeitabfahrten</h1>
			<Combobox value={selectedStop} onChange={setSelectedStop}>
				<div className='relative'>
					<Combobox.Input
						className='bg-black/10 dark:bg-white/25 rounded p-2 w-full'
						onChange={async event => event.target.value && setAutocompleteStops(await getAutocompleteData(event.target.value))}
						displayValue={(stop?: AutocompleteStop) => stop?.stopPassengerName || ''}
						placeholder='Suche nach einer Haltestelle'
					/>
					<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
						<Image src='/chevron-down.svg' alt='Arrow Down Icon' height={20} width={20} aria-hidden='true' />
					</Combobox.Button>
					<Combobox.Options className='absolute mt-1 bg-white dark:bg-black rounded overflow-auto w-full'>
						{autocompleteStops.length ? (
							autocompleteStops.map(stop => (
								<Combobox.Option key={stop.stop} value={stop} as={Fragment}>
									{({ active }) => (
										<li className={`${active ? 'bg-black/30 text-white dark:bg-white/50' : 'bg-black/10 dark:bg-white/25'} p-2`}>{stop.stopPassengerName}</li>
									)}
								</Combobox.Option>
							))
						) : (
							<li className='bg-black/25 dark:bg-white/25 rounded p-2'>Keine Ergebnisse</li>
						)}
					</Combobox.Options>
				</div>
			</Combobox>
			{activeStop && (
				<div className='grid gap-2'>
					<div className='flex overflow-y-auto gap-2'>
						<button
							className={`${!currentRouteId && 'hidden'} px-2.5 py-1.5 bg-black/80 md:hover:bg-black/90 dark:bg-white/25 dark:md:hover:bg-white/30 rounded-full`}
							onClick={() => {
								setRouteId(undefined);
								setDirection(undefined);
							}}
						>
							<Image src='/xmark.svg' alt='X Icon' height={20} width={20} />
						</button>
						{activeStop.routes
							.filter(route => (currentDirection ? route.directions.includes(currentDirection) : true))
							.map(route => (
								<button
									className={
										`${currentRouteId && currentRouteId !== route.id && 'hidden'} ` +
										`${
											currentRouteId === route.id
												? 'bg-black dark:bg-white text-white dark:text-black'
												: 'bg-black/25 md:hover:bg-black/30 dark:bg-white/25 dark:md:hover:bg-white/30'
										} ` +
										`${currentDirection && '-mr-6 z-10'} ` +
										'px-2.5 py-1.5 rounded-full whitespace-nowrap'
									}
									onClick={() => {
										if (currentRouteId) {
											setRouteId(undefined);
											setDirection(undefined);
										} else {
											setRouteId(route.id);
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
												: 'bg-black/25 md:hover:bg-black/30 dark:bg-white/25 dark:md:hover:bg-white/30 rounded-full'
										} ` +
										'px-2.5 py-1.5 whitespace-nowrap'
									}
									onClick={() => setDirection(currentDirection ? undefined : direction)}
									key={direction}
								>
									{direction}
								</button>
							))}
					</div>
					<h2 className='mt-2'>{activeStop.stopName}</h2>
					<KVGTable data={activeStop.actual} />
				</div>
			)}
		</div>
	);
}
