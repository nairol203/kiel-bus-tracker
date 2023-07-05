import Link from 'next/link';
import { GeneralAlerts, RouteAlerts } from './alerts';

function formatDepartureTime(a: Actual) {
	return a.actualRelativeTime ? (a.actualRelativeTime > 60 ? `${Math.round(a.actualRelativeTime / 60)} min` : 'Sofort') : `${a.plannedTime} Uhr`;
}

export default function KVGTable({
	data,
	isPaused,
	direction,
	routeId,
	showGeneralAlerts = true,
	showRouteAlerts = true,
}: {
	data: KVGStops;
	isPaused: boolean;
	routeId?: string;
	direction?: string;
	showGeneralAlerts?: boolean;
	showRouteAlerts?: boolean;
}) {
	return (
		<div className='grid gap-1'>
			{showGeneralAlerts && <GeneralAlerts data={data} />}
			{showRouteAlerts && <RouteAlerts data={data} direction={direction} routeId={routeId} />}
			{data.actual.length ? (
				data.actual.map((actual, index) => (
					<Link
						href={`/trip/${actual.tripId}`}
						className='flex justify-between rounded bg-white/80 p-2 shadow transition duration-200 dark:bg-white/10 md:hover:bg-gray-100 dark:md:hover:bg-white/20'
						key={`${index}-${actual.tripId}`}
					>
						<div className='flex gap-4'>
							<span>{actual.patternText}</span>
							<span>{actual.direction}</span>
						</div>
						<span>{isPaused ? actual.actualTime : formatDepartureTime(actual)}</span>
					</Link>
				))
			) : (
				<div className='rounded bg-white/80 p-2 shadow dark:bg-white/10'>Keine Daten</div>
			)}
		</div>
	);
}
