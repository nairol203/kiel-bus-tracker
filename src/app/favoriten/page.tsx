'use client';

import { useQuery } from '@tanstack/react-query';
import KVGTable from '../(components)/KVGTable';
import { getStopData } from '../(components)/actions';

export default function Page() {
	const { data, isFetching, isError } = useQuery({
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
			<div className='flex justify-between items-center'>
				<h2>Rathaus Kronshagen</h2>
				<span className='relative flex h-3 w-3'>
					<span
						className={`${isFetching && 'animate-ping'} absolute inline-flex h-full w-full rounded-full ${isError ? 'bg-red-400' : 'bg-green-400'} opacity-75`}
					></span>
					<span className={`relative inline-flex rounded-full h-3 w-3 ${isError ? 'bg-red-500' : 'bg-green-500'}`}></span>
				</span>
			</div>
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
		</div>
	);
}
