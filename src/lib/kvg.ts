import { StopPassageResponseSchema, StopResponseSchema, TripPassageResponseSchema } from './schemas';

const BASE_URL = 'https://kvg-internetservice-proxy.p.networkteam.com';

export async function getStops() {
	const endpoint = new URL('/internetservice/geoserviceDispatcher/services/stopinfo/stops', BASE_URL);

	endpoint.searchParams.set('top', '324000000');
	endpoint.searchParams.set('bottom', '-324000000');
	endpoint.searchParams.set('left', '-648000000');
	endpoint.searchParams.set('right', '648000000');

	const res = await fetch(endpoint.toString(), {
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
	const endpoint = new URL('/internetservice/services/passageInfo/stopPassages/stop', BASE_URL);

	endpoint.searchParams.set('stop', stopId);
	if (direction) endpoint.searchParams.set('direction', direction);
	if (routeId) endpoint.searchParams.set('routeId', routeId);

	const res = await fetch(endpoint.toString());

	if (!res.ok) {
		console.error(await res.text().catch(() => 'res.text() failed'));
		throw new Error(`Request for ${res.url} failed with status code ${res.status} ${res.statusText}`);
	}

	const data = await res.json();

	const parsed = StopPassageResponseSchema.parse(data);

	return parsed;
}

export async function getTripPassages(tripId: string) {
	const endpoint = new URL('/internetservice/services/tripInfo/tripPassages', BASE_URL);

	endpoint.searchParams.set('tripId', tripId);

	const res = await fetch(endpoint.toString());

	if (!res.ok) {
		console.error(await res.text().catch(() => 'res.text() failed'));
		throw new Error(`Request for ${res.url} failed with status code ${res.status} ${res.statusText}`);
	}

	const data = await res.json();

	const parsed = TripPassageResponseSchema.parse(data);

	return parsed;
}
