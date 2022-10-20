export function calculateFinalPrice(discount: number, price: number) {
	return Math.round(price - price * (discount / 100));
}
