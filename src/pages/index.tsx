import { trpc } from '@lib/trpc';
import { Container, Group, Table, Text, Title } from '@mantine/core';
import { KVGStops } from 'src/types/stops';

export default function Home() {
	const homeStops = trpc.stop.useQuery(
		{
			stop: '1312',
			routeId: '60835712076873740',
			direction: 'Albert-Schweitzer-Straße',
		},
		{
			refetchInterval: 10000,
		}
	);
	const schoolStops = trpc.stop.useQuery(
		{
			stop: '1624',
			routeId: '60835712076873740',
			direction: 'Kroog%2C%20Am%20Wellsee',
		},
		{
			refetchInterval: 10000,
		}
	);

	return (
		<Container mt='lg'>
			<Title order={1}>Nairol Bus Tracker</Title>
			<Group mt='lg'>
				<Title order={2}>Zur Schule</Title>
				{schoolStops.data && <KVGTable data={schoolStops.data} />}
				<Title order={2}>Nach Hause</Title>
				{homeStops.data && <KVGTable data={homeStops.data} />}
				<Text>Letztes Update: {new Date().toLocaleTimeString()}</Text>
			</Group>
		</Container>
	);
}

function KVGTable({ data }: { data: KVGStops }) {
	return (
		<Table>
			<thead>
				<tr>
					<th>Linie</th>
					<th>Richtung</th>
					<th>Abfahrt</th>
				</tr>
			</thead>
			<tbody>
				{data.actual?.map(a => (
					<tr key={a.vehicleId}>
						<td>{a.patternText}</td>
						<td>{a.direction}</td>
						<td>
							{a.actualRelativeTime
								? `${
										a.actualRelativeTime > 60
											? `${Math.round(a.actualRelativeTime / 60)} Minute${Math.round(a.actualRelativeTime / 60) !== 1 ? 'n' : ''} `
											: 'Sofort'
								  } `
								: `${a.plannedTime} Uhr`}
						</td>
					</tr>
				))}
			</tbody>
		</Table>
	);
}
