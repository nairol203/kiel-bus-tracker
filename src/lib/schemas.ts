import z from 'zod';

export type Stop = z.infer<typeof StopSchema>;
export type GeneralAlert = z.infer<typeof GeneralAlertSchema>;
export type RouteAlert = z.infer<typeof RouteAlertSchema>;
export type StopDepartures = z.infer<typeof StopPassageResponseSchema>;
export type TripPassages = z.infer<typeof TripPassageResponseSchema>;

export const StopSchema = z.object({
	category: z.literal(['bus', 'other']),
	id: z.string(),
	latitude: z.number(),
	longitude: z.number(),
	name: z.string(),
	shortName: z.string(),
});

export const StopResponseSchema = z.object({
	stops: z.array(StopSchema),
});

export const StopPassageSchema = z.object({
	actualRelativeTime: z.number(),
	actualTime: z.string().optional(),
	direction: z.string(),
	mixedTime: z.string(),
	passageid: z.string(),
	patternText: z.string(),
	plannedTime: z.string(),
	routeId: z.string(),
	status: z.string(),
	tripId: z.string(),
	vehicleId: z.string().optional(),
});

export const GeneralAlertSchema = z.object({
	title: z.string(),
});

export const RouteAlertSchema = z.object({
	direction: z.array(z.string()),
	directionId: z.string(),
	title: z.string(),
});

export const RouteSchema = z.object({
	alerts: z.array(RouteAlertSchema),
	authority: z.string(),
	directions: z.array(z.string()),
	id: z.string(),
	name: z.string(),
	routeType: z.string(),
	shortName: z.string(),
});

export const StopPassageResponseSchema = z.object({
	actual: z.array(StopPassageSchema),
	directions: z.array(z.any()),
	firstPassageTime: z.number(),
	generalAlerts: z.array(GeneralAlertSchema),
	lastPassageTime: z.number(),
	old: z.array(StopPassageSchema),
	routes: z.array(RouteSchema),
	stopName: z.string(),
	stopShortName: z.string(),
});

export const TripPassageStopSchema = z.object({
	id: z.string(),
	name: z.string(),
	shortName: z.string(),
});

export const TripPassageSchema = z.object({
	actualTime: z.string().optional(),
	plannedTime: z.string().optional(),
	status: z.literal(['STOPPING', 'PREDICTED', 'PLANNED']),
	stop: TripPassageStopSchema,
	stop_seq_num: z.string(),
});

export const PastTripPassageSchema = z.object({
	actualTime: z.string(),
	status: z.literal('DEPARTED'),
	stop: TripPassageStopSchema,
	stop_seq_num: z.string(),
});

export const TripPassageResponseSchema = z.object({
	actual: z.array(TripPassageSchema),
	directionText: z.string().optional(),
	old: z.array(PastTripPassageSchema),
	routeName: z.string().optional(),
});
