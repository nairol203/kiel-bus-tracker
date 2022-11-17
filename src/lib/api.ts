import axios from 'axios';
import { KVGRoutes } from 'src/types/routes';
import { KVGStops } from 'src/types/stops';

export const API_ENDPOINT = 'https://www.kvg-kiel.de/internetservice/services';

export async function getRoutes() {
	try {
		const { data } = await axios(`${API_ENDPOINT}/routeInfo/route`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});

		return data as KVGRoutes;
	} catch (error) {
		console.error(error);
	}
}

export async function getStops(stop: string, routeId: string, direction?: string) {
	try {
		const { data } = await axios(`${process.env.VERCEL_URL ?? 'http://localhost:3000'}/api/stop?stop=${stop}&routeId=${routeId}&direction=${direction}`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});

		return data as KVGStops;
	} catch (error) {
		console.error(error);
	}
}
