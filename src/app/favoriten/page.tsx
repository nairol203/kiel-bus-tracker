'use client';

import { useQuery } from '@tanstack/react-query';
import KVGTable from '../(components)/KVGTable';
import { getStopData } from '../(components)/actions';
import HealthIndicator from '../(components)/HealthIndicator';

export default function Page() {
	const { data, isFetching, isError, isPaused, dataUpdatedAt } = useQuery({
		queryKey: ['favorites'],
		queryFn: async () => {
			const rathausKronshagen = await getStopData({
				stopId: '1624',
				direction: 'Am Wellsee',
			});

			const heischberg = await getStopData({
				stopId: '1317',
				direction: 'Ellerbeker Weg',
			});

			const amLangsee = await getStopData({
				stopId: '1312',
				direction: 'Albert-Schweitzer-Straße',
			});

			const preetzerStraße = await getStopData({
				stopId: '2246',
				direction: 'Kronshagen, Schulzentrum',
			});

			return { rathausKronshagen, heischberg, amLangsee, preetzerStraße };
		},
		refetchInterval: 10_000,
	});

	return (
		<div className='grid gap-2 mx-2'>
			<div className='flex justify-between items-center mb-2'>
				<h1>Favoriten</h1>
				<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} />
			</div>
			<h2>Rathaus Kronshagen</h2>
			{data ? (
				<KVGTable data={data.rathausKronshagen.actual} />
			) : (
				<div className='grid gap-1'>
					<div className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10 skeleton'>Lorem ipsum dolor sit amet.</div>
				</div>
			)}
			<h2>Heischberg</h2>
			{data ? (
				<KVGTable data={data.heischberg.actual} />
			) : (
				<div className='grid gap-1'>
					<div className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10 skeleton'>Lorem ipsum dolor sit amet.</div>
				</div>
			)}
			<h2>Am Langsee</h2>
			{data ? (
				<KVGTable data={data.amLangsee.actual} />
			) : (
				<div className='grid gap-1'>
					<div className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10 skeleton'>Lorem ipsum dolor sit amet.</div>
				</div>
			)}
			<h2>Preetzer Straße/Ostring</h2>
			{data ? (
				<KVGTable data={data.preetzerStraße.actual} />
			) : (
				<div className='grid gap-1'>
					<div className='flex justify-between p-2 rounded bg-white/80 dark:bg-white/10 skeleton'>Lorem ipsum dolor sit amet.</div>
				</div>
			)}
			{isPaused && (
				<span className='text-sm opacity-70'>Letzte Aktualisierung: {new Date(dataUpdatedAt).toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin' })} Uhr</span>
			)}
		</div>
	);
}
