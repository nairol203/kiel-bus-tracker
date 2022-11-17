import { Container, Table, Text, Title } from '@mantine/core';
import { Group, Placeholder } from '@components/styles/Core.styled';
import { getStops } from '@lib/api';
import { useEffect, useState } from 'react';
import { KVGStops } from 'src/types/stops';
import { GetServerSideProps } from 'next';

export default function Home({ initialHomeData, initialSchoolData }: { initialHomeData: KVGStops; initialSchoolData: KVGStops }) {
	const [homeData, setHomeData] = useState(initialHomeData);
	const [schoolData, setSchoolData] = useState(initialSchoolData);

	useEffect(() => {
		const fetchData = async () => {
			const home = await getStops('1624', '60835712076873740', 'Kroog%2C%20Am%20Wellsee');
			const school = await getStops('1312', '60835712076873740', 'Albert-Schweitzer-Straße');
			return { home, school };
		};

		const interval = setInterval(async () => {
			const { home, school } = await fetchData();
			home && setHomeData(home);
			school && setSchoolData(school);
		}, 5000);

		return () => clearInterval(interval);
	}, []);

	return (
		<Container pt='lg'>
			<Group>
				<Title order={3}>Zur Schule</Title>
				<KVGTable data={homeData} />
				<Title order={3}>Nach Hause</Title>
				<KVGTable data={schoolData} />
				<Text>Letztes Update: {new Date().toLocaleTimeString()}</Text>
			</Group>
			<Placeholder height='70vh' />
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
					<tr key={a.actualRelativeTime}>
						<td>{a.patternText}</td>
						<td>{a.direction}</td>
						<td>{a.actualRelativeTime ? `${a.actualRelativeTime > 60 ? `${Math.round(a.actualRelativeTime / 60)} Minuten` : 'Sofort'} ` : `${a.plannedTime} Uhr`}</td>
					</tr>
				)) ?? (
					<tr>
						<td>Nichts in nächster Zeit</td>
						<td></td>
						<td></td>
					</tr>
				)}
			</tbody>
		</Table>
	);
}

export const getServerSideProps: GetServerSideProps = async () => {
	const home = await getStops('1624', '60835712076873740', 'Kroog%2C%20Am%20Wellsee');
	const school = await getStops('1312', '60835712076873740', 'Albert-Schweitzer-Straße');

	return {
		props: {
			initialHomeData: JSON.parse(JSON.stringify(home)),
			initialSchoolData: JSON.parse(JSON.stringify(school)),
		},
	};
};

/**
 * Stop Rathaus Kronshagen: 1624
 * Stop Heischberg: 1317
 * Am Langsee: 1312
 *
 * Linie 34: 60835712076873740 Direction: Albert-Schweitzer-Straße | Kroog%2C%20Am%20Wellsee
 * Linie 71: 60835712076873750 Direction: Kronshagen%2C%20Schulzentrum
 * Linie 72: 60835712076873751 Direction: Kronshagen%2C%20Schulzentrum
 */
