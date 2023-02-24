export function calculateLoanExpirationDate(days: number) {
	const date = new Date();
	return date.setDate(date.getDate() + days) as unknown as Date;
}
