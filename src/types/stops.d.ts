interface KVGStops {
	actual: Actual[];
	directions: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
	firstPassageTime: number;
	generalAlerts: GeneralAlert[];
	lastPassageTime: number;
	old: Actual[];
	routes: Route[];
	stopName: string;
	stopShortName: string;
}

interface Actual {
	actualRelativeTime: number;
	actualTime?: string;
	direction: string;
	mixedTime: string;
	passageid: string;
	patternText: string;
	plannedTime: string;
	routeId: string;
	status: string;
	tripId: string;
	vehicleId: string;
}

interface NormalizedKVGStops {
	actual: NormalizedActual[];
	directions: any[]; // eslint-disable-line @typescript-eslint/no-explicit-any
	generalAlerts: GeneralAlert[];
	routes: Route[];
	stopName: string;
	stopShortName: string;
}

interface NormalizedActual {
	plannedDate: Date;
	actualDate: Date;
	actualRelativeTime: number;
	patternText: string;
	direction: string;
	routeId: string;
	tripId: string;
	vehicleId: string;
}

interface GeneralAlert {
	title: string;
}

interface Route {
	alerts: RouteAlert[];
	authority: string;
	directions: string[];
	id: string;
	name: string;
	routeType: string;
	shortName: string;
}

interface RouteAlert {
	direction: string[];
	directionId: string;
	title: string;
}
