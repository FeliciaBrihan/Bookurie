var cron = require('node-cron');
import { sequelize } from '../../../global';
import { getCurrentDate } from '../../../helpers/getCurrentDate';
import { Models } from '../../../interface';

cron.schedule('59 23 * * *', async () => {
	const { User, Subscription } = sequelize.models as unknown as Models;
	const today = getCurrentDate().date;

	const users = await User.findAll({
		where: sequelize.where(
			sequelize.fn('date', sequelize.col('subscriptionExpirationDate')),
			'=',
			today
		),
	});

	const newExpirationDate = new Date();
	newExpirationDate.setDate(newExpirationDate.getDate() + 30);

	for (const user of users) {
		if (user.subscriptionId) {
			const subscriptionId = user.subscriptionId;
			const subscription = await Subscription.findByPk(subscriptionId);

			if (user.budget > subscription.monthlyFee) {
				const updatedBudget = user.budget - subscription.monthlyFee;

				await user.update({
					budget: updatedBudget,
					booksReadThisMonth: 0,
					subscriptionExpirationDate: newExpirationDate,
				});
			} else {
				await user.update({
					subscriptionId: null,
					subscriptionDate: null,
					subscriptionExpirationDate: null,
					booksReadThisMonth: 0,
				});
			}
		}
	}
});
