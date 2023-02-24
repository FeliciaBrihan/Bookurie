export function cancelSubscriptionRefund(
	subscriptionExpirationDate: Date,
	monthlyFee: number
) {
	const today = new Date();
	const timeDiff = subscriptionExpirationDate.getTime() - today.getTime();

	const daysUntilExpiration = Math.ceil(timeDiff / (1000 * 3600 * 24));

	const refundAmount = Math.ceil((monthlyFee / 30) * daysUntilExpiration);
	return refundAmount;
}
