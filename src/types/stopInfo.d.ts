interface StopInfo {
	actual: StopInfoActual[];
	directionText: string;
	old: OldStopInfo[];
	routeName: string;
}

interface StopInfoActual {
	actualTime: string;
	plannedTime: string;
	status: 'STOPPING' | 'PREDICTED' | 'PLANNED';
	stop: Stop;
	stop_seq_num: string;
}

interface OldStopInfo {
	actualTime?: string;
	plannedTime?: string;
	status: 'DEPARTED';
	stop: Stop;
	stop_seq_num: string;
}

interface Stop {
	id: string;
	name: string;
	shortName: string;
}
