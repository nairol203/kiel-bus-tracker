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
	plannedTime: string;
	status: 'STOPPING' | 'PREDICTED' | 'PLANNED';
	stop: Stop;
	stop_seq_num: string;
}

interface NormalizedStopInfoActual {
	actualDate: Date;
	plannedDate: Date;
	status: 'STOPPING' | 'PREDICTED' | 'PLANNED';
	stop: Stop;
	stopSequenceNumber: string;
}

interface OldStopInfo {
	actualTime?: string;
	plannedTime?: string;
	status: 'DEPARTED';
	stop: Stop;
	stop_seq_num: string;
}

interface NormalizedOldStopInfo {
	actualDate?: Date;
	plannedDate?: Date;
	status: 'DEPARTED';
	stop: Stop;
	stopSequenceNumber: string;
}

interface Stop {
	id: string;
	name: string;
	shortName: string;
}
