'use client';

import { useFavouritesStore } from '@/stores/useFavouritesStore';
import { useQuery } from '@tanstack/react-query';
import { AlertCircle, Star } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { getStopData } from '../lib/kvg';
import { GeneralAlerts, RouteAlerts } from './Alerts';
import DirectionFilter from './DirectionFilter';
import HealthIndicator from './HealthIndicator';
import KVGTable from './KVGTable';
import RouteFilter from './RouteFilter';

export default function Departures({ stopId }: { stopId: string }) {
	const searchParams = useSearchParams();
	const router = useRouter();
	const { favouriteStops, addFavouriteStop, removeFavouriteStop } = useFavouritesStore();

	const routeId = searchParams.get('routeId');
	const direction = searchParams.get('direction');

	const {
		data: busStop,
		isError,
		isPaused,
	} = useQuery({
		queryKey: ['stopData', stopId],
		queryFn: async (): ReturnType<typeof getStopData> => {
			const res = await fetch(`/api/departures/${stopId}`);
			if (!res.ok) throw new Error('Failed to fetch departures');
			return res.json();
		},
		refetchInterval: 15_000,
	});

	if (isError) {
		return (
			<div className='mt-4'>
				<div className='bg-surface border-border flex flex-col items-center justify-center rounded border p-12 text-center shadow'>
					<AlertCircle className='text-muted mb-4 h-10 w-10' />
					<h1 className='text-text mb-2 text-xl font-bold'>Fehler beim Laden der Haltestelle</h1>
					<p className='text-muted mb-6 text-sm'>Die Fahrtdaten konnten nicht abgerufen werden.</p>
					<button onClick={() => router.back()} className='bg-surface hover:bg-surface-hover text-muted border-border rounded border px-4 py-2'>
						Zurück
					</button>
				</div>
			</div>
		);
	}

	if (!busStop) {
		return (
			<div className='bg-surface border-border mt-4 grid rounded border shadow'>
				<div className='bg-primary/10 border-border flex items-center justify-between rounded-t border-b p-4'>
					<div className='skeleton h-7 w-64 rounded-md' />
					<div className='skeleton h-4 w-24 rounded-md' />
				</div>
				<div className='border-border bg-surface-hover/30 grid grid-cols-2 gap-2 border-b p-2 md:flex'>
					<div className='skeleton h-10 rounded-md md:w-28' />
					<div className='skeleton h-10 rounded-md md:w-60' />
				</div>
				<div className='divide-border grid divide-y'>
					{[...Array(5)].map((_, i) => (
						<div className='grid grid-cols-[35px_1fr_75px] items-center justify-between gap-x-6 p-4' key={i}>
							<div className='skeleton h-12 w-12 shrink-0 rounded-lg' />
							<div className='grid min-w-0 gap-2 pr-2'>
								<div className='skeleton h-5 w-32 rounded-md' />
								<div className='skeleton h-3.5 w-12 rounded-md' />
							</div>
							<div className='flex flex-col items-end gap-1.5'>
								<div className='skeleton h-6 w-12 rounded-md' />
							</div>
						</div>
					))}
				</div>
			</div>
		);
	}

	const isFavourite = favouriteStops.some((stop) => stop.shortName === busStop.stopShortName);

	const toggleFavourites = () => {
		if (isFavourite) {
			removeFavouriteStop({ name: busStop.stopName, shortName: busStop.stopShortName });
		} else {
			addFavouriteStop({ name: busStop.stopName, shortName: busStop.stopShortName });
		}
	};

	return (
		<div className='bg-surface border-border mt-4 grid rounded border shadow'>
			<div className='bg-primary/10 border-border flex flex-col justify-between gap-2 rounded-t border-b p-4'>
				<div className='flex justify-between gap-2'>
					<h2 className='font-bold'>Abfahrten von {busStop.stopName}</h2>
					<button
						onClick={toggleFavourites}
						title={isFavourite ? 'Von Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
						aria-label={isFavourite ? 'Von Favoriten entfernen' : 'Zu Favoriten hinzufügen'}
					>
						<Star className={`${isFavourite && 'fill-primary text-primary'} h-5 w-5`} />
					</button>
				</div>
				<HealthIndicator isError={isError} isPaused={isPaused} />
			</div>
			{(busStop.actual.length > 1 || !!routeId || !!direction) && (
				<div className='border-border bg-surface-hover/30 grid grid-cols-2 gap-2 border-b p-2 md:flex'>
					<RouteFilter stop={busStop} />
					<DirectionFilter stop={busStop} />
				</div>
			)}
			<GeneralAlerts data={busStop} />
			<RouteAlerts data={busStop} direction={direction} routeId={routeId} />
			<KVGTable data={busStop} direction={direction} routeId={routeId} />
		</div>
	);
}
