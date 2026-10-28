'use server';

import { StopPassageResponseSchema, StopResponseSchema, TripPassageResponseSchema } from './schemas';

const BASE_URL = 'https://kvg-internetservice-proxy.p.networkteam.com';

export async function getStops() {
	const res = await fetch(`${BASE_URL}/internetservice/geoserviceDispatcher/services/stopinfo/stops?top=324000000&bottom=-324000000&left=-648000000&right=648000000`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
		next: { revalidate: 86400 },
	});

	if (!res.ok) {
		console.error(await res.text().catch(() => 'res.text() failed'));
		throw new Error(`Request for ${res.url} failed with status code ${res.status} ${res.statusText}`);
	}

	const data = await res.json();

	const parsed = StopResponseSchema.parse(data);

	return parsed.stops;
}

export async function getStopDepartures({ stopId, routeId, direction }: { stopId: string; routeId?: string | null; direction?: string | null }) {
	const endpoint = new URL(`${BASE_URL}/internetservice/services/passageInfo/stopPassages/stop`);

	endpoint.searchParams.append('stop', stopId);
	endpoint.searchParams.append('mode', 'departure');

	if (routeId) endpoint.searchParams.append('routeId', routeId);
	if (direction) endpoint.searchParams.append('direction', direction);

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

	const data = await res.json();

	const parsed = StopPassageResponseSchema.parse(data);

	return parsed;
}

export async function getTripPassages(tripId: string) {
	const res = await fetch(`${BASE_URL}/internetservice/services/tripInfo/tripPassages?tripId=${tripId}`, {
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

	const data = await res.json();

	const parsed = TripPassageResponseSchema.parse(data);

	return parsed;
}
