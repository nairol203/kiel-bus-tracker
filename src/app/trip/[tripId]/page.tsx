'use client';

import { useBusStore } from '@/stores/bus-store';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getTripInfo } from 'src/app/(components)/actions';
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

	const { useRelativeTimes } = useBusStore();

	if (isError) {
		return (
			<div className='mx-2 grid gap-2'>
				<h1>Fehler</h1>
				<span>Die Fahrt konnte nicht gefunden werden.</span>
				<button
					onClick={() => router.back()}
					className='rounded bg-primary text-darkMode-text px-2.5 py-1.5 dark:bg-darkMode-primary dark:text-text md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
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

	return (
		<div className='mx-2 grid gap-3'>
			<div className='flex items-center justify-between'>
				<h1 className='flex gap-2'>
					<span className='px-2 bg-accent dark:bg-darkMode-accent text-darkMode-text rounded-lg text-center'>{tripInfo.routeName}</span>
					<span>{tripInfo.directionText}</span>
				</h1>
				<HealthIndicator isError={isError} isFetching={isFetching} isPaused={isPaused} />
			</div>
			{tripInfo.actual.length ? (
				<div className='grid gap-1'>
					{tripInfo.actual.map((a) => (
						<Link
							href={`/echtzeit?stop=${a.stop.shortName}`}
							key={a.stopSequenceNumber}
							className='flex justify-between rounded bg-secondary p-2 shadow dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
						>
							<span>{a.stop.name}</span>
							{a.status === 'STOPPING'
								? 'Sofort'
								: useRelativeTimes
									? formatTimeDifference(a.actualDate || a.plannedDate)
									: a.actualDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' })}
						</Link>
					))}
				</div>
			) : (
				<>
					<span>Der Bus hat die Endstation erreicht.</span>
					<button
						onClick={() => router.back()}
						className='rounded bg-primary text-darkMode-text px-2.5 py-1.5 dark:bg-darkMode-primary dark:text-text md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
					>
						Zurück
					</button>
				</>
			)}
			{!!tripInfo.old.length && (
				<Disclosure as='div'>
					<DisclosureButton className='group flex justify-between gap-4 mb-1 w-full md:w-auto rounded bg-secondary p-2 shadow dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'>
						<span>Bereits angefahrende Haltestellen</span>
						<Image src='/chevron-down.svg' alt='Pfeil der nach unten zeigt' width={20} height={20} className='shrink-0 dark:invert group-data-[open]:rotate-180' />
					</DisclosureButton>
					<DisclosurePanel transition className='grid gap-1 origin-top transition duration-200 ease-out data-[closed]:-translate-y-6 data-[closed]:opacity-0'>
						{tripInfo.old.toReversed().map((a) => (
							<Link
								href={`/echtzeit?stop=${a.stop.shortName}`}
								key={`old_${a.stopSequenceNumber}`}
								className='flex justify-between rounded bg-secondary p-2 shadow dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
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
