import { Clock } from 'lucide-react';
import Link from 'next/link';
import { GeneralAlerts, RouteAlerts } from './alerts';

function hasBusDelay(plannedDate: Date, actualDate: Date) {
	const diffMinutes = (actualDate.getTime() - plannedDate.getTime()) / 60000;
	return diffMinutes > 2;
}

export default function KVGTable({
	data,
	direction,
	routeId,
	showGeneralAlerts = true,
	showRouteAlerts = true,
}: {
	data: NormalizedKVGStops;
	isPaused: boolean;
	routeId?: string | null;
	direction?: string | null;
	showGeneralAlerts?: boolean;
	showRouteAlerts?: boolean;
}) {
	return (
		<div className='grid rounded bg-secondary dark:bg-darkMode-secondary divide-background dark:divide-background/10 divide-y'>
			{showGeneralAlerts && <GeneralAlerts data={data} />}
			{showRouteAlerts && <RouteAlerts data={data} direction={direction} routeId={routeId} />}
			{data.actual.length ? (
				data.actual.map((actual, index) => (
					<Link
						href={`/trip/${actual.tripId}`}
						className='grid grid-cols-[35px_1fr_75px] justify-between items-center gap-x-6 p-4 transition duration-200 md:hover:bg-darkMode-secondary/10 md:dark:hover:bg-secondary/10'
						key={`${index}-${actual.tripId}`}
					>
						<span className='rounded-lg bg-accent text-center text-lg font-bold w-12 h-12 flex items-center justify-center text-darkMode-text dark:bg-darkMode-accent'>
							{actual.patternText}
						</span>
						<div className='grid'>
							<span className='whitespace-nowrap font-semibold text-lg'>{actual.direction}</span>
							{/* {hasBusDelay(actual.plannedDate, actual.actualDate) ? (
								<div className='flex gap-2'>
									<span className='flex gap-1 text-sm items-center line-through text-gray-600'>
										<Clock className='h-3 w-3' /> {actual.plannedDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
									</span>
									
								</div>
							) : (
							)} */}
							<div className='flex gap-2 font-medium'>
								<span className={`flex gap-1 text-sm items-center text-gray-600 ${hasBusDelay(actual.plannedDate, actual.actualDate) ? 'line-through' : ''}`}>
									<Clock className='h-3 w-3' /> {actual.plannedDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
								</span>
								{hasBusDelay(actual.plannedDate, actual.actualDate) && (
									<span className='text-red-400 text-sm'>{actual.actualDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
								)}
							</div>
						</div>
						<span className={`flex items-center justify-end font-bold text-lg`}>
							{actual.actualRelativeTime < 60 ? 'Jetzt' : `${Math.round(actual.actualRelativeTime / 60)} min`}
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
		<div className='skeleton grid grid-cols-[35px_1fr_75px] justify-between gap-2 p-4'>
			<span className='h-12 w-12'>43</span>
			<span>Kiel Hbf</span>
			<span className=' flex items-center justify-end'>22:26</span>
		</div>
	);
}
