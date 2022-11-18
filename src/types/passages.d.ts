export interface KVGTripPassages {
	actual: Actual[];
	directionText: string;
	old: Actual[];
	routeName: string;
}

export interface Actual {
	actualTime: string;
	status: Status;
	stop: Stop;
	stop_seq_num: string;
}

export enum Status {
	Departed = 'DEPARTED',
	Predicted = 'PREDICTED',
}

export interface Stop {
	id: string;
	name: string;
	shortName: string;
}
