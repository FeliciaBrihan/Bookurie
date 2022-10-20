//TODO - refactor?

import { Request, Response } from 'express';
import {
	Purchase,
	ModelPurchase,
	Models,
	ExtraRequest,
} from '../../../interface';
import { sequelize } from '../../../global';
import { errorMessage, returnError } from '../../../helpers';
import { calculateFinalPrice } from '../functions/calculateFinalPrice';

interface ReqParam {
	bookId: number;
}

type ReqBody = Purchase;

export async function create(
	req: ExtraRequest & Request<ReqParam, {}, ReqBody, {}>,
	res: Response<ModelPurchase | object>
) {
	const { Purchase, Book, User, Subscription } =
		sequelize.models as unknown as Models;

	try {
		const { bookId } = req.params;
		const { currentUser: user } = req;

		const book = await Book.findByPk(bookId);
		const alreadyPurchased = await Purchase.findAll({
			where: {
				BookId: bookId,
				UserId: user.id,
			},
		});
		if (alreadyPurchased.length > 0 && book.typeFormat === 'online')
			return returnError(res, 'Online book already bought');
		if (!book) return returnError(res, 'Invalid id');
		if (book.typeFormat === 'printed' && !book.stock)
			return returnError(res, 'Book out of stock');
		if (user.subscriptionId) {
			const subscription = await Subscription.findByPk(user.subscriptionId);
			const bookFinalPrice = calculateFinalPrice(
				book.price,
				subscription.everyBookDiscount
			);
			if (subscription.type === 'premium' && book.typeFormat === 'printed') {
				if (user.budget >= bookFinalPrice)
					await user.update({ budget: user.budget - bookFinalPrice });
				else return returnError(res, `Not enough money`);
			}
			if (subscription.type === 'basic') {
				if (book.typeFormat === 'printed') {
					if (user.budget >= bookFinalPrice)
						await user.update({ budget: user.budget - bookFinalPrice });
					else return returnError(res, 'Not enough money');
				}
				if (book.typeFormat === 'online') {
					if (user.booksReadThisMonth < subscription.monthlyFreeBooks) {
						await user.update({
							booksReadThisMonth: user.booksReadThisMonth + 1,
						});
					} else {
						if (user.budget >= bookFinalPrice) {
							await user.update({ budget: user.budget - bookFinalPrice });
						} else return returnError(res, 'Not enough money');
					}
				}
			}
		}
		if (!user.subscriptionId) {
			if (user.budget >= book.price) {
				await user.update({ budget: user.budget - book.price });
			} else return returnError(res, 'Not enough money');
		}

		const purchase = await Purchase.create({
			BookId: bookId,
			UserId: user.id,
		});

		if (book.typeFormat === 'printed') {
			await book.update({ stock: book.stock - 1 });
		}

		return res.status(200).json({
			data: purchase,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
