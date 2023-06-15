'use server';

export async function searchByCharacter(character: string) {
	const endpoint = new URL('https://www.kvg-kiel.de/internetservice/services/lookup/stopsByCharacter');

	endpoint.searchParams.append('character', character);

	const res = await fetch(endpoint.toString(), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		next: {
			revalidate: 3600,
		},
	});

	const data = await res.json();
	return data as StopsByCharacter;
}

export async function getStopData({ stopId, routeId, direction }: { stopId: string; routeId?: string; direction?: string }) {
	const endpoint = new URL('https://www.kvg-kiel.de/internetservice/services/passageInfo/stopPassages/stop');

	endpoint.searchParams.append('stop', stopId);
	endpoint.searchParams.append('mode', 'departure');

	if (routeId) {
		endpoint.searchParams.append('routeId', routeId);
	}

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

export async function getTripInfo(tripId: string) {
	const endpoint = new URL('https://kvg-kiel.de/internetservice/services/tripInfo/tripPassages');

	endpoint.searchParams.append('tripId', tripId);

	const res = await fetch(endpoint.toString(), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-store',
	});

	const data = await res.json();
	return data as StopInfo;
}
