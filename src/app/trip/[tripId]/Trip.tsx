'use client';

import { getStopData, getTripInfo } from '@/app/(components)/actions';
import KVGTable from '@/app/(components)/KVGTable';
import { useBusStore } from '@/stores/bus-store';
import { queryClient } from '@/utils/Providers';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React from 'react';
import HealthIndicator from 'src/app/(components)/HealthIndicator';

function formatTimeDifference(date: Date, old = false) {
	const currentTime = new Date();
	const timeDifferenceMin = Math.floor((old ? currentTime.getTime() - date.getTime() : date.getTime() - currentTime.getTime()) / 1000 / 60);

	if (old) {
		return `vor ${timeDifferenceMin} min`;
	} else if (timeDifferenceMin <= 0) {
		return 'Sofort';
	} else {
		return `${timeDifferenceMin} min`;
	}
}

export default function Trip({ tripId }: { tripId: string }) {
	const router = useRouter();
	const {
		data: tripInfo,
		isFetching,
		isError,
		isPaused,
	} = useQuery({
		queryKey: ['tripInfo'],
		queryFn: async () => {
			const res = await getTripInfo(tripId);
			queryClient.invalidateQueries({ queryKey: ['connectingBus'] });
			return res;
		},
		refetchInterval: 10_000,
	});

	const { useRelativeTimes } = useBusStore();

	if (isError) {
		return (
			<div className='mx-2 grid gap-2'>
				<h1>Fehler</h1>
				<span>Die Fahrt konnte nicht geladen werden.</span>
				<button
					onClick={() => queryClient.refetchQueries({ queryKey: ['tripInfo'] })}
					className='rounded bg-primary px-2.5 py-1.5 text-darkMode-text md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-primary dark:text-text dark:md:hover:bg-darkMode-accent'
				>
					Erneut versuchen
				</button>
				<button
					onClick={() => router.back()}
					className='rounded bg-secondary px-2.5 py-1.5 text-text md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-secondary dark:text-darkMode-text dark:md:hover:bg-darkMode-accent'
				>
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

	const ConnectingBus: React.FC<{ stopId: string; tripId: string }> = ({ stopId, tripId }) => {
		const {
			data: busStop,
			isFetching,
			isError,
			isPaused,
		} = useQuery({
			queryKey: ['connectingBus'],
			queryFn: () => getStopData({ stopId }),
			refetchInterval: 10_000,
		});

		if (!busStop) return;

		const filteredStop: NormalizedKVGStops = {
			...busStop,
			actual: busStop.actual.filter((a) => a.tripId !== tripId && a.actualRelativeTime < 600).slice(0, 5),
		};

		if (!filteredStop.actual.length) return;

		return (
			<div className='grid gap-2'>
				<div className='flex items-center justify-between'>
					<h2>Anschluss Busse für {tripInfo.actual[0].stop.name}</h2>
					<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} />
				</div>
				<KVGTable data={filteredStop} isPaused={isPaused} />
			</div>
		);
	};

	return (
		<div className='mx-2 grid gap-3'>
			<h1 className='flex gap-2'>
				<span className='rounded-lg bg-accent px-2 text-center text-darkMode-text dark:bg-darkMode-accent'>{tripInfo.routeName}</span>
				<span>{tripInfo.directionText}</span>
			</h1>
			{/* {!!tripInfo.actual.length && (
				<span>
					{tripInfo.actual[0].stopSequenceNumber - 1}/{tripInfo.actual[tripInfo.actual.length - 1].stopSequenceNumber} Haltestellen angefahren
				</span>
			)} */}
			{tripInfo.actual.length ? (
				<>
					<ConnectingBus stopId={tripInfo.actual[0].stop.shortName} tripId={tripId} />
					<div className='flex items-center justify-between'>
						<h2>Nächste Haltestelle</h2>
						<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} />
					</div>
					<div className='grid gap-1'>
						{tripInfo.actual.map((a) => (
							<Link
								href={`/echtzeit?stop=${a.stop.shortName}`}
								key={a.stopSequenceNumber}
								className='flex justify-between rounded bg-secondary p-2 shadow md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-secondary dark:md:hover:bg-darkMode-accent'
							>
								<span>{a.stop.name}</span>
								{a.status === 'STOPPING'
									? 'Sofort'
									: useRelativeTimes
										? formatTimeDifference(a.actualDate)
										: a.actualDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' })}
							</Link>
						))}
					</div>
				</>
			) : (
				<>
					<span>Der Bus hat die Endstation erreicht.</span>
					<button
						onClick={() => router.back()}
						className='rounded bg-primary px-2.5 py-1.5 text-darkMode-text md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-primary dark:text-text dark:md:hover:bg-darkMode-accent'
					>
						Zurück
					</button>
				</>
			)}
			{!!tripInfo.old.length && (
				<Disclosure as='div'>
					<DisclosureButton className='group mb-1 flex w-full justify-between gap-4 rounded bg-secondary p-2 shadow md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-secondary dark:md:hover:bg-darkMode-accent'>
						<span>Bereits angefahrende Haltestellen</span>
						<Image src='/chevron-down.svg' alt='Pfeil der nach unten zeigt' width={20} height={20} className='shrink-0 group-data-[open]:rotate-180 dark:invert' />
					</DisclosureButton>
					<DisclosurePanel transition className='grid origin-top gap-1 transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0'>
						{tripInfo.old.toReversed().map((a) => (
							<Link
								href={`/echtzeit?stop=${a.stop.shortName}`}
								key={`old_${a.stopSequenceNumber}`}
								className='flex justify-between rounded bg-secondary p-2 shadow md:hover:bg-accent md:hover:text-darkMode-text dark:bg-darkMode-secondary dark:md:hover:bg-darkMode-accent'
							>
								<span>{a.stop.name}</span>
								{a.actualDate
									? useRelativeTimes
										? formatTimeDifference(a.actualDate, true)
										: a.actualDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' })
									: ''}
							</Link>
						))}
					</DisclosurePanel>
				</Disclosure>
			)}
		</div>
	);
}
