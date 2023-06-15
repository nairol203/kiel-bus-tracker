interface StopInfo {
	actual: StopInfoActual[];
	directionText: string;
	old: OldStopInfo[];
	routeName: string;
}

interface StopInfoActual {
	actualTime: string;
	status: 'STOPPING' | 'PLANNED';
	stop: Stop;
	stop_seq_num: string;
}

interface OldStopInfo {
	actualTime: string;
	status: 'DEPARTED';
	stop: Stop;
	stop_seq_num: string;
}

interface Stop {
	id: string;
	name: string;
	shortName: string;
}
