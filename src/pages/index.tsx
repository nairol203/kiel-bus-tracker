import { trpc } from '@lib/trpc';
import { Container, Flex, Group, Table, Text, Title } from '@mantine/core';
import { KVGStops } from 'src/types/stops';

export default function Home() {
	const toHome = trpc.stop.useQuery(
		{
			stop: '1312',
			routeId: '60835712076873740',
			direction: 'Albert-Schweitzer-Straße',
		},
		{
			refetchInterval: 10000,
		}
	);
	const toSchool = trpc.stop.useQuery(
		{
			stop: '1624',
			routeId: '60835712076873740',
			direction: 'Am%20Wellsee',
		},
		{
			refetchInterval: 10000,
		}
	);

	return (
		<Container mt='lg'>
			<Title order={1}>Nairol Bus Tracker</Title>
			<Flex direction={'column'} gap={8} mt='lg'>
				<Title order={2}>Zur Schule</Title>
				{toSchool.data ? <KVGTable data={toSchool.data} /> : <Text>No Data</Text>}
				<Title order={2}>Nach Hause</Title>
				{toHome.data ? <KVGTable data={toHome.data} /> : <Text>No Data</Text>}
				<Text>Letztes Update: {new Date().toLocaleTimeString()}</Text>
			</Flex>
		</Container>
	);
}

function KVGTable({ data }: { data: KVGStops }) {
	console.log(data);
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
