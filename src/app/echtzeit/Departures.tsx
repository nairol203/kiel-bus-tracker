'use client';

import { queryClient } from '@/utils/Providers';
import { useMutation, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback, useEffect } from 'react';
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

export default function Departures({ stops }: { stops: StopByCharacter[] }) {
	const router = useRouter();
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

	if (isLoading)
		return (
			<div className='mx-2 grid gap-2'>
				<div className='skeleton'>
					<input className='w-full rounded p-2' placeholder='Suche nach einer Haltestelle' disabled />
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
					<Draggable>
						{stopId && routeId && (
							<button
								className='group shrink-0 rounded-full bg-secondary px-2.5 py-1.5 shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
								onClick={() => {
									router.push(pathname + '?' + removeQueryStrings(['routeId', 'direction']));
								}}
							>
								<Image src='/xmark.svg' alt='X Icon' height={15} width={15} className='dark:invert group-hover:invert' />
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
													? 'bg-primary text-darkMode-text dark:bg-darkMode-primary dark:text-text'
													: 'bg-secondary transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
											} ` +
											`${direction && '-mr-6'} ` +
											'z-10 rounded-full px-2.5 py-1.5 shadow transition'
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
												? 'rounded-r-full bg-secondary pl-6 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
												: 'rounded-full bg-secondary transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
										} ` +
										'px-2.5 py-1.5 shadow transition'
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
					<div className='mt-2 flex items-center justify-between'>
						<h1 className='h2'>{busStop.stopName}</h1>
						<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} />
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
						<KVGTable data={busStop} isPaused={isPaused} />
					)}
				</div>
			) : !mutation.isLoading ? (
				<div className='grid gap-2 mt-2'>
					<h2>Beliebte Suchanfragen</h2>
					<Link
						className='group flex gap-2 rounded bg-secondary p-2 shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
						href={pathname + '?stop=2387'}
					>
						<Image src='/clock-rotate-left.svg' height={20} width={20} alt='Clock rotate left icon' className='dark:invert group-hover:invert' />
						Hauptbahnhof
					</Link>
					<Link
						className='group flex gap-2 rounded bg-secondary p-2 shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
						href={pathname + '?stop=1624'}
					>
						<Image src='/clock-rotate-left.svg' height={20} width={20} alt='Clock rotate left icon' className='dark:invert group-hover:invert' />
						Rathaus Kronshagen
					</Link>
					<Link
						className='group flex gap-2 rounded bg-secondary p-2 shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
						href={pathname + '?stop=1312'}
					>
						<Image src='/clock-rotate-left.svg' height={20} width={20} alt='Clock rotate left icon' className='dark:invert group-hover:invert' />
						Am Langsee
					</Link>
					<Link
						className='group flex gap-2 rounded bg-secondary p-2 shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
						href={pathname + '?stop=2246'}
					>
						<Image src='/clock-rotate-left.svg' height={20} width={20} alt='Clock rotate left icon' className='dark:invert group-hover:invert' />
						Preetzer Straße
					</Link>
					<Link
						className='group flex gap-2 rounded bg-secondary p-2 shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
						href={pathname + '?stop=1317'}
					>
						<Image src='/clock-rotate-left.svg' height={20} width={20} alt='Clock rotate left icon' className='dark:invert group-hover:invert' />
						Heischberg
					</Link>
				</div>
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
