interface StopInfo {
	actual: StopInfoActual[];
	directionText: string;
	old: OldStopInfo[];
	routeName: string;
}

interface NormalizedStopInfo {
	actual: NormalizedStopInfoActual[];
	directionText: string;
	old: NormalizedOldStopInfo[];
	routeName: string;
}

interface StopInfoActual {
	actualTime: string;
	status: 'STOPPING' | 'PREDICTED' | 'PLANNED';
	stop: Stop;
	stop_seq_num: string;
}

interface NormalizedStopInfoActual {
	actualDate: Date;
	status: 'STOPPING' | 'PREDICTED' | 'PLANNED';
	stop: Stop;
	stopSequenceNumber: number;
}

interface OldStopInfo {
	actualTime: string;
	status: 'DEPARTED';
	stop: Stop;
	stop_seq_num: string;
}

interface NormalizedOldStopInfo {
	actualDate?: Date;
	plannedDate?: Date;
	status: 'DEPARTED';
	stop: Stop;
	stopSequenceNumber: number;
}

interface Stop {
	id: string;
	name: string;
	shortName: string;
}
