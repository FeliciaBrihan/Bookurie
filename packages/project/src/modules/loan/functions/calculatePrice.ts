export function calculatePrice(price: number, discount: number) {
	return Math.round(price - price * discount);
}
