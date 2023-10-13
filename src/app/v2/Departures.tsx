'use client';

import { useMutation } from '@tanstack/react-query';
import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { getStopData } from '../(components)/actions';
import BusList from './BusList';
import Searchbar from './Searchbar';

export default function Departures({ stops }: { stops: StopByCharacter[] }) {
	const pathname = usePathname();
	const searchParams = useSearchParams();
	const stopId = searchParams.get('stop');
	const [busStop, setBusStop] = useState<KVGStops | null>(null);

	useEffect(() => {
		if (stopId) {
			mutate(stopId);
		}
	}, [pathname, searchParams]);

	const { mutate } = useMutation({
		mutationFn: async (stopId: string) => await getStopData({ stopId }),
		onSuccess: (value) => setBusStop(value),
	});

	return (
		<div className='grid gap-4'>
			<Searchbar allStops={stops} />
			{busStop && <BusList stop={busStop} />}
		</div>
	);
}
