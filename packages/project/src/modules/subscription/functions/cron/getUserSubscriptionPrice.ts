import { sequelize } from 'src/global';
import { Models } from 'src/interface';

export async function getUserSubscriptionPrice(id: number) {
	const { Subscription } = sequelize.models as unknown as Models;
	return (
		await Subscription.findByPk(id, {
			attributes: ['monthlyFee'],
		})
	).monthlyFee;
}
