export function getCurrentDate() {
	const date_ob = new Date();

	const year = date_ob.getFullYear();
	const month = date_ob.getMonth() + 1;
	const day = date_ob.getDate();
	const hour = date_ob.getHours();
	const minute = date_ob.getMinutes();
	const dayOfWeek = date_ob.getDay();
	const second = date_ob.getSeconds();
	const milliseconds = date_ob.getMilliseconds();

	const currentDate =
		year +
		'-' +
		('0' + month).slice(-2) +
		'-' +
		('0' + day).slice(-2) +
		' ' +
		('0' + hour).slice(-2) +
		':' +
		('0' + minute).slice(-2) +
		':' +
		('0' + second).slice(-2);
	const date =
		year + '-' + ('0' + month).slice(-2) + '-' + ('0' + day).slice(-2);
	const time =
		('0' + hour).slice(-2) +
		':' +
		('0' + minute).slice(-2) +
		':' +
		('0' + second).slice(-2);
	return {
		currentDate: currentDate,
		date: date,
		time: time,
		dateObject: {
			year: year,
			day: day,
			month: month,
			hour: hour,
			minute: minute,
			second: second,
			dayOfWeek: dayOfWeek,
		},
		milliseconds: milliseconds,
	};
}
