export function getYesterday() {
	const date = new Date();
	date.setDate(date.getDate() - 1);
	date.setHours(23);
	date.setMinutes(59);
	date.setSeconds(59);
	date.setMilliseconds(99);
	return date;
}
