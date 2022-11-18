export interface KVGRoutes {
	routes: KVGRoute[];
}

export interface KVGRoute {
	alerts: any[];
	authority: Authority;
	directions?: string[];
	id: string;
	name: string;
	shortName: string;
}

enum Authority {
	DatendrehscheibeLvs = 'DATENDREHSCHEIBE LVS',
	Kvg = 'KVG',
}
