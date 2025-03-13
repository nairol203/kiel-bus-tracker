import { useBusStore } from '@/stores/bus-store';
import Link from 'next/link';
import { GeneralAlerts, RouteAlerts } from './alerts';

function formatDepartureTime(a: NormalizedActual, isPaused: boolean, useRelativeTimes: boolean) {
	const dateDiff = Math.floor((a.actualDate.getTime() - a.plannedDate.getTime()) / 1000 / 60);

	if (dateDiff >= -1 && dateDiff <= 1) {
		return (
			<>
				<span className='row-span-2 flex items-center justify-end'>
					{!isPaused && useRelativeTimes
						? a.actualRelativeTime > 60
							? `${Math.round(a.actualRelativeTime / 60)} min`
							: 'Sofort'
						: a.actualDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' })}
				</span>
				<span className='col-span-2 text-sm'>Planmäßig</span>
			</>
		);
	} else if (dateDiff >= 2) {
		return (
			<>
				<span className='row-span-2 flex items-center justify-end'>
					{!isPaused && useRelativeTimes
						? a.actualRelativeTime > 60
							? `${Math.round(a.actualRelativeTime / 60)} min`
							: 'Sofort'
						: a.actualDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' })}
				</span>
				<span className='col-span-2 text-sm'>
					{dateDiff} min verspätet <s>{a.plannedDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' })}</s>
				</span>
			</>
		);
	} else if (dateDiff <= 2) {
		return (
			<>
				<span className='row-span-2 flex items-center justify-end'>
					{!isPaused && useRelativeTimes
						? a.actualRelativeTime > 60
							? `${Math.round(a.actualRelativeTime / 60)} min`
							: 'Sofort'
						: a.actualDate.toLocaleTimeString('de-DE', { hour: '2-digit', minute: '2-digit', timeZone: 'Europe/Berlin' })}
				</span>
				<span className='col-span-2 text-sm'>
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
	routeId?: string | null;
	direction?: string | null;
	showGeneralAlerts?: boolean;
	showRouteAlerts?: boolean;
}) {
	const { useRelativeTimes } = useBusStore();

	return (
		<div className='grid'>
			{showGeneralAlerts && <GeneralAlerts data={data} />}
			{showRouteAlerts && <RouteAlerts data={data} direction={direction} routeId={routeId} />}
			{data.actual.length ? (
				data.actual.map((actual, index) => (
					<>
						<Link href={`/trip/${actual.tripId}`} className='grid grid-cols-[35px_1fr_75px] justify-between gap-2 p-2' key={`${index}-${actual.tripId}`}>
							<span className='rounded-lg bg-accent text-center text-darkMode-text dark:bg-darkMode-accent'>{actual.patternText}</span>
							<span className='whitespace-nowrap'>{actual.direction}</span>
							{formatDepartureTime(actual, isPaused, useRelativeTimes)}
						</Link>
						{data.actual.length - 1 !== index && <div className='border-t border-primary' />}
					</>
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
			<span>43</span>
			<span>Kiel Hbf</span>
			<span className='row-span-2 flex items-center justify-end'>22:26</span>
			<span className='col-span-2 text-sm'>Planmäßig</span>
		</div>
	);
}
