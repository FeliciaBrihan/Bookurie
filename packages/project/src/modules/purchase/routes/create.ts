import { Request, Response } from 'express';
import {
	Purchase,
	ModelPurchase,
	Models,
	ExtraRequest,
} from '../../../interface';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers';

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
		req.body.BookId = req.params.bookId;
		req.body.UserId = req.currentUserId;

		const book = await Book.findByPk(req.params.bookId);
		const user = await User.findByPk(req.currentUserId);

		if (!book) return res.status(400).send({ error: 'Invalid id' });

		if (book.typeFormat === 'printed') {
			if (!book.stock)
				return res.status(400).send({ message: 'Book out of stock' });
		}
		const subscriptionId = user.subscriptionId;

		if (subscriptionId) {
			const subscription = await Subscription.findByPk(subscriptionId);
			const userSubscriptionType = subscription.type;

			if (userSubscriptionType === 'premium') {
				if (book.typeFormat === 'printed') {
					const discount = subscription.everyBookDiscount / 100;
					const bookFinalPrice = Math.round(book.price - book.price * discount);

					if (user.budget >= bookFinalPrice) {
						const updatedBudget = user.budget - bookFinalPrice;
						await user.update({ budget: updatedBudget });
					} else {
						return res.status(400).send({
							message: `You don't have enough money to buy this book`,
						});
					}
				}
			} else {
				if (book.typeFormat === 'printed') {
					const discount = subscription.everyBookDiscount / 100;
					const bookFinalPrice = Math.round(book.price - book.price * discount);

					if (user.budget >= bookFinalPrice) {
						const updatedBudget = user.budget - bookFinalPrice;
						await user.update({ budget: updatedBudget });
					} else {
						return res.status(400).send({
							message: `You don't have enough money to buy this book`,
						});
					}
				} else if (book.typeFormat === 'online') {
					if (user.booksReadThisMonth < subscription.monthlyFreeBooks) {
						user.update({ booksReadThisMonth: user.booksReadThisMonth + 1 });
					} else {
						const discount = subscription.everyBookDiscount / 100;
						const bookFinalPrice = Math.round(
							book.price - book.price * discount
						);
						if (user.budget >= bookFinalPrice) {
							const updatedBudget = user.budget - bookFinalPrice;
							await user.update({ budget: updatedBudget });
						} else {
							return res.status(400).send({
								message: `You don't have enough money to buy this book`,
							});
						}
					}
				}
			}
		}
		if (!user.subscriptionId) {
			if (user.budget >= book.price) {
				const updatedBudget = user.budget - book.price;
				await user.update({ budget: updatedBudget });
			} else {
				return res
					.status(400)
					.send({ message: `You don't have enough money to buy this book` });
			}
		}
		const purchase = await Purchase.create(req.body);

		if (book.typeFormat === 'printed') {
			const updatedStock = book.stock - 1;
			await book.update({ stock: updatedStock });
		}

		return res.status(200).json({
			data: purchase,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}