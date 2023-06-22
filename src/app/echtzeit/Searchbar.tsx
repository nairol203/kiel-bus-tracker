import React from 'react';
import Image from 'next/image';
import { UseMutationResult } from '@tanstack/react-query';
import { Combobox, Transition } from '@headlessui/react';

type ComboboxComponentProps = {
	selectedStop: StopByCharacter | null;
	setSelectedStop: (stop: StopByCharacter | null) => void;
	setRouteId: (routeId: string | null) => void;
	setDirection: (direction: string | null) => void;
	mutation: UseMutationResult<KVGStops, unknown, { stopId: string; routeId?: string | null | undefined; direction?: string | null | undefined }, unknown>;
	filteredStops: StopByCharacter[];
	setQuery: (query: string) => void;
};

export default function Searchbar({ selectedStop, setSelectedStop, setRouteId, setDirection, mutation, filteredStops, setQuery }: ComboboxComponentProps) {
	return (
		<Combobox
			value={selectedStop}
			onChange={e => {
				setSelectedStop(e);
				setRouteId(null);
				setDirection(null);
				mutation.mutate({ stopId: e!.number, direction: undefined, routeId: undefined });
			}}
		>
			<div className='relative'>
				<div className='relative w-full'>
					<Combobox.Input
						className='bg-white/80 dark:bg-white/10 rounded p-2 w-full'
						onChange={event => setQuery(event.target.value)}
						displayValue={(stop?: StopByCharacter) => stop?.name || ''}
						placeholder='Search for a stop'
					/>
					<Combobox.Button className='absolute inset-y-0 right-0 flex items-center pr-2'>
						<Image src='/chevron-down-light.svg' alt='Arrow Down Icon' height={20} width={20} aria-hidden='true' className='dark:hidden' />
						<Image src='/chevron-down-dark.svg' alt='Arrow Down Icon' height={20} width={20} aria-hidden='true' className='hidden dark:block' />
					</Combobox.Button>
				</div>
				<Transition
					as={React.Fragment}
					enter='transition ease-in duration-100'
					enterFrom='opacity-0'
					enterTo='opacity-100'
					leave='transition ease-in duration-100'
					leaveFrom='opacity-100'
					leaveTo='opacity-0'
				>
					<Combobox.Options className='absolute mt-1 bg-background dark:bg-darkMode-background rounded overflow-auto w-full z-50 shadow'>
						{filteredStops.length ? (
							filteredStops.map(stop => (
								<Combobox.Option key={stop.id} value={stop} as={React.Fragment}>
									{({ active }) => <li className={`${active ? 'bg-blue-600 text-white' : 'bg-white/80 dark:bg-white/10'} p-2 cursor-pointer`}>{stop.name}</li>}
								</Combobox.Option>
							))
						) : (
							<li className='bg-white/80 dark:bg-white/10 rounded p-2 wrap'>No results</li>
						)}
					</Combobox.Options>
				</Transition>
			</div>
		</Combobox>
	);
}
