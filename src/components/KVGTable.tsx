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
		<div className='divide-border divide-y'>
			{/* {showGeneralAlerts && <GeneralAlerts data={data} />} */}
			{/* {showRouteAlerts && <RouteAlerts data={data} direction={direction} routeId={routeId} />} */}
			{data.actual.length ? (
				data.actual.map((actual, index) => (
					<Link
						href={`/trip/${actual.tripId}`}
						className='md:hover:bg-surface/60 grid grid-cols-[35px_1fr_75px] items-center justify-between gap-x-6 p-4 transition duration-200'
						key={`${index}-${actual.tripId}`}
					>
						<span className='bg-primary flex h-12 w-12 items-center justify-center rounded-lg text-center text-lg font-semibold text-white'>{actual.patternText}</span>
						<div className='grid'>
							<span className='text-lg font-semibold whitespace-nowrap'>{actual.direction}</span>
							<div className='flex gap-2 font-medium'>
								<span className={`text-muted flex items-center gap-1 text-sm ${hasBusDelay(actual.plannedDate, actual.actualDate) ? 'line-through' : ''}`}>
									<Clock className='h-3 w-3' /> {actual.plannedDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}
								</span>
								{hasBusDelay(actual.plannedDate, actual.actualDate) && (
									<span className='text-sm text-red-400'>{actual.actualDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit' })}</span>
								)}
							</div>
						</div>
						<span className={`flex items-center justify-end text-lg font-semibold`}>
							{actual.actualRelativeTime < 60 ? 'Jetzt' : `${Math.round(actual.actualRelativeTime / 60)} min`}
						</span>
					</Link>
				))
			) : (
				<div className='text-muted p-8 text-center'>Keine anstehenden Abfahrten.</div>
			)}
		</div>
	);
}

export function SkeletonKVGTable() {
	return (
		<div className='grid grid-cols-[35px_1fr_75px] items-center justify-between gap-x-6 p-4'>
			<div className='skeleton h-12 w-12 flex-shrink-0 rounded-lg' />
			<div className='grid min-w-0 gap-2 pr-2'>
				<div className='skeleton h-5 w-32 rounded-md' />
				<div className='skeleton h-3.5 w-12 rounded-md' />
			</div>
			<div className='flex flex-col items-end gap-1.5'>
				<div className='skeleton h-6 w-12 rounded-md' />
			</div>
		</div>
	);
}
