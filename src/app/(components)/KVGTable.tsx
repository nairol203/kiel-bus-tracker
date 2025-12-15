import { useBusStore } from '@/stores/bus-store';
import Link from 'next/link';
import { GeneralAlerts, RouteAlerts } from './alerts';

function getTimeDisplay(date: Date, relativeTime: number, useRelative: boolean, isPaused: boolean) {
	if (isPaused || !useRelative) {
		return date.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' });
	}
	return relativeTime < 60 ? 'Sofort' : `${Math.round(relativeTime / 60)} min`;
}

function getStatus(plannedDate: Date, actualDate: Date) {
	const diffInMinutes = (actualDate.getTime() - plannedDate.getTime()) / 60000;
	if (diffInMinutes > 3) return `${Math.round(diffInMinutes)} min Verspätung`;
	if (diffInMinutes < -3) return `${Math.round(diffInMinutes)} min früher`;
	return '';
}

export default function KVGTable({
	data,
	isPaused,
	direction,
	routeId,
	showGeneralAlerts = true,
	showRouteAlerts = true,
	orientation = 'vertical',
}: {
	data: NormalizedKVGStops;
	isPaused: boolean;
	routeId?: string | null;
	direction?: string | null;
	showGeneralAlerts?: boolean;
	showRouteAlerts?: boolean;
	orientation?: 'vertical' | 'horizontal';
}) {
	const { useRelativeTimes } = useBusStore();

	if (orientation == 'horizontal') {
		return (
			<div className='flex gap-2 overflow-scroll '>
				{data.actual.length ? (
					data.actual.map((actual, index) => (
						<Link
							href={`/trip/${actual.tripId}`}
							className='flex flex-col gap-1 min-w-40 w-40 rounded bg-secondary p-2 shadow transition duration-200 md:hover:bg-secondary/75 dark:bg-darkMode-secondary md:hover:dark:bg-secondary/10'
							key={`${index}-${actual.tripId}`}
						>
							<span className='rounded-lg  bg-accent text-center font-bold w-8 h-8 flex items-center justify-center text-darkMode-text dark:bg-darkMode-accent'>
								{actual.patternText}
							</span>
							<span className='font-semibold hyphens-auto break-word'>{actual.direction}</span>
							<span className={`text-sm ${getStatus(actual.plannedDate, actual.actualDate).toString().includes('Verspätung') ? 'text-red-500' : 'text-accent'}`}>
								{getStatus(actual.plannedDate, actual.actualDate)}
							</span>
							<span
								className={`mt-auto font-bold text-lg ${getStatus(actual.plannedDate, actual.actualDate).toString().includes('Verspätung') ? 'text-red-500' : ''}`}
							>
								{getTimeDisplay(actual.actualDate, actual.actualRelativeTime, useRelativeTimes, isPaused)}
							</span>
						</Link>
					))
				) : (
					<div className='p-2'>Keine Daten</div>
				)}
			</div>
		);
	}

	return (
		<div className='grid gap-2'>
			{showGeneralAlerts && <GeneralAlerts data={data} />}
			{showRouteAlerts && <RouteAlerts data={data} direction={direction} routeId={routeId} />}
			{data.actual.length ? (
				data.actual.map((actual, index) => (
					<Link
						href={`/trip/${actual.tripId}`}
						className='grid grid-cols-[35px_1fr_75px] justify-between items-center gap-x-4 rounded bg-secondary p-2 shadow transition duration-200 md:hover:bg-secondary/75 dark:bg-darkMode-secondary md:hover:dark:bg-secondary/10'
						key={`${index}-${actual.tripId}`}
					>
						<span className='rounded-lg bg-accent text-center text-xl font-bold w-10 h-10 flex items-center justify-center text-darkMode-text dark:bg-darkMode-accent'>
							{actual.patternText}
						</span>
						<div className='grid'>
							<span className='whitespace-nowrap font-semibold'>{actual.direction}</span>
							<span className={`text-sm ${getStatus(actual.plannedDate, actual.actualDate).toString().includes('Verspätung') ? 'text-red-500' : 'text-accent'}`}>
								{getStatus(actual.plannedDate, actual.actualDate)}
							</span>
						</div>
						<span
							className={`flex items-center justify-end font-bold text-lg ${getStatus(actual.plannedDate, actual.actualDate).toString().includes('Verspätung') ? 'text-red-500' : ''}`}
						>
							{getTimeDisplay(actual.actualDate, actual.actualRelativeTime, useRelativeTimes, isPaused)}
						</span>
					</Link>
				))
			) : (
				<div className='p-2'>Keine Daten</div>
			)}
		</div>
	);
}

export function SkeletonKVGTable() {
	return (
		<div className='skeleton grid grid-cols-[35px_1fr_75px] justify-between gap-2 rounded p-2'>
			<span className='h-10 w-10'>43</span>
			<span>Kiel Hbf</span>
			<span className=' flex items-center justify-end'>22:26</span>
		</div>
	);
}
