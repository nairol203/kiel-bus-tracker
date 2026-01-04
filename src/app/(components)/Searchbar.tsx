'use client';

import { useBusStore } from '@/stores/bus-store';
import { stops } from '@/utils/stops';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import Fuse from 'fuse.js';
import { usePlausible } from 'next-plausible';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment, useMemo, useState } from 'react';

export default function Searchbar({ currentStop }: { currentStop?: NormalizedKVGStops }) {
	const router = useRouter();
	const plausible = usePlausible();

	const [query, setQuery] = useState('');
	const [disabled, setDisabled] = useState(false);
	const [selectedStop, setSelectedStop] = useState<StopByCharacter | null>(null);
	const { setLastSearches } = useBusStore();

	const filteredStops = useMemo(() => {
		const fuse = new Fuse(stops, {
			keys: ['name'],
		});
		const result = fuse.search(query.trim());
		return result.map((item) => item.item).slice(0, 10);
	}, [query]);

	function updateQuery(selectedStop: StopByCharacter) {
		router.push(`/stop/${selectedStop.number}`);
	}

	return (
		<Combobox
			immediate
			disabled={disabled}
			value={selectedStop}
			onChange={(value) => {
				setSelectedStop(value);
				if (value) {
					setDisabled(true);
					updateQuery(value);
					setLastSearches(value);
					setTimeout(() => {
						setDisabled(false);
					}, 50);
					plausible('search', {
						props: {
							searchQuery: `${value.number} (${value.name})`,
						},
					});
				}
			}}
		>
			<div className='relative'>
				<div className='relative w-full'>
					<ComboboxInput
						className='w-full rounded bg-secondary p-3 text-lg shadow dark:bg-darkMode-secondary'
						onChange={(event) => setQuery(event.target.value)}
						displayValue={(stop?: StopByCharacter) => stop?.name || currentStop?.stopName || ''}
						placeholder='Suche nach einer Haltestelle'
					/>
					<ComboboxButton className='absolute inset-y-0 right-0 flex items-center pr-2'>
						<Image src='/magnifying-glass.svg' alt='magnifying-glass Icon' height={20} width={20} aria-hidden='true' className='dark:invert' />
					</ComboboxButton>
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
					<ComboboxOptions className='absolute z-50 mt-1 w-full overflow-auto rounded bg-background shadow dark:bg-darkMode-background'>
						{filteredStops.length === 0 && query !== '' ? (
							<li className='wrap rounded bg-secondary p-2.5 dark:bg-darkMode-secondary'>Keine Ergebnisse</li>
						) : (
							filteredStops.map((stop) => (
								<ComboboxOption
									key={stop.id}
									className={({ focus }) =>
										`${focus ? 'bg-accent text-darkMode-text dark:bg-darkMode-accent' : 'bg-secondary dark:bg-darkMode-secondary'} cursor-pointer p-2.5`
									}
									value={stop}
								>
									{stop.name}
								</ComboboxOption>
							))
						)}
					</ComboboxOptions>
				</Transition>
			</div>
		</Combobox>
	);
}
