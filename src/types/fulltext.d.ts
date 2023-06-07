interface AutocompleteResponse {
	results: AutocompleteStop[];
}

interface AutocompleteStop {
	stop: string;
	stopPassengerName: string;
}
