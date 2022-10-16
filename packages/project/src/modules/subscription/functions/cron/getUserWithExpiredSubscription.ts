import { Op } from 'sequelize';
import { sequelize } from '../../../../global';
import { Models } from '../../../../interface';
import { getTomorrow, getYesterday } from '../helpers';

export async function getUserWithExpiredSubscription() {
	const { User } = sequelize.models as unknown as Models;
	const yesterday = getYesterday();
	const tomorrow = getTomorrow();

	return await User.findAll({
		where: {
			subscriptionExpirationDate: {
				[Op.gt]: yesterday,
				[Op.lt]: tomorrow,
			},
		},
	});
}
