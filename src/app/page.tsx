import { Actual, KVGStops } from 'src/types/stops';

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
		headers: { 'Content-Type': 'application/json' },
	});

	const data = await res.json();

	return data as KVGStops;
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
				<h2>Zur Schule</h2>
				<h3>Rathaus Kronshagen</h3>
				<KVGTable data={rathausKronshagen} />
				<h3>Heischberg</h3>
				<KVGTable data={heischberg} />
			</div>
			<div className='grid gap-2'>
				<h2>Nach Hause</h2>
				<h3>Am Langsee</h3>
				<KVGTable data={amLangsee} />
				<h3>Preetzer Straße/Ostring</h3>
				<div>
					<KVGTable data={preetzerStraße71} />
					<KVGTable data={preetzerStraße72} withHead={false} />
				</div>
			</div>
			<span className='text-sm opacity-70'>Letztes Update: {new Date().toLocaleTimeString()}</span>
		</div>
	);
}

function KVGTable({ data, withHead = true }: { data: KVGStops; withHead?: boolean }) {
	function formatDepartureTime(a: Actual) {
		return a.actualRelativeTime
			? `${a.actualRelativeTime > 60 ? `${Math.round(a.actualRelativeTime / 60)} Minute${Math.round(a.actualRelativeTime / 60) !== 1 ? 'n' : ''} ` : 'Sofort'}`
			: `${a.plannedTime} Uhr`;
	}

	return (
		<table className='table-fixed w-full'>
			{withHead && (
				<thead>
					<tr>
						<th className='border-b border-black/25 dark:border-white/25 p-2 text-left'>Linie</th>
						<th className='border-b border-black/25 dark:border-white/25 p-2 text-left'>Richtung</th>
						<th className='border-b border-black/25 dark:border-white/25 p-2 text-left'>Abfahrt</th>
					</tr>
				</thead>
			)}
			<tbody>
				{data.actual.map(a => (
					<tr key={a.tripId}>
						<td className='border-b border-black/25 dark:border-white/25 p-2'>{a.patternText}</td>
						<td className='border-b border-black/25 dark:border-white/25 p-2'>{a.direction}</td>
						<td className='border-b border-black/25 dark:border-white/25 p-2'>{formatDepartureTime(a)}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
