import { Listbox, ListboxButton, ListboxOption, ListboxOptions, Transition } from '@headlessui/react';
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
		[searchParams],
	);

	const removeQueryStrings = useCallback(
		(names: string[]) => {
			const params = new URLSearchParams(searchParams);
			names.forEach((name) => params.delete(name));

			return params.toString();
		},
		[searchParams],
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
			<div className='grid md:block md:relative'>
				<ListboxButton
					className={`${
						direction && direction !== 'Alle Richtungen'
							? 'bg-primary text-darkMode-text dark:bg-darkMode-primary dark:text-text'
							: 'group bg-secondary dark:bg-darkMode-secondary md:enabled:hover:bg-accent md:enabled:hover:text-darkMode-text dark:md:enabled:hover:bg-darkMode-accent'
					} flex items-center justify-between gap-2 rounded px-2 py-1 shadow transition duration-200`}
				>
					{direction ?? 'Richtung'}
					<Image
						src='/chevron-up-down.svg'
						height={15}
						width={15}
						alt='Chevron down icon'
						className={direction && direction !== 'Alle Richtungen' ? 'invert dark:invert-0' : 'md:group-enabled:group-hover:invert dark:invert'}
					/>
				</ListboxButton>
				<Transition
					enter='transition ease-in duration-150'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='transition ease-in duration-150'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<span className='z-10 absolute inset-0 bg-text/30 dark:bg-text/60 md:hidden' />
				</Transition>
				<Transition
					enter='transition ease-in duration-150 md:duration-100'
					enterFrom='opacity-0 translate-y-32 md:translate-y-0'
					enterTo='opacity-100 translate-y-0'
					leave='transition ease-in duration-150 md:duration-100'
					leaveFrom='opacity-100 translate-y-0'
					leaveTo='opacity-0 translate-y-32 md:translate-y-0'
				>
					<ListboxOptions className='transition z-20 absolute top-1/3 inset-x-0 bottom-0 md:inset-auto md:mt-1 md:max-h-96 md:w-60 overflow-y-auto bg-background shadow-lg dark:bg-darkMode-background overscroll-contain pt-3 md:pt-0 rounded-t-2xl md:rounded-t-sm md:rounded-sm'>
						<div className='md:hidden mx-4 my-2 flex justify-between'>
							<h2>Richtungsfilter</h2>
						</div>
						{directions.map((_direction) => (
							<ListboxOption key={_direction} value={_direction} as={Fragment}>
								{({ focus }) => (
									<li
										className={`${
											focus && 'md:bg-accent  md:text-darkMode-text md:dark:bg-darkMode-accent'
										} group flex gap-3 p-3 md:px-2 md:py-1.5 text-start cursor-default`}
									>
										{direction === _direction || (!direction && _direction === 'Alle Richtungen') ? (
											<Image
												src='/circle-dot.svg'
												height={15}
												width={15}
												alt='Radio Button Checked'
												className={`${focus ? 'md:invert' : ''} md:group-hover:invert dark:invert`}
											/>
										) : (
											<Image
												src='/circle.svg'
												height={15}
												width={15}
												alt='Radio Button Unchecked'
												className={`${focus ? 'md:invert' : ''} md:group-hover:invert dark:invert`}
											/>
										)}
										<span>{_direction}</span>
									</li>
								)}
							</ListboxOption>
						))}
					</ListboxOptions>
				</Transition>
			</div>
		</Listbox>
	);
}
