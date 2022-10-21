import { Op } from 'sequelize';
import { sequelize } from 'src/global';
import { Models } from 'src/interface';
import {
	getTomorrow,
	getYesterday,
} from 'src/modules/subscription/functions/helpers';

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
