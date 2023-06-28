import Image from 'next/image';
import Link from 'next/link';

function formatDepartureTime(a: Actual) {
	return a.actualRelativeTime ? (a.actualRelativeTime > 60 ? `${Math.round(a.actualRelativeTime / 60)} min` : 'Sofort') : `${a.plannedTime} Uhr`;
}

function filterIdenticalRouteAlerts(alerts: RouteAlert[]) {
	const uniqueAlerts: RouteAlert[] = [];

	for (const alert of alerts) {
		const isIdentical = uniqueAlerts.some((uniqueAlert) => JSON.stringify(uniqueAlert) === JSON.stringify(alert));
		if (isIdentical) continue;
		uniqueAlerts.push(alert);
	}

	return uniqueAlerts;
}

export default function KVGTable({ data, direction, routeId, showAlert = true }: { data: KVGStops; routeId?: string; direction?: string; showAlert?: boolean }) {
	return (
		<div className='grid gap-1'>
			{showAlert &&
				data.generalAlerts.map((alert, index) => (
					<div className='flex gap-2 text-black rounded bg-yellow-400 p-2 dark:bg-yellow-600' key={`alert-${index}-${data.stopShortName}`}>
						<Image src='/warn.svg' alt='Warn Icon' height={35} width={35} className='shrink-0' />
						<span className='font-medium'>{alert.title}</span>
					</div>
				))}
			{showAlert &&
				data.routes
					.filter((route) => (routeId ? route.id === routeId : true))
					.map((route) =>
						filterIdenticalRouteAlerts(route.alerts)
							.filter((alert) => (direction ? alert.direction.includes(direction) : true))
							.map((alert, index) => (
								<div className='grid gap-1 text-black rounded bg-yellow-400 p-2 dark:bg-yellow-600' key={`alert-${index}-${data.stopShortName}`}>
									<div className='flex gap-4'>
										<span>{route.name}</span>
										<span>{alert.direction.join('; ')}</span>
									</div>
									<div className='flex gap-2'>
										<Image src='/warn.svg' alt='Warn Icon' height={25} width={25} className='shrink-0' />
										<span>{alert.title}</span>
									</div>
								</div>
							))
					)}
			{data.actual.length ? (
				data.actual.map((actual, index) => (
					<Link
						href={`/trip/${actual.tripId}`}
						className='flex justify-between rounded bg-white/80 p-2 transition duration-200 dark:bg-white/10 md:hover:bg-gray-100 dark:md:hover:bg-white/20'
						key={`${index}-${actual.tripId}`}
					>
						<div className='flex gap-4'>
							<span>{actual.patternText}</span>
							<span>{actual.direction}</span>
						</div>
						<span>{formatDepartureTime(actual)}</span>
					</Link>
				))
			) : (
				<div className='rounded bg-white/80 p-2 dark:bg-white/10'>Keine Daten</div>
			)}
		</div>
	);
}
