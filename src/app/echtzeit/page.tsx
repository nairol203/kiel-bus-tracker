import { API_BASE_URI } from '@/utils/api';
import { Metadata, ResolvingMetadata } from 'next';
import { getStopData } from '../(components)/actions';
import Departures from './Departures';

const ONE_DAY_IN_SECONDS = 86_400;

const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

async function searchByCharacter(character: string): Promise<StopsByCharacter | undefined> {
	const endpoint = new URL(`${API_BASE_URI}/internetservice/services/lookup/stopsByCharacter`);

	endpoint.searchParams.append('character', character);

	try {
		const res = await fetch(endpoint.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			next: {
				revalidate: ONE_DAY_IN_SECONDS,
			},
		});

		if (!res.ok) {
			console.log(await res.text().catch(() => 'res.text() failed'));
			throw new Error(`Request for ${res.url} failed with status code ${res.status} ${res.statusText}`);
		}

		return res.json();
	} catch (error) {
		console.error(error);
	}
}

type Props = {
	params: {};
	searchParams: { stop?: string; routeId?: string; direction?: string };
};

export async function generateMetadata({ params, searchParams }: Props, parent: ResolvingMetadata): Promise<Metadata> {
	const { direction, routeId, stop: stopId } = searchParams;

	if (!stopId) {
		return {};
	}

	const data = await getStopData({ stopId, direction, routeId });

	return {
		title: `${data ? `${data.stopName} | KVG Bus Tracker` : 'KVG Bus Tracker'}`,
	};
}

export default async function Searchbar({ params, searchParams }: Props) {
	const stops: StopByCharacter[] = [];

	for (const letter of alphabet) {
		const result = await searchByCharacter(letter);
		if (!result) continue;
		stops.push(...result.stops);
	}

	return <Departures stops={stops} />;
}
