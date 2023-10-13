'use client';

import { Combobox, Transition } from '@headlessui/react';
import Fuse from 'fuse.js';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import { Fragment, useMemo, useState } from 'react';

export default function Searchbar({ allStops }: { allStops: StopByCharacter[] }) {
	const router = useRouter();
	const pathname = usePathname();

	const [query, setQuery] = useState('');
	const [selectedStop, setSelectedStop] = useState<StopByCharacter | null>(null);

	const filteredStops = useMemo(() => {
		const fuse = new Fuse(allStops, {
			keys: ['name'],
		});
		const result = fuse.search(query.trim());
		return result.map((item) => item.item).slice(0, 10);
	}, [query, allStops]);

	function updateQuery(selectedStop: StopByCharacter) {
		router.push(pathname + `?stop=${selectedStop.number}`);
	}

	return (
		<Combobox
			value={selectedStop}
			onChange={(value) => {
				setSelectedStop(value);
				if (value) {
					updateQuery(value);
				}
			}}
		>
			<div className='relative'>
				<div className='relative w-full'>
					<Combobox.Input
						className='w-full rounded shadow p-2 bg-secondary dark:bg-darkMode-secondary'
						onChange={(event) => setQuery(event.target.value)}
						displayValue={(stop?: StopByCharacter) => stop?.name || ''}
						placeholder='Suche nach einer Haltestelle'
						autoFocus={!selectedStop}
					/>
					<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
						<Image src='/chevron-down.svg' alt='Arrow Down Icon' height={20} width={20} aria-hidden='true' className='dark:invert' />
					</Combobox.Button>
				</div>
				<Transition
					as={Fragment}
					enter='transition ease-in duration-100'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<Combobox.Options className='absolute z-50 mt-1 w-full overflow-auto rounded bg-background shadow dark:bg-darkMode-background'>
						{filteredStops.length === 0 && query !== '' ? (
							<li className='wrap rounded bg-secondary dark:bg-darkMode-secondary p-2'>Keine Ergebnisse</li>
						) : (
							filteredStops.map((stop) => (
								<Combobox.Option
									key={stop.id}
									className={({ active }) =>
										`${
											active ? 'bg-accent text-darkMode-text dark:bg-darkMode-accent dark:text-text' : 'bg-secondary dark:bg-darkMode-secondary'
										} cursor-pointer p-2`
									}
									value={stop}
								>
									{stop.name}
								</Combobox.Option>
							))
						)}
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	);
}
