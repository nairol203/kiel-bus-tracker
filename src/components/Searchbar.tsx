'use client';

import { useBusStore } from '@/stores/bus-store';
import { stops } from '@/utils/stops';
import { Combobox, ComboboxButton, ComboboxInput, ComboboxOption, ComboboxOptions, Transition } from '@headlessui/react';
import Fuse from 'fuse.js';
import { Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { Fragment, useMemo, useState } from 'react';

export default function Searchbar() {
	const router = useRouter();

	const [query, setQuery] = useState('');
	const [disabled, setDisabled] = useState(false);
	const [selectedStop, setSelectedStop] = useState<StopByCharacter | null>(null);
	const { setLastSearches } = useBusStore();

	const filteredStops = useMemo(() => {
		const fuse = new Fuse(stops, {
			keys: ['name'],
			threshold: 0.3,
		});
		const result = fuse.search(query.trim());
		return result.map((item) => item.item).slice(0, 5);
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
				}
			}}
		>
			<div className='relative'>
				<div className='relative w-full'>
					<ComboboxInput
						className='bg-surface border-border w-full rounded border p-3 pl-10 shadow'
						onChange={(event) => setQuery(event.target.value)}
						placeholder='Suchen'
					/>
					<ComboboxButton className='absolute inset-y-0 left-3 flex items-center'>
						<Search className='text-muted h-5 w-5' />
					</ComboboxButton>
				</div>
				{query !== '' && (
					<Transition
						as={Fragment}
						enter='transition ease-in duration-100'
						enterFrom='opacity-0'
						enterTo='opacity-100'
						leave='transition ease-in duration-100'
						leaveFrom='opacity-100'
						leaveTo='opacity-0'
					>
						<ComboboxOptions className='bg-background border-border absolute z-50 mt-2 w-full overflow-auto rounded-sm border shadow-sm'>
							{filteredStops.length === 0 && query !== '' ? (
								<li className='wrap bg-surface rounded-sm p-2.5'>Keine Ergebnisse</li>
							) : (
								filteredStops.map((stop) => (
									<ComboboxOption key={stop.id} className={'bg-surface md:hover:bg-surface-hover cursor-pointer p-3'} value={stop}>
										{stop.name}
									</ComboboxOption>
								))
							)}
						</ComboboxOptions>
					</Transition>
				)}
			</div>
		</Combobox>
	);
}
