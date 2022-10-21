import { ModelUser } from 'src/interface';
import { getNewExpirationDate } from 'src/modules/subscription/functions/helpers';

export async function renewSubscription(user: ModelUser, price: number) {
	const newExpirationDate = getNewExpirationDate();

	await user.update({
		budget: user.budget - price,
		booksReadThisMonth: 0,
		subscriptionExpirationDate: newExpirationDate,
	});
}
