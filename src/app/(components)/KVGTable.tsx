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
						className='flex justify-between rounded bg-secondary p-2 shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
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
				<div className='rounded bg-secondary p-2 shadow dark:bg-darkMode-secondary'>Keine Daten</div>
			)}
		</div>
	);
}
