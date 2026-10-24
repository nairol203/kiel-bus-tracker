import { TriangleAlert } from 'lucide-react';

function filterIdenticalAlerts<T extends GeneralAlert | RouteAlert>(alerts: T[]) {
	const uniqueAlerts: T[] = [];

	for (const alert of alerts) {
		const isIdentical = uniqueAlerts.some((uniqueAlert) => JSON.stringify(uniqueAlert) === JSON.stringify(alert));
		if (isIdentical) continue;
		uniqueAlerts.push(alert);
	}

	return uniqueAlerts;
}

export function GeneralAlerts({ data }: { data: NormalizedKVGStops }) {
	return filterIdenticalAlerts(data.generalAlerts).map((alert, index) => (
		<div className='border-border bg-primary/20 flex border-b p-3' key={`alert-${index}-${data.stopShortName}`}>
			<TriangleAlert className='mr-4 h-6 w-6 shrink-0' />
			<span className='font-medium'>{alert.title}</span>
		</div>
	));
}

export function RouteAlerts({ data, direction, routeId }: { data: NormalizedKVGStops; routeId?: string | null; direction?: string | null }) {
	return data.routes
		.filter((route) => (routeId ? route.id === routeId : true))
		.map((route) =>
			filterIdenticalAlerts(route.alerts)
				.filter((alert) => (direction ? alert.direction.includes(direction) : true))
				.map((alert, index) => (
					<div className='bg-primary/20 border-border flex border-b p-3' key={`alert-${index}-${data.stopShortName}`}>
						<TriangleAlert className='mr-4 h-6 w-6 shrink-0' />
						<span>Linie {route.name}</span>
						<span className='font-medium sm:before:mx-2 sm:before:content-["•"]'>{alert.title}</span>
					</div>
				)),
		);
}
