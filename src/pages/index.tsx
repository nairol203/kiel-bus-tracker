import { Placeholder } from '@components/styles/Core.styled';
import { trpc } from '@lib/trpc';
import { KVGStops } from 'src/types/stops';

export default function Home() {
	const homeStops = trpc.stop.useQuery({
		stop: '1312',
		routeId: '60835712076873740',
		direction: 'Albert-Schweitzer-Straße',
	});
	const schoolStops = trpc.stop.useQuery({
		stop: '1624',
		routeId: '60835712076873740',
		direction: 'Kroog%2C%20Am%20Wellsee',
	});

	if (!homeStops.data || !schoolStops.data) {
		return (
			<>
				<h2>Loading...</h2>
				<Placeholder height='90vh' />
			</>
		);
	}

	return (
		<>
			<h2>Zur Schule</h2>
			<KVGTable data={schoolStops.data} />
			<h2>Nach Hause</h2>
			<KVGTable data={homeStops.data} />
			<span>Letztes Update: {new Date().toLocaleTimeString()}</span>
			<Placeholder height='80vh' />
		</>
	);
}

function KVGTable({ data }: { data: KVGStops }) {
	return (
		<table>
			<thead>
				<tr>
					<th>Linie</th>
					<th>Richtung</th>
					<th>Abfahrt</th>
				</tr>
			</thead>
			<tbody>
				{data.actual?.map(a => (
					<tr key={a.actualRelativeTime}>
						<td>{a.patternText}</td>
						<td>{a.direction}</td>
						<td>{a.actualRelativeTime ? `${a.actualRelativeTime > 60 ? `${Math.round(a.actualRelativeTime / 60)} Minuten` : 'Sofort'} ` : `${a.plannedTime} Uhr`}</td>
					</tr>
				))}
			</tbody>
		</table>
	);
}
