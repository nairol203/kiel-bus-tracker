import z from 'zod';

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

export const DepartureSchema = z.object({
	actualRelativeTime: z.number(),
	acutalTime: z.string().optional(),
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

export const DepartureResponseSchema = z.object({
	actual: z.array(DepartureSchema),
	directions: z.array(z.any()),
	firstPassageTime: z.number(),
	generalAlerts: z.array(GeneralAlertSchema),
	lastPassageTime: z.number(),
	old: z.array(DepartureSchema),
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

export const OldTripPassageSchema = z.object({
	actualTime: z.string(),
	status: z.literal('DEPARTED'),
	stop: TripPassageStopSchema,
	stop_seq_num: z.string(),
});

export const TripPassageResponseSchema = z.object({
	actual: z.array(TripPassageSchema),
	directionText: z.string(),
	old: z.array(OldTripPassageSchema),
	routeName: z.string(),
});
