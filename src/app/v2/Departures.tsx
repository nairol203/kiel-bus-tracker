'use client';

import { useMutation } from '@tanstack/react-query';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { getStopData } from '../(components)/actions';
import BusList from './BusList';
import Searchbar from './Searchbar';

export default function Departures({ stops }: { stops: StopByCharacter[] }) {
	const searchParams = useSearchParams();
	const stopId = searchParams.get('stop');
	const [busStop, setBusStop] = useState<KVGStops | null>(null);

	const { mutate } = useMutation({
		mutationFn: async (stopId: string) => await getStopData({ stopId }),
		onSuccess: (value) => setBusStop(value),
	});

	function onSearch() {
		if (stopId) {
			mutate(stopId);
		}
	}

	return (
		<div className='grid gap-4'>
			<Searchbar allStops={stops} onSearch={onSearch} />
			{busStop && <BusList stop={busStop} />}
		</div>
	);
}
