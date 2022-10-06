var cron = require('node-cron');
import { Op } from 'sequelize';
import { sequelize } from '../../../global';
import { Models } from '../../../interface';

cron.schedule(' 0 0 1,15 * *', async () => {
	const { Raffle, User, Prize, Book } = sequelize.models as unknown as Models;

	const users = await User.findAll({ where: { subscriptionId: 2 } });

	const winner = users[Math.floor(Math.random() * users.length)];

	const prize = await Prize.findOne();

	if (prize.bookId && !prize.voucher) {
		const book = await Book.findByPk(prize.bookId);
		if (book.typeFormat === 'printed' && book.stock > 0) {
			await book.update({ stock: book.stock - 1 });
		}
		await Raffle.create({ BookId: book.id, UserId: winner.id });
	} else if (prize.voucher && !prize.bookId) {
		await winner.update({ budget: winner.budget + prize.voucher });

		await Raffle.create({ prize: prize.voucher, UserId: winner.id });
	} else if (prize.bookId && prize.voucher) {
		const book = await Book.findByPk(prize.bookId);
		if (book.typeFormat === 'printed' && book.stock > 0) {
			await book.update({ stock: book.stock - 1 });
			await winner.update({ budget: winner.budget + prize.voucher });

			await Raffle.create({
				prize: prize.voucher,
				BookId: book.id,
				UserId: winner.id,
			});
		}
	}
});
