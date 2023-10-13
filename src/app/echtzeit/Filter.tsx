'use client';

import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';
import Draggable from './Draggable';

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

export default function Filter({ busStop }: { busStop: KVGStops }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const stopId = searchParams.get('stop');
	const routeId = searchParams.get('routeId') ?? undefined;
	const direction = searchParams.get('direction') ?? undefined;

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
	);
}
