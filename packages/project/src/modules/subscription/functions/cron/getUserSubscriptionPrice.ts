import { sequelize } from '../../../../global';
import { Models } from '../../../../interface';

export async function getUserSubscriptionPrice(id: number) {
	const { Subscription } = sequelize.models as unknown as Models;
	return (
		await Subscription.findByPk(id, {
			attributes: ['monthlyFee'],
		})
	).monthlyFee;
}
