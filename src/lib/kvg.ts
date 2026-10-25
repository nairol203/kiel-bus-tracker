'use server';

export async function getAllStops(): Promise<StopByCharacter[]> {
	const endpoint = new URL('https://kvg-internetservice-proxy.p.networkteam.com/internetservice/services/lookup/stopsByCharacter');
	const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

	const fetchPromises = characters.map(async (char) => {
		endpoint.searchParams.set('character', char);
		const res = await fetch(
			endpoint.toString(),
			{ next: { revalidate: 86400 } }, // Cache the result for 24 hours
		);
		if (!res.ok) return [];
		const data: StopsByCharacter = await res.json();
		return data.stops;
	});

	const results = await Promise.all(fetchPromises);
	const allStops = results.flat();

	return allStops;
}

export async function getStopData({ stopId, routeId, direction }: { stopId: string; routeId?: string | null; direction?: string | null }): Promise<KVGStops | undefined> {
	const endpoint = new URL('https://kvg-internetservice-proxy.p.networkteam.com/internetservice/services/passageInfo/stopPassages/stop');

	endpoint.searchParams.append('stop', stopId);
	endpoint.searchParams.append('mode', 'departure');

	if (routeId) endpoint.searchParams.append('routeId', routeId);
	if (direction) endpoint.searchParams.append('direction', direction);

	try {
		const res = await fetch(endpoint.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'no-store',
		});

		if (!res.ok) {
			console.error(await res.text().catch(() => 'res.text() failed'));
			throw new Error(`Request for ${res.url} failed with status code ${res.status} ${res.statusText}`);
		}

		const data: KVGStops = await res.json();

		return data;
	} catch (error) {
		console.error(error);
	}
}

export async function getTripInfo(tripId: string): Promise<StopInfo | undefined> {
	try {
		const res = await fetch(`https://kvg-internetservice-proxy.p.networkteam.com/internetservice/services/tripInfo/tripPassages?tripId=${tripId}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'no-store',
		});

		if (!res.ok) {
			console.error(await res.text().catch(() => 'res.text() failed'));
			throw new Error(`Request for ${res.url} failed with status code ${res.status} ${res.statusText}`);
		}

		const data: StopInfo = await res.json();

		return data;
	} catch (error) {
		console.error(error);
	}
}
