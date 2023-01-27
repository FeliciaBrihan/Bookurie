import { schedule } from 'node-cron';
import { sequelize } from 'src/global';
import { Models } from 'src/interface';

schedule('0 0 1,15 * *', async () => {
	const { Raffle, User, Prize, Book, Subscription } =
		sequelize.models as unknown as Models;

	const premiumSubscription = await Subscription.findOne({
		where: { type: 'premium' },
	});
	const users = await User.findAll({
		where: { subscriptionId: premiumSubscription.id },
	});
	const winner = users[Math.floor(Math.random() * users.length)];

	const prize = await Prize.findOne();
	if (prize.bookId) {
		const book = await Book.findByPk(prize.bookId);
		if (book.typeFormat === 'printed' && book.stockNew > 0) {
			await book.update({ stockNew: book.stockNew - 1 });
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
