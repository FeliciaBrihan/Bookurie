import { ModelUser } from '../../../../interface';
import { getNewExpirationDate } from '../helpers';

export async function renewSubscription(user: ModelUser, price: number) {
	const newExpirationDate = getNewExpirationDate();

	await user.update({
		budget: user.budget - price,
		booksReadThisMonth: 0,
		subscriptionExpirationDate: newExpirationDate,
	});
}
