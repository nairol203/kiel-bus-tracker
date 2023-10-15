import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useCallback, useState } from 'react';

export default function RouteFilter({ stop }: { stop: KVGStops }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const routeId = searchParams.get('routeId');
	const [selectedRoute, setSelectedRoute] = useState<Route | null>(stop.routes.find((route) => route.id === routeId) ?? null);

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
				if (selectedRoute === value) {
					setSelectedRoute(null);
				} else {
					setSelectedRoute(value);
				}
			}}
			as={Fragment}
		>
			<div className='relative'>
				<Listbox.Button className='flex items-center gap-2 px-2 py-1 rounded bg-secondary shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'>
					{selectedRoute ? `${selectedRoute.authority} ${selectedRoute.name}` : 'Linie'}
					<Image src='/chevron-down.svg' height={15} width={15} alt='Chevron down icon' className='dark:invert' />
				</Listbox.Button>
				<Transition
					as={Fragment}
					enter='transition ease-in duration-100'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<Listbox.Options className='absolute mt-1 grid gap-2 bg-secondary dark:bg-darkMode-secondary shadow rounded max-h-96 overflow-y-scroll w-60'>
						{stop.routes.map((route) => (
							<Listbox.Option key={route.id} value={route} as={Fragment}>
								{({ active, selected }) => (
									<button
										onClick={() => {
											if (routeId == route.id) {
												router.push(pathname + '?' + removeQueryStrings(['routeId']));
											} else {
												router.push(pathname + '?' + createQueryString('routeId', route.id));
											}
										}}
										className={`${active && 'bg-accent text-darkMode-text dark:bg-darkMode-accent'} ${
											selected && 'bg-accent text-darkMode-text dark:bg-darkMode-accent'
										} px-2 py-1 rounded text-start`}
									>
										{route.authority} {route.name}
									</button>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
}
