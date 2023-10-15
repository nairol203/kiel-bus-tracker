import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useCallback, useState } from 'react';

export default function DirectionFilter({ stop }: { stop: KVGStops }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const routeId = searchParams.get('routeId');
	const direction = searchParams.get('direction');
	const directions = routeId ? stop.routes.find((route) => route.id === routeId)!.directions : [''].concat(...stop.routes.map((route) => route.directions));

	if (!routeId) {
		directions.shift();
	}
	directions.sort();

	const [selectedDirection, setSelectedDirection] = useState<string | null>(direction);

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
			value={selectedDirection}
			onChange={(value) => {
				if (selectedDirection === value) {
					setSelectedDirection(null);
				} else {
					setSelectedDirection(value);
				}
			}}
			as={Fragment}
		>
			<div className='relative'>
				<Listbox.Button className='flex items-center gap-2 px-2 py-1 rounded bg-secondary shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'>
					{selectedDirection ? selectedDirection : 'Richtung'}
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
						{directions.map((_direction) => (
							<Listbox.Option key={_direction} value={_direction} as={Fragment}>
								{({ active, selected }) => (
									<li
										className={`${active && 'bg-accent text-darkMode-text dark:bg-darkMode-accent'} ${
											selected && 'bg-accent text-darkMode-text dark:bg-darkMode-accent'
										} px-2 py-1 rounded`}
									>
										<button
											onClick={() => {
												if (direction === _direction) {
													router.push(pathname + '?' + removeQueryStrings(['routeId', 'direction']));
												} else {
													router.push(pathname + '?' + createQueryString('direction', _direction));
												}
											}}
										>
											{_direction}
										</button>
									</li>
								)}
							</Listbox.Option>
						))}
					</Listbox.Options>
				</Transition>
			</div>
		</Listbox>
	);
}
