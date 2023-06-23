'use client';

import { useQuery } from '@tanstack/react-query';
import { getStopData } from '../(components)/actions';
import HealthIndicator from '../(components)/HealthIndicator';
import KVGTable from '../(components)/KVGTable';

const favorites: { stopId: string; direction?: string }[] = [
	{
		stopId: '1624',
		direction: 'Am Wellsee',
	},
	{
		stopId: '1317',
		direction: 'Ellerbeker Weg',
	},
	{
		stopId: '1312',
		direction: 'Albert-Schweitzer-Straße',
	},
	{
		stopId: '2246',
		direction: 'Kronshagen, Schulzentrum',
	},
];

function SkeletonFavorite() {
	return (
		<>
			<div className='flex'>
				<h2 className='skeleton'>Lorem, ipsum dolor.</h2>
			</div>
			<div className='grid gap-1'>
				<div className='skeleton flex justify-between rounded bg-white/80 p-2 dark:bg-white/10'>Lorem ipsum dolor sit amet.</div>
			</div>
		</>
	);
}

export default function Page() {
	const { data, isFetching, isError, isPaused, dataUpdatedAt } = useQuery({
		queryKey: ['favorites'],
		queryFn: async () => {
			return Promise.all(favorites.map((fav) => getStopData(fav)));
		},
		refetchInterval: 10_000,
	});

	return (
		<div className='mx-2 grid gap-3'>
			<div className='flex items-center justify-between'>
				<h1>Favoriten</h1>
				<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} />
			</div>
			{data
				? data.map((favData) => (
						<div className='grid gap-2' key={favData.stopShortName}>
							<h2>{favData.stopName}</h2>
							<KVGTable data={favData} />
						</div>
				  ))
				: favorites.map((fav) => <SkeletonFavorite key={fav.stopId} />)}
			{isPaused && (
				<span className='text-sm opacity-70'>Letzte Aktualisierung: {new Date(dataUpdatedAt).toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin' })} Uhr</span>
			)}
		</div>
	);
}
