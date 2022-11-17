export interface KVGRoutes {
	routes: Route[];
}

export interface Route {
	alerts: [];
	authority: string;
	directions?: string[] | null;
	id: string;
	name: string;
	shortName: string;
}
