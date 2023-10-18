import { Listbox, Transition } from '@headlessui/react';
import Image from 'next/image';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { Fragment, useCallback } from 'react';

function filterUniqueAndSortAscending(arr: string[]) {
	const uniqueArr = Array.from(new Set(arr));
	const sortedArr = uniqueArr.sort();
	return sortedArr;
}

export default function DirectionFilter({ stop }: { stop: KVGStops }) {
	const router = useRouter();
	const pathname = usePathname();
	const searchParams = useSearchParams();

	const routeId = searchParams.get('routeId');
	const direction = searchParams.get('direction');
	let directions = routeId ? stop.routes.find((route) => route.id === routeId)!.directions : [''].concat(...stop.routes.map((route) => route.directions));

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
		<Listbox
			value={direction}
			onChange={(value) => {
				if (!value) return;
				if (direction === value) {
					router.push(pathname + '?' + removeQueryStrings(['direction']));
				} else {
					router.push(pathname + '?' + createQueryString('direction', value));
				}
			}}
			as={Fragment}
			disabled={!directions.length}
		>
			<div className='relative'>
				<Listbox.Button
					className={`${
						direction
							? 'bg-primary text-darkMode-text dark:bg-darkMode-primary dark:text-text'
							: 'group bg-secondary dark:bg-darkMode-secondary md:enabled:hover:bg-accent md:enabled:hover:text-darkMode-text dark:md:enabled:hover:bg-darkMode-accent'
					} flex items-center gap-2 rounded px-2 py-1 shadow transition duration-200`}
				>
					{direction ?? 'Richtung'}
					<Image
						src='/chevron-up-down.svg'
						height={15}
						width={15}
						alt='Chevron down icon'
						className={direction ? 'invert dark:invert-0' : 'group-enabled:group-hover:invert dark:invert'}
					/>
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
					<Listbox.Options className='absolute mt-1 grid max-h-96 w-60 gap-2 overflow-y-auto rounded bg-secondary shadow dark:bg-darkMode-secondary'>
						{directions.map((_direction) => (
							<Listbox.Option key={_direction} value={_direction} as={Fragment}>
								{({ active }) => (
									<li
										className={`${active && 'bg-accent text-darkMode-text dark:bg-darkMode-accent'} ${
											direction == _direction && 'bg-accent text-darkMode-text dark:bg-darkMode-accent'
										} rounded px-2 py-1 text-start`}
									>
										{_direction}
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
