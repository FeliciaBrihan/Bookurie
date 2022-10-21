export function calculateLoanDuration(days: number, pages: number) {
	return Math.round((pages / 100) * days);
}
