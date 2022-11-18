import axios from 'axios';
import { KVGFullText } from 'src/types/fulltext';
import { KVGTripPassages } from 'src/types/passages';
import { KVGRoutes } from 'src/types/routes';
import { KVGStops } from 'src/types/stops';
import { z } from 'zod';
import { procedure, router } from '../trpc';

export const API_ENDPOINT = 'https://www.kvg-kiel.de/internetservice/services';

export const appRouter = router({
	route: procedure.query(async () => {
		const { data } = await axios(`${API_ENDPOINT}/routeInfo/route`, {
			method: 'GET',
			headers: { 'Content-Type': 'application/json' },
		});

		return data as KVGRoutes;
	}),
	stop: procedure
		.input(
			z.object({
				stop: z.string(),
				routeId: z.string(),
				direction: z.optional(z.string()),
			})
		)
		.query(async ({ input }) => {
			const { stop, routeId, direction } = input;
			const { data } = await axios(`${API_ENDPOINT}/passageInfo/stopPassages/stop?stop=${stop}&routeId=${routeId}${direction && `&direction=${direction}`}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});

			return data as KVGStops;
		}),
	tripPassages: procedure
		.input(
			z.object({
				tripId: z.string(),
				vehicleId: z.string(),
			})
		)
		.query(async ({ input }) => {
			const { data } = await axios(`${API_ENDPOINT}/tripInfo/tripPassages?tripId=${input.tripId}&vehicleId=${input.vehicleId}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});

			return data as KVGTripPassages;
		}),
	autocomplete: procedure
		.input(
			z.object({
				query: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			const { data } = await axios(`${API_ENDPOINT}/lookup/autocomplete?query=${input.query}&language=de`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});

			return data as string;
		}),
	textSearch: procedure
		.input(
			z.object({
				search: z.string(),
			})
		)
		.mutation(async ({ input }) => {
			const { data } = await axios(`${API_ENDPOINT}/lookup/fulltext?search=${input.search}`, {
				method: 'GET',
				headers: { 'Content-Type': 'application/json' },
			});

			return data as KVGFullText;
		}),
});

// export type definition of API
export type AppRouter = typeof appRouter;
