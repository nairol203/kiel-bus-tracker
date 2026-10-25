export function parseTime(time?: string) {
	if (!time) return new Date(NaN);
	const [hours, minutes] = time.split(':').map(Number);
	const date = new Date();
	date.setHours(hours, minutes, 0, 0);
	return date;
}
