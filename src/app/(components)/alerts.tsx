import Image from 'next/image';

function filterIdenticalAlerts<T extends GeneralAlert | RouteAlert>(alerts: T[]) {
	const uniqueAlerts: T[] = [];

	for (const alert of alerts) {
		const isIdentical = uniqueAlerts.some((uniqueAlert) => JSON.stringify(uniqueAlert) === JSON.stringify(alert));
		if (isIdentical) continue;
		uniqueAlerts.push(alert);
	}

	return uniqueAlerts;
}

export function GeneralAlerts({ data }: { data: KVGStops }) {
	return (
		<>
			{filterIdenticalAlerts(data.generalAlerts).map((alert, index) => (
				<div className='flex gap-2 rounded bg-yellow-400 p-2 text-black dark:bg-yellow-600 shadow' key={`alert-${index}-${data.stopShortName}`}>
					<Image src='/warn.svg' alt='Warn Icon' height={35} width={35} className='shrink-0' />
					<span className='font-medium'>{alert.title}</span>
				</div>
			))}
		</>
	);
}

export function RouteAlerts({ data, direction, routeId }: { data: KVGStops; routeId?: string; direction?: string }) {
	return (
		<>
			{data.routes
				.filter((route) => (routeId ? route.id === routeId : true))
				.map((route) =>
					filterIdenticalAlerts(route.alerts)
						.filter((alert) => (direction ? alert.direction.includes(direction) : true))
						.map((alert, index) => (
							<div
								className='grid md:flex md:justify-between gap-1 rounded bg-yellow-400 p-2 text-black dark:bg-yellow-600 shadow'
								key={`alert-${index}-${data.stopShortName}`}
							>
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
		</>
	);
}
