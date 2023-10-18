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
	const direction = searchParams.get('direction') ?? 'Alle Richtungen';
	let directions =
		routeId && stop.routes.find((route) => route.id === routeId)
			? stop.routes.find((route) => route.id === routeId)!.directions
			: [''].concat(...stop.routes.map((route) => route.directions));

	if (!routeId || !stop.routes.find((route) => route.id === routeId)) {
		directions.shift();
	}

	directions = filterUniqueAndSortAscending(directions);
	directions.unshift('Alle Richtungen');

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
				if (!value || direction === value) return;
				if (value === 'Alle Richtungen') {
					router.push(pathname + '?' + removeQueryStrings(['direction']));
				} else {
					router.push(pathname + '?' + createQueryString('direction', value));
				}
			}}
			as={Fragment}
			disabled={directions.length <= 1}
		>
			{({ open }) => (
				<div className='md:relative'>
					<Listbox.Button
						className={`${
							direction && direction !== 'Alle Richtungen'
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
							className={direction && direction !== 'Alle Richtungen' ? 'invert dark:invert-0' : 'md:group-enabled:group-hover:invert dark:invert'}
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
						{open && <span className='z-10 absolute inset-0 bg-text/30 md:hidden' />}
						<Listbox.Options className='z-20 absolute max-h-96 inset-x-2 bottom-2 md:inset-auto md:mt-1 md:max-h-96 md:w-60 overflow-y-auto bg-secondary shadow-lg dark:bg-darkMode-secondary overscroll-contain pt-3 md:pt-0 rounded-2xl md:rounded'>
							{directions.map((_direction) => (
								<Listbox.Option key={_direction} value={_direction} as={Fragment}>
									{({ active }) => (
										<li
											className={`${
												active && 'md:bg-accent md:text-darkMode-text md:dark:bg-darkMode-accent'
											} flex gap-3 p-3 md:px-2 md:py-1.5 text-start cursor-default`}
										>
											{direction === _direction || (!direction && _direction === 'Alle Richtungen') ? (
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
											<span>{_direction}</span>
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
