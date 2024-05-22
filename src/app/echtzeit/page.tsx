import { API_BASE_URI } from '@/utils/api';
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

		return res.json();
	} catch (error) {
		console.error(error);
	}
}

export default async function Searchbar() {
	const stops: StopByCharacter[] = [];

	for (const letter of alphabet) {
		const result = await searchByCharacter(letter);
		if (!result) continue;
		stops.push(...result.stops);
	}

	return <Departures stops={stops} />;
}
