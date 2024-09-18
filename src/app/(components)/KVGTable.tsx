import Link from 'next/link';
import { GeneralAlerts, RouteAlerts } from './alerts';

function formatDepartureTime(a: NormalizedActual) {
	// return a.actualRelativeTime ? (a.actualRelativeTime > 60 ? `${Math.round(a.actualRelativeTime / 60)} min` : 'Sofort') : `${a.plannedTime} Uhr`;
	const dateDiff = Math.floor((a.actualDate.getTime() - a.plannedDate.getTime()) / 1000 / 60);

	if (dateDiff >= -1 && dateDiff <= 1) {
		return (
			<>
				<span className='flex justify-end'>{a.plannedDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' })}</span>
				<span className='text-sm col-span-3 flex justify-end gap-1'>Planmäßig</span>
			</>
		);
	} else if (dateDiff >= 2) {
		return (
			<>
				<span className='flex items-end justify-end'>{a.actualDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' })}</span>
				<span className='text-sm col-span-3 flex justify-end gap-1'>
					{dateDiff} min verspätet <s>{a.plannedDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' })}</s>
				</span>
			</>
		);
	} else if (dateDiff <= 2) {
		return (
			<>
				<span className='flex justify-end'>{a.actualDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' })}</span>
				<span className='text-sm col-span-3 flex justify-end gap-1'>
					{dateDiff * -1} min früher <s>{a.plannedDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' })}</s>
				</span>
			</>
		);
	}
}

export default function KVGTable({
	data,
	isPaused,
	direction,
	routeId,
	showGeneralAlerts = true,
	showRouteAlerts = true,
}: {
	data: NormalizedKVGStops;
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
						className='grid grid-cols-[35px_1fr_1fr] justify-between rounded bg-secondary p-2 shadow transition duration-200 dark:bg-darkMode-secondary md:hover:bg-accent md:hover:text-darkMode-text dark:md:hover:bg-darkMode-accent'
						key={`${index}-${actual.tripId}`}
					>
						<span>{actual.patternText}</span>
						<span>{actual.direction}</span>
						{formatDepartureTime(actual)}
					</Link>
				))
			) : (
				<div className='rounded bg-secondary p-2 shadow dark:bg-darkMode-secondary'>Keine Daten</div>
			)}
		</div>
	);
}
