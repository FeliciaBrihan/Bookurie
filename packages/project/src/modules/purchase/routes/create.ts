import { Request, Response } from 'express';
import { Purchase, ModelPurchase, Models, ExtraRequest } from 'src/interface';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { getBookDetails } from 'src/modules/purchase/functions';

interface ReqParam {
	bookId: number;
}

type ReqBody = Purchase & { orderId: string };

export async function create(
	req: ExtraRequest & Request<ReqParam, {}, ReqBody, {}>,
	res: Response<ModelPurchase | object>
) {
	const { Purchase, Book } = sequelize.models as unknown as Models;

	try {
		const { bookId } = req.params;
		const { orderId } = req.body;

		const { currentUser: user } = req;

		const book = await Book.findByPk(bookId);
		const alreadyBought = await Purchase.findAll({
			where: {
				BookId: bookId,
				UserId: user.id,
			},
		});
		if (alreadyBought.length > 0 && book.typeFormat === 'online')
			return returnError(res, 'Online book already bought');
		if (!book) return returnError(res, 'Invalid id');
		if (book.typeFormat === 'printed' && !book.stockNew)
			return returnError(res, 'Book out of stock');

		const { isPremiumSubscription, isFreeBook, price } = await getBookDetails({
			bookType: book.typeFormat,
			bookPrice: book.price,
			subscriptionId: user.subscriptionId,
			booksReadThisMonth: user.booksReadThisMonth,
		});

		if (isFreeBook) {
			if (!isPremiumSubscription)
				await user.update({ booksReadThisMonth: user.booksReadThisMonth + 1 });
		} else {
			if (user.budget >= price) {
				await user.update({ budget: user.budget - price });
				if (book.typeFormat === 'printed')
					await book.update({ stockNew: book.stockNew - 1 });
			} else return returnError(res, 'Not enough money');
		}

		const purchase = await Purchase.create({
			BookId: bookId,
			UserId: user.id,
			price: price,
			orderId: orderId,
		});

		return res.status(200).json({
			data: purchase,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
