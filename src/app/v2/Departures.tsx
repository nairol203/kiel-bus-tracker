'use client';

import { useMutation } from '@tanstack/react-query';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect, useState } from 'react';
import { getStopData } from '../(components)/actions';
import KVGTable from '../(components)/KVGTable';
import Draggable from '../echtzeit/Draggable';
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

export default function Departures({ stops }: { stops: StopByCharacter[] }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const stopId = searchParams.get('stop');
	const routeId = searchParams.get('routeId') ?? undefined;
	const direction = searchParams.get('direction') ?? undefined;

	const [busStop, setBusStop] = useState<KVGStops | null>(null);

	useEffect(() => {
		if (stopId) {
			mutate({ stopId, routeId, direction });
		}
	}, [pathname, searchParams]);

	const { mutate, isError, isPaused, isLoading } = useMutation({
		mutationFn: getStopData,
		onSuccess: setBusStop,
	});

	const createQueryString = useCallback(
		(name: string, value: string) => {
			const params = new URLSearchParams(searchParams);
			params.set(name, value);

			return params.toString();
		},
		[searchParams]
	);

	const removeQueryStrings = useCallback(
		(names: string[]) => {
			const params = new URLSearchParams(searchParams);
			names.forEach((name) => params.delete(name));

			return params.toString();
		},
		[searchParams]
	);

	return (
		<div className='grid gap-2'>
			<Searchbar allStops={stops} />
			{busStop && (
				<div className='relative grid gap-2'>
					<Draggable>
						{stopId && routeId && (
							<button
								className='shrink-0 rounded-full bg-white/80 px-2.5 py-1.5 transition duration-200 dark:bg-white/10 md:hover:bg-gray-100 dark:md:hover:bg-white/20 shadow'
								onClick={() => {
									router.push(pathname + '?' + removeQueryStrings(['routeId', 'direction']));
								}}
							>
								<Image src='/xmark.svg' alt='X Icon' height={15} width={15} className='dark:invert' />
							</button>
						)}
						{stopId &&
							busStop.routes
								.filter((route) => (direction ? route.directions.includes(direction) : true))
								.map((route) => (
									<button
										className={
											`${routeId && routeId !== route.id && 'hidden'} ` +
											`${
												routeId === route.id
													? 'bg-black text-white dark:bg-white dark:text-black'
													: 'bg-white/80 transition duration-200 dark:bg-white/10 md:hover:bg-gray-100 dark:md:hover:bg-white/20'
											} ` +
											`${direction && '-mr-6'} ` +
											'z-10 rounded-full px-2.5 py-1.5 transition shadow'
										}
										onClick={() => {
											if (routeId) {
												router.push(pathname + '?' + removeQueryStrings(['routeId', 'direction']));
											} else {
												router.push(pathname + '?' + createQueryString('routeId', route.id));
											}
										}}
										key={route.id}
									>
										{route.authority} {route.name}
									</button>
								))}
						{stopId &&
							routeId &&
							filterUniqueAndSortAscending(concatenateDirectionsFromRoutes(busStop.routes.filter((route) => route.id === routeId))).map((_direction) => (
								<button
									className={
										`${direction && direction !== _direction && 'hidden'} ` +
										`${
											direction === _direction
												? 'rounded-r-full bg-black/80 pl-6 text-white dark:bg-white/80 dark:text-black md:hover:bg-black/90 dark:md:hover:bg-white/90'
												: 'rounded-full bg-white/80 transition duration-200 dark:bg-white/10 md:hover:bg-gray-100 dark:md:hover:bg-white/20'
										} ` +
										'px-2.5 py-1.5 transition shadow'
									}
									onClick={() => {
										if (direction) {
											router.push(pathname + '?' + removeQueryStrings(['direction']));
										} else {
											router.push(pathname + '?' + createQueryString('direction', _direction));
										}
									}}
									key={_direction}
								>
									{_direction}
								</button>
							))}
					</Draggable>
					<h2>{busStop.stopName}</h2>
					{isLoading ? (
						<div className='grid gap-1'>
							<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
							<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
							<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
							<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
							<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
						</div>
					) : (
						<KVGTable data={busStop} isPaused={isPaused} />
					)}
				</div>
			)}
			{!busStop && isLoading && (
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
