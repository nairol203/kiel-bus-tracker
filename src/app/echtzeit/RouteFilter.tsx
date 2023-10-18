import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useCallback } from 'react';

export default function RouteFilter({ stop }: { stop: KVGStops }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const routeId = searchParams.get('routeId');
	const direction = searchParams.get('direction');

	const defaultRoute = {
		alerts: [],
		authority: '',
		directions: [],
		id: 'all',
		name: 'Alle Linien',
		routeType: 'unkown',
		shortName: '',
	};

	const routes = [defaultRoute, ...(direction ? stop.routes.filter((route) => route.directions.includes(direction)) : stop.routes)];
	const selectedRoute = stop.routes.find((route) => route.id === routeId) ?? defaultRoute;

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
		<Listbox
			value={selectedRoute}
			onChange={(value) => {
				if (!value || routeId === value.id) return;
				if (value.id === 'all') {
					router.push(pathname + '?' + removeQueryStrings(['routeId']));
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
					<Transition
						enter='transition ease-in duration-100'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						{open && <span className='z-10 absolute inset-0 bg-text/30 dark:bg-text/60 md:hidden' />}
						<Listbox.Options className='z-20 absolute top-1/3 inset-x-0 bottom-0 md:inset-auto md:mt-1 md:max-h-96 md:w-60 overflow-y-auto bg-background md:bg-secondary shadow-lg dark:bg-darkMode-background dark:md:bg-darkMode-secondary overscroll-contain pt-3 md:pt-0 rounded-t-2xl md:rounded-t-sm md:rounded-sm'>
							{routes.map((route) => (
								<Listbox.Option key={route.id} value={route} as={Fragment}>
									{({ active }) => (
										<li
											className={`${
												active && 'md:bg-accent  md:text-darkMode-text md:dark:bg-darkMode-accent'
											} group flex gap-3 p-3 md:px-2 md:py-1.5 text-start cursor-default`}
										>
											{routeId === route.id || (!routeId && route.id === 'all') ? (
												<Image
													src='/check.svg'
													height={15}
													width={15}
													alt='Check Icon'
													className={`${active ? 'md:invert' : ''} md:group-hover:invert dark:invert`}
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
	);
}
