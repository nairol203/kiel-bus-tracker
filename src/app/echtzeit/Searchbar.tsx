import { Combobox, Transition } from '@headlessui/react';
import { UseMutationResult } from '@tanstack/react-query';
import Image from 'next/image';
import { Fragment } from 'react';

type ComboboxComponentProps = {
	selectedStop: StopByCharacter | null;
	setSelectedStop: (stop: StopByCharacter | null) => void;
	setRouteId: (routeId: string | null) => void;
	setDirection: (direction: string | null) => void;
	mutation: UseMutationResult<KVGStops, unknown, { stopId: string; routeId?: string | null | undefined; direction?: string | null | undefined }, unknown>;
	filteredStops: StopByCharacter[];
	query: string;
	setQuery: (query: string) => void;
};

export default function Searchbar({ selectedStop, setSelectedStop, setRouteId, setDirection, mutation, filteredStops, query, setQuery }: ComboboxComponentProps) {
	return (
		<Combobox
			value={selectedStop}
			onChange={(e) => {
				setSelectedStop(e);
				setRouteId(null);
				setDirection(null);
				mutation.mutate({ stopId: e!.number, direction: undefined, routeId: undefined });
			}}
		>
			<div className='relative'>
				<div className='relative w-full'>
					<Combobox.Input
						className='w-full rounded bg-white/80 p-2 shadow dark:bg-white/10'
						onInput={(event) => setQuery(event.currentTarget.value)}
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
							<li className='wrap rounded bg-white/80 p-2 dark:bg-white/10'>Keine Ergebnisse</li>
						) : (
							filteredStops.map((stop) => (
								<Combobox.Option
									key={stop.id}
									className={({ active }) => `${active ? 'bg-blue-600 text-white' : 'bg-white/80 dark:bg-white/10'} cursor-pointer p-2`}
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
