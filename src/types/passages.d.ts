export interface KVGTripPassages {
	actual: Actual[];
	directionText: string;
	old: Actual[];
	routeName: string;
}

interface Actual {
	actualTime: string;
	status: Status;
	stop: Stop;
	stop_seq_num: string;
}

enum Status {
	Departed = 'DEPARTED',
	Predicted = 'PREDICTED',
}

interface Stop {
	id: string;
	name: string;
	shortName: string;
}
