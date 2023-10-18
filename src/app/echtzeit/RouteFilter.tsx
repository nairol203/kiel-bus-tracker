import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useCallback, useEffect, useState } from 'react';

function filterUniqueAndSortAscending(arr: string[]) {
	const uniqueArr = Array.from(new Set(arr));
	const sortedArr = uniqueArr.sort();
	return sortedArr;
}

export default function RouteFilter({ stop }: { stop: KVGStops }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const routeId = searchParams.get('routeId');
	const direction = searchParams.get('direction');

	const [directionThroughSuggestionChip, setDirectionThroughSuggestionChip] = useState((!!routeId && !!direction) ?? false);

	useEffect(() => {
		setDirectionThroughSuggestionChip((!!routeId && !!direction) ?? false);
	}, [routeId, direction]);

	const defaultRoute = {
		alerts: [],
		authority: '',
		directions: [],
		id: 'all',
		name: 'Zeige alle Linien',
		routeType: 'unkown',
		shortName: '',
	};

	const routes = [defaultRoute, ...(direction && !directionThroughSuggestionChip ? stop.routes.filter((route) => route.directions.includes(direction)) : stop.routes)];
	const selectedRoute = stop.routes.find((route) => route.id === routeId) ?? defaultRoute;

	let directions = routeId ? stop.routes.find((route) => route.id === routeId)!.directions : [];
	if (!routeId) {
		directions.shift();
	}
	directions = filterUniqueAndSortAscending(directions);

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
		<>
			<Listbox
				value={selectedRoute}
				onChange={(value) => {
					if (!value || routeId === value.id) return;
					if (value.id === 'all') {
						setDirectionThroughSuggestionChip(false);
						router.push(pathname + '?' + removeQueryStrings(['routeId', 'direction']));
					} else {
						router.push(pathname + '?' + createQueryString('routeId', value.id));
					}
				}}
				as={Fragment}
				disabled={routes.length <= 1}
			>
				{({ open }) => (
					<div className='md:relative'>
						<Listbox.Button
							className={`${
								selectedRoute && selectedRoute.id !== 'all'
									? 'bg-primary text-darkMode-text dark:bg-darkMode-primary dark:text-text'
									: 'group bg-secondary dark:bg-darkMode-secondary md:enabled:hover:bg-accent md:enabled:hover:text-darkMode-text dark:md:enabled:hover:bg-darkMode-accent'
							} flex items-center gap-2 rounded px-2 py-1 shadow transition duration-200`}
						>
							{`${selectedRoute.authority} ${selectedRoute.name}`}
							<Image
								src='/chevron-up-down.svg'
								height={15}
								width={15}
								alt='Chevron down icon'
								className={selectedRoute && selectedRoute.id !== 'all' ? 'invert dark:invert-0' : 'md:group-enabled:group-hover:invert dark:invert'}
							/>
						</Listbox.Button>
						{open && <span className='z-10 absolute inset-0 backdrop-blur-sm' />}
						<Transition
							as={Fragment}
							enter='transition ease-in duration-100'
							enterFrom='opacity-0'
							enterTo='opacity-100'
							leave='transition ease-in duration-100'
							leaveFrom='opacity-100'
							leaveTo='opacity-0'
						>
							<Listbox.Options className='z-20 absolute bottom-0 left-0 right-0 top-1/3 md:mt-1 md:max-h-96 md:w-60 overflow-y-auto rounded bg-secondary shadow-2xl dark:bg-darkMode-secondary'>
								{routes.map((route) => (
									<Listbox.Option key={route.id} value={route} as={Fragment}>
										{({ active }) => (
											<li
												className={`${
													active && 'bg-accent text-darkMode-text dark:bg-darkMode-accent'
												} group flex gap-3 p-3 md:px-2 md:py-1.5 text-start cursor-default`}
											>
												{routeId === route.id || (!routeId && route.id === 'all') ? (
													<Image
														src='/check.svg'
														height={15}
														width={15}
														alt='Check Icon'
														className={`${active ? 'invert' : ''} group-hover:invert dark:invert`}
													/>
												) : (
													<span className='h-[15px] w-[15px]' />
												)}
												<span>
													{route.authority} {route.name}
												</span>
											</li>
										)}
									</Listbox.Option>
								))}
							</Listbox.Options>
						</Transition>
					</div>
				)}
			</Listbox>
			{selectedRoute &&
				directions.map((_direction, index) => (
					<button
						onClick={() => {
							if (direction === _direction) {
								setDirectionThroughSuggestionChip(false);
								router.push(pathname + '?' + removeQueryStrings(['direction']));
							} else {
								setDirectionThroughSuggestionChip(true);
								router.push(pathname + '?' + createQueryString('direction', _direction));
							}
						}}
						className={`${
							direction === _direction
								? 'bg-primary text-darkMode-text dark:bg-darkMode-primary dark:text-text'
								: 'bg-secondary dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
						} rounded px-2 py-1 text-start`}
						key={`${index}_${direction}`}
					>
						{_direction}
					</button>
				))}
		</>
	);
}
