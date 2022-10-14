import { ModelUser } from '../../../../interface';

export async function cancelSubscription(user: ModelUser) {
	await user.update({
		subscriptionId: null,
		subscriptionExpirationDate: null,
		booksReadThisMonth: 0,
	});
}
