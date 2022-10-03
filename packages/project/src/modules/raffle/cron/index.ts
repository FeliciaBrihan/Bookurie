var cron = require('node-cron');
import { Op } from 'sequelize';
import { sequelize } from '../../../global';
import { Models } from '../../../interface';

cron.schedule(' 0 0 1,15 * *', async () => {
	const { Raffle, User, Subscription, Book } =
		sequelize.models as unknown as Models;

	const users = await User.findAll();
	const eligibleUsers = [];

	for (const user of users) {
		if (user.subscriptionId) {
			const subscriptionId = user.subscriptionId;
			const subscription = await Subscription.findByPk(subscriptionId);

			if (subscription.type === 'premium') {
				eligibleUsers.push(user.id);
			}
		}
	}
	const winner =
		eligibleUsers[Math.floor(Math.random() * eligibleUsers.length)];

	const premiumSubscription = await Subscription.findOne({
		where: { type: 'premium' },
	});
	const prize = premiumSubscription.rafflePrize;

	if (prize === 'book') {
		const books = await Book.findAll({
			where: {
				typeFormat: 'printed',
				stock: {
					[Op.gt]: 0,
				},
			},
		});
		const book = books[Math.floor(Math.random() * books.length)];
		await book.update({ stock: book.stock - 1 });

		await Raffle.create({ prize: prize, BookId: book.id, UserId: winner });
	} else {
		const user = await User.findByPk(winner);
		await user.update({ budget: user.budget + +prize });

		await Raffle.create({ prize: prize, UserId: winner });
	}
});
