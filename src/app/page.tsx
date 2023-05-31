async function getStopData({ stop, routeId, direction }: { stop: string; routeId: string; direction?: string }) {
	const endpoint = new URL('https://www.kvg-kiel.de/internetservice/services/passageInfo/stopPassages/stop');

	endpoint.searchParams.append('stop', stop);
	endpoint.searchParams.append('routeId', routeId);
	endpoint.searchParams.append('mode', 'departure');

	if (direction) {
		endpoint.searchParams.append('direction', direction);
	}

	const res = await fetch(endpoint.toString(), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-store',
	});

	const data = await res.json();

	return data as KVGStops;
}

function concatStops(stops: Actual[]) {
	return stops.sort((a, b) => a.actualRelativeTime - b.actualRelativeTime);
}

export default async function Page() {
	const rathausKronshagen = await getStopData({
		stop: '1624',
		routeId: '60835712076873740',
		direction: 'Am Wellsee',
	});

	const heischberg = await getStopData({
		stop: '1317',
		routeId: '60835712076873750',
		direction: 'Ellerbeker Weg',
	});

	const amLangsee = await getStopData({
		stop: '1312',
		routeId: '60835712076873740',
		direction: 'Albert-Schweitzer-Straße',
	});

	const preetzerStraße71 = await getStopData({
		stop: '2246',
		routeId: '60835712076873750',
		direction: 'Kronshagen, Schulzentrum',
	});

	const preetzerStraße72 = await getStopData({
		stop: '2246',
		routeId: '60835712076873751',
		direction: 'Kronshagen, Schulzentrum',
	});

	return (
		<div className='grid gap-4 m-4'>
			<h1>Nairol Bus Tracker</h1>
			<div className='grid gap-2'>
				<h2>Rathaus Kronshagen</h2>
				<KVGTable data={rathausKronshagen.actual} />
				<h2>Heischberg</h2>
				<KVGTable data={heischberg.actual} />
				<h2>Am Langsee</h2>
				<KVGTable data={amLangsee.actual} />
				<h2>Preetzer Straße/Ostring</h2>
				<KVGTable data={concatStops([...preetzerStraße71.actual, ...preetzerStraße72.actual])} />
			</div>
			<div>
				<a className='px-2.5 py-1.5 rounded bg-black/25 dark:bg-white/25' href='/'>
					Neu laden
				</a>
			</div>
			<span className='text-sm opacity-70'>Letztes Update: {new Date().toLocaleTimeString('de-DE', { timeZone: 'Europe/Berlin' })}</span>
		</div>
	);
}

function KVGTable({ data }: { data: Actual[] }) {
	function formatDepartureTime(a: Actual) {
		return a.actualRelativeTime
			? `${a.actualRelativeTime > 60 ? `${Math.round(a.actualRelativeTime / 60)} Minute${Math.round(a.actualRelativeTime / 60) !== 1 ? 'n' : ''} ` : 'Sofort'}`
			: `${a.plannedTime} Uhr`;
	}

	return (
		<table className='table-fixed w-full'>
			<thead>
				<tr className='border-b border-black/25 dark:border-white/25 text-left'>
					<th className='p-2'>Linie</th>
					<th className='p-2'>Richtung</th>
					<th className='p-2'>Abfahrt</th>
				</tr>
			</thead>
			<tbody>
				{data.length ? (
					data.map(a => (
						<tr className='border-b border-black/25 dark:border-white/25' key={a.tripId}>
							<td className='p-2'>{a.patternText}</td>
							<td className='p-2'>{a.direction}</td>
							<td className='p-2'>{formatDepartureTime(a)}</td>
						</tr>
					))
				) : (
					<tr className='border-b border-black/25 dark:border-white/25'>
						<td className='p-2'>Keine Daten</td>
						<td className='p-2'></td>
						<td className='p-2'></td>
					</tr>
				)}
			</tbody>
		</table>
	);
}
