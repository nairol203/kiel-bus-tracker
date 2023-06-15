'use client';

import { Switch } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';
import { getTripInfo } from 'src/app/(components)/actions';

function timeToDate(time: string) {
	const [hours, minutes] = time.split(':').map(Number);

	const date = new Date();

	date.setHours(hours);
	date.setMinutes(minutes);
	date.setSeconds(0);
	date.setMilliseconds(0);

	return date;
}

function formatTimeDifference(date: Date, old = false) {
	const currentTime = new Date();
	const timeDifference = Math.floor((old ? currentTime.getTime() - date.getTime() : date.getTime() - currentTime.getTime()) / 1000 / 60);

	if (timeDifference < 0) {
		return `0 min`;
	}
	return `${timeDifference} min`;
}

export default function Page({ params }: { params: { tripId: string } }) {
	const [reload, setReload] = useState(false);
	const [showOld, setShowOld] = useState(false);

	const { data: tripInfo } = useQuery({
		queryKey: ['stopData'],
		queryFn: async () => {
			const res = await getTripInfo(params.tripId);
			return res;
		},
		refetchInterval: reload ? 10_000 : false,
	});

	if (!tripInfo) return;

	return (
		<div className='grid gap-2 pt-2 m-2'>
			<h1>
				{tripInfo.routeName} {tripInfo.directionText}
			</h1>
			<div className='flex gap-2'>
				<Switch.Group>
					<Switch
						checked={reload}
						onChange={setReload}
						className={`${reload ? 'bg-blue-600' : 'bg-black/50 dark:bg-white'} relative inline-flex h-6 w-11 items-center rounded-full`}
					>
						<span
							className={`${reload ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white dark:bg-black transition`}
							aria-hidden='true'
						/>
					</Switch>
					<Switch.Label>Auto-Aktualisieren</Switch.Label>
				</Switch.Group>
			</div>
			<div className='flex gap-2'>
				<Switch.Group>
					<Switch
						checked={showOld}
						onChange={setShowOld}
						className={`${showOld ? 'bg-blue-600' : 'bg-black/50 dark:bg-white'} relative inline-flex h-6 w-11 items-center rounded-full`}
					>
						<span
							className={`${showOld ? 'translate-x-6' : 'translate-x-1'} inline-block h-4 w-4 transform rounded-full bg-white dark:bg-black transition`}
							aria-hidden='true'
						/>
					</Switch>
					<Switch.Label>Zeige alte Haltestellen</Switch.Label>
				</Switch.Group>
			</div>
			<table className='w-full'>
				<thead>
					<tr className='border-b border-black/25 dark:border-white/25 text-left'>
						<th className='p-2'>Abfahrt</th>
						<th className='p-2'>Haltestelle</th>
					</tr>
				</thead>
				<tbody>
					{showOld &&
						tripInfo.old.map(a => (
							<tr key={a.stop_seq_num} className='border-b border-black/25 dark:border-white/25 text-gray-400'>
								{/* <td className='p-2'>{a.actualTime}</td> */}
								<td className='p-2'>vor {formatTimeDifference(timeToDate(a.actualTime), true)}</td>
								<td className='p-2'>{a.stop.name}</td>
							</tr>
						))}
					{tripInfo.actual.map(a => (
						<tr key={a.stop_seq_num} className='border-b border-black/25 dark:border-white/25'>
							{/* <td className='p-2'>{a.actualTime}</td> */}
							<td className='p-2'>{a.status === 'STOPPING' ? 'Sofort' : formatTimeDifference(timeToDate(a.actualTime))}</td>
							<td className='p-2'>{a.stop.name}</td>
						</tr>
					))}
				</tbody>
			</table>
		</div>
	);
}
