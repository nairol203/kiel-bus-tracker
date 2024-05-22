'use server';

import { API_BASE_URI } from '@/utils/api';

export async function getStopData({ stopId, routeId, direction }: { stopId: string; routeId?: string | null; direction?: string | null }): Promise<KVGStops | undefined> {
	const endpoint = new URL(`${API_BASE_URI}/internetservice/services/passageInfo/stopPassages/stop`);

	endpoint.searchParams.append('stop', stopId);
	endpoint.searchParams.append('mode', 'departure');

	if (routeId) {
		endpoint.searchParams.append('routeId', routeId);
	}

	if (direction) {
		endpoint.searchParams.append('direction', direction);
	}

	try {
		const res = await fetch(endpoint.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'no-store',
		});

		return res.json();
	} catch (error) {
		console.error(error);
	}
}

export async function getTripInfo(tripId: string): Promise<StopInfo | undefined> {
	const endpoint = new URL(`${API_BASE_URI}/internetservice/services/tripInfo/tripPassages`);

	endpoint.searchParams.append('tripId', tripId);

	try {
		const res = await fetch(endpoint.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'no-store',
		});

		return res.json();
	} catch (error) {
		console.error(error);
	}
}
