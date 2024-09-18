'use server';

import { API_BASE_URI } from '@/utils/api';
import moment from 'moment';

export async function getStopData({ stopId, routeId, direction }: { stopId: string; routeId?: string | null; direction?: string | null }): Promise<NormalizedKVGStops | undefined> {
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

		const data: KVGStops = await res.json();

		const normalizedActual: NormalizedActual[] = data.actual.map((actual) => {
			const actualMoment = actual.actualRelativeTime ? moment.unix(moment.now() / 1000 + actual.actualRelativeTime) : moment(actual.actualTime, ['HH:mm']);
			const plannedMoment = moment(actual.plannedTime, ['HH:mm']);

			return {
				actualDate: new Date(actualMoment.toDate()),
				plannedDate: new Date(plannedMoment.toDate()),
				patternText: actual.patternText,
				direction: actual.direction,
				routeId: actual.routeId,
				tripId: actual.tripId,
				vehicleId: actual.vehicleId,
			};
		});

		const normalizedKVGStops: NormalizedKVGStops = {
			actual: normalizedActual,
			directions: data.directions,
			generalAlerts: data.generalAlerts,
			routes: data.routes,
			stopName: data.stopName,
			stopShortName: data.stopShortName,
		};

		return normalizedKVGStops;
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
