export function getPriceWithDiscount(price: number, discount: number) {
	return Math.round(price - price * (discount / 100));
}
