export interface KVGRoutes {
	routes: Route[];
}

export interface KVGRoute {
	alerts: any[];
	authority: Authority;
	directions?: string[];
	id: string;
	name: string;
	shortName: string;
}

export enum Authority {
	DatendrehscheibeLvs = 'DATENDREHSCHEIBE LVS',
	Kvg = 'KVG',
}
