import Realtime from './Realtime';

export const config = {
	runtime: 'edge',
};

const ONE_DAY_IN_SECONDS = 86_400;

const alphabet = Array.from({ length: 26 }, (_, i) => String.fromCharCode(65 + i));

async function searchByCharacter(character: string): Promise<StopsByCharacter> {
	const endpoint = new URL('https://www.kvg-kiel.de/internetservice/services/lookup/stopsByCharacter');

	endpoint.searchParams.append('character', character);

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
}

export default async function Fahrplan() {
	const stops: StopByCharacter[] = [];

	for (const letter of alphabet) {
		const result = await searchByCharacter(letter);
		stops.push(...result.stops);
	}

	return <Realtime allStops={stops} />;
}
