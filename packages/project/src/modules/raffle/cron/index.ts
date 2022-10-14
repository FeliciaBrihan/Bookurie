import { schedule } from 'node-cron';
import { sequelize } from '../../../global';
import { Models } from '../../../interface';

schedule('0 0 1,15 * *', async () => {
	const { Raffle, User, Prize, Book, Subscription } =
		sequelize.models as unknown as Models;

	const subscription = await Subscription.findOne({
		where: { type: 'premium' },
	});
	const users = await User.findAll({
		where: { subscriptionId: subscription.id },
	});
	const prize = await Prize.findOne();

	const winner = users[Math.floor(Math.random() * users.length)];

	if (prize.bookId) {
		const book = await Book.findByPk(prize.bookId);
		if (book.typeFormat === 'printed' && book.stock > 0) {
			await book.update({ stock: book.stock - 1 });
		}
	}
	if (prize.voucher) {
		await winner.update({ budget: winner.budget + prize.voucher });
	}
	await Raffle.create({
		prize: prize.voucher,
		BookId: prize.bookId,
		UserId: winner.id,
	});
});
