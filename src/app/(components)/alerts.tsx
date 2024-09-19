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

export function GeneralAlerts({ data }: { data: NormalizedKVGStops }) {
	return (
		<>
			{filterIdenticalAlerts(data.generalAlerts).map((alert, index) => (
				<div className='shadows flex gap-2 rounded bg-primary p-2 text-darkMode-text dark:bg-darkMode-primary dark:text-text' key={`alert-${index}-${data.stopShortName}`}>
					<Image src='/warn.svg' alt='Warn Icon' height={35} width={35} className='shrink-0 invert dark:invert-0' />
					<span className='font-medium'>{alert.title}</span>
				</div>
			))}
		</>
	);
}

export function RouteAlerts({ data, direction, routeId }: { data: NormalizedKVGStops; routeId?: string; direction?: string }) {
	return (
		<>
			{data.routes
				.filter((route) => (routeId ? route.id === routeId : true))
				.map((route) =>
					filterIdenticalAlerts(route.alerts)
						.filter((alert) => (direction ? alert.direction.includes(direction) : true))
						.map((alert, index) => (
							<div
								className='grid gap-1 rounded bg-primary p-2 text-darkMode-text md:flex md:justify-between dark:bg-darkMode-primary dark:text-text'
								key={`alert-${index}-${data.stopShortName}`}
							>
								<div className='flex gap-4'>
									<span>{route.name}</span>
									<span>{alert.direction.join('; ')}</span>
								</div>
								<div className='flex gap-2'>
									<Image src='/warn.svg' alt='Warn Icon' height={25} width={25} className='shrink-0 invert dark:invert-0' />
									<span>{alert.title}</span>
								</div>
							</div>
						)),
				)}
		</>
	);
}
