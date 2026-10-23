'use server';

import { API_BASE_URI } from '@/utils/api';

const parseTime = (timeStr?: string): Date => {
	if (!timeStr) return new Date(NaN);
	const [hours, minutes] = timeStr.split(':').map(Number);
	const date = new Date();
	date.setHours(hours, minutes, 0, 0);
	return date;
};

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

		if (!res.ok) {
			console.log(await res.text().catch(() => 'res.text() failed'));
			throw new Error(`Request for ${res.url} failed with status code ${res.status} ${res.statusText}`);
		}

		const data: KVGStops = await res.json();

		const normalizedActual: NormalizedActual[] = data.actual.map((actual) => {
			const actualDate = actual.actualRelativeTime ? new Date(Date.now() + actual.actualRelativeTime * 1000) : parseTime(actual.actualTime);

			return {
				plannedDate: parseTime(actual.plannedTime),
				actualDate,
				actualRelativeTime: actual.actualRelativeTime,
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

export async function getTripInfo(tripId: string): Promise<NormalizedStopInfo | undefined> {
	const endpoint = new URL(`${API_BASE_URI}/internetservice/services/tripInfo/tripPassages`);

	if (!tripId) {
		throw new Error(`getTripInfo(): No tripId provided but required.`);
	}

	endpoint.searchParams.append('tripId', tripId);

	try {
		const res = await fetch(endpoint.toString(), {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
			cache: 'no-store',
		});

		if (!res.ok) {
			console.log(await res.text().catch(() => 'res.text() failed'));
			throw new Error(`Request for ${res.url} failed with status code ${res.status} ${res.statusText}`);
		}

		const data: StopInfo = await res.json();

		const normalizedActual: NormalizedStopInfoActual[] = data.actual.map((actual) => ({
			actualDate: parseTime(actual.actualTime),
			status: actual.status,
			stop: actual.stop,
			stopSequenceNumber: +actual.stop_seq_num,
		}));

		const normalizedOld: NormalizedOldStopInfo[] = data.old.map((actual) => {
			const data: NormalizedOldStopInfo = {
				status: actual.status,
				stop: actual.stop,
				stopSequenceNumber: +actual.stop_seq_num,
			};

			if (actual.actualTime) data.actualDate = parseTime(actual.actualTime);

			return data;
		});

		const normalizedStopInfo: NormalizedStopInfo = {
			actual: normalizedActual,
			directionText: data.directionText,
			old: normalizedOld,
			routeName: data.routeName,
		};

		return normalizedStopInfo;
	} catch (error) {
		console.error(error);
	}
}
