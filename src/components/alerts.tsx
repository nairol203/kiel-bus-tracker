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
	return (
		<>
			{filterIdenticalAlerts(data.generalAlerts).map((alert, index) => (
				<div
					className='shadows flex gap-2 rounded-sm bg-primary p-2 text-darkMode-text dark:bg-darkMode-primary dark:text-text'
					key={`alert-${index}-${data.stopShortName}`}
				>
					<TriangleAlert className='shrink-0 h-9 w-9' />
					<span className='font-medium'>{alert.title}</span>
				</div>
			))}
		</>
	);
}

export function RouteAlerts({ data, direction, routeId }: { data: NormalizedKVGStops; routeId?: string | null; direction?: string | null }) {
	return (
		<>
			{data.routes
				.filter((route) => (routeId ? route.id === routeId : true))
				.map((route) =>
					filterIdenticalAlerts(route.alerts)
						.filter((alert) => (direction ? alert.direction.includes(direction) : true))
						.map((alert, index) => (
							<div
								className='grid gap-1 rounded-sm bg-primary p-2 text-darkMode-text md:flex md:justify-between dark:bg-darkMode-primary dark:text-text'
								key={`alert-${index}-${data.stopShortName}`}
							>
								<div className='flex gap-4'>
									<span>{route.name}</span>
									<span>{alert.direction.join('; ')}</span>
								</div>
								<div className='flex gap-2'>
									<TriangleAlert className='shrink-0 h-6 w-6' />
									<span>{alert.title}</span>
								</div>
							</div>
						)),
				)}
		</>
	);
}
