import { schedule } from 'node-cron';
import {
	cancelSubscription,
	getUserSubscriptionPrice,
	getUserWithExpiredSubscription,
	renewSubscription,
} from 'src/modules/subscription/functions';

schedule('59 23 * * *', async () => {
	const users = await getUserWithExpiredSubscription();

	for (const user of users) {
		const { subscriptionId } = user;
		const price = await getUserSubscriptionPrice(subscriptionId);

		if (user.budget >= price) await renewSubscription(user, price);
		else await cancelSubscription(user);
	}
});
