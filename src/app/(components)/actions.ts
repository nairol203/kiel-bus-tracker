'use server';

export async function getAutocompleteData(query: string) {
	const endpoint = new URL('https://www.kvg-kiel.de/internetservice/services/lookup/fulltext');

	endpoint.searchParams.append('search', query);

	const res = await fetch(endpoint.toString(), {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		cache: 'no-store',
	});

	const data = (await res.json()) as AutocompleteResponse;
	return data.results.slice(0, 10);
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
