export interface KVGStops {
	actual?: KVGStop[] | null;
	directions?: null[] | null;
	firstPassageTime: number;
	generalAlerts?: GeneralAlert[] | null;
	lastPassageTime: number;
	old?: Omit<KVGStop, 'actualTime'>[] | null;
	routes?: Route[] | null;
	stopName: string;
	stopShortName: string;
}

export interface KVGStop {
	actualRelativeTime: number;
	actualTime: string;
	direction: string;
	mixedTime: string;
	passageid: string;
	patternText: string;
	plannedTime: string;
	routeId: string;
	status: 'PREDICTED' | 'DEPARTED';
	tripId: string;
	vehicleId: string;
}

export interface GeneralAlert {
	title: string;
}

export interface Route {
	alerts?: null[] | null;
	authority: string;
	directions?: string[] | null;
	id: string;
	name: string;
	routeType: string;
	shortName: string;
}
