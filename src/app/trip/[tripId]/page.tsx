'use client';

import { useQuery } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { getTripInfo } from 'src/app/(components)/actions';
import HealthIndicator from 'src/app/(components)/HealthIndicator';

function timeToDate(time: string) {
	const [hours, minutes] = time.split(':').map(Number);

	const date = new Date();

	if (hours < date.getHours()) {
		date.setDate(date.getDate() + 1);
	}

	date.setHours(hours);
	date.setMinutes(minutes);
	date.setSeconds(0);
	date.setMilliseconds(0);

	return date;
}

function formatTimeDifference(date: Date, old = false) {
	const currentTime = new Date();
	const timeDifferenceMin = Math.floor((old ? currentTime.getTime() - date.getTime() : date.getTime() - currentTime.getTime()) / 1000 / 60);

	if (timeDifferenceMin <= 0) {
		return 'Sofort';
	} else {
		return `${timeDifferenceMin} min`;
	}
}

export default function Page({ params }: { params: { tripId: string } }) {
	const router = useRouter();
	const {
		data: tripInfo,
		isFetching,
		isError,
		isPaused,
	} = useQuery({
		queryKey: ['tripInfo'],
		queryFn: async () => {
			const res = await getTripInfo(params.tripId);
			return res;
		},
		refetchInterval: 10_000,
	});

	if (isError) {
		return (
			<div className='mx-2 grid gap-2'>
				<h1>Fehler</h1>
				<span>Die Fahrt konnte nicht gefunden werden.</span>
				<button onClick={() => router.back()} className='rounded bg-primary px-2.5 py-1.5 dark:bg-darkMode-primary'>
					Zurück
				</button>
			</div>
		);
	}

	if (!tripInfo) {
		return (
			<div className='mx-2 grid gap-2'>
				<div className='flex items-center justify-between'>
					<h1 className='skeleton'>Lorem ipsum dolor sit.</h1>
					<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} />
				</div>
				<div className='grid gap-1'>
					<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
					<div className='skeleton flex justify-between rounded p-2'>Lorem ipsum dolor sit amet.</div>
				</div>
			</div>
		);
	}

	return (
		<div className='mx-2 grid gap-2'>
			<div className='flex items-center justify-between'>
				<h1>
					{tripInfo.routeName} {tripInfo.directionText}
				</h1>
				<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} />
			</div>
			{tripInfo.actual.length ? (
				<div className='grid gap-1'>
					{tripInfo.actual.map((a) => (
						<div key={a.stop_seq_num} className='flex justify-between rounded bg-secondary p-2 shadow dark:bg-darkMode-secondary'>
							<span>{a.stop.name}</span>
							{a.status !== 'STOPPING' && <span>{isPaused ? a.actualTime || a.plannedTime : formatTimeDifference(timeToDate(a.actualTime || a.plannedTime))}</span>}
						</div>
					))}
				</div>
			) : (
				<>
					<span>Der Bus hat die Endstation erreicht.</span>
					<button onClick={() => router.back()} className='rounded bg-primary px-2.5 py-1.5 shadow dark:bg-darkMode-primary'>
						Zurück
					</button>
				</>
			)}
		</div>
	);
}
