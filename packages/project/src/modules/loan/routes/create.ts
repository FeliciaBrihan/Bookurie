import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ModelLoan, Models, ExtraRequest } from '../../../interface';

interface ReqParam {
	bookId: number;
}
type ReqBody = ModelLoan;

export async function create(
	req: Request<ReqParam, {}, ReqBody, {}> & ExtraRequest,
	res: Response<ModelLoan | object>
) {
	const { Loan, Book, User } = sequelize.models as unknown as Models;
	try {
		req.body.BookId = req.params.bookId;
		req.body.UserId = req.currentUserId;

		const book = await Book.findByPk(req.params.bookId);
		const user = await User.findByPk(req.currentUserId);

		const alreadyLoaned = await Loan.findAll({
			where: {
				BookId: book.id,
				UserId: user.id,
			},
		});
		if (alreadyLoaned.length > 0)
			return res.status(400).send({ error: 'Book already loaned' });

		if (!book) return res.status(400).send({ error: 'Invalid id' });

		if (book.typeFormat === 'online')
			return res
				.status(400)
				.send({ message: 'Online book. Cannot be borrowed' });

		if (!book.stock)
			return res.status(400).send({ message: 'Book out of stock' });

		if (!user.subscriptionId) {
			const discount = 0.15;
			const finalBookPrice = Math.round(book.price - book.price * discount);

			if (user.budget >= finalBookPrice) {
				const updatedBudget = user.budget - finalBookPrice;
				await user.update({ budget: updatedBudget });
			} else {
				return res
					.status(400)
					.send({ message: `You don't have enough money to borrow this book` });
			}
		}
		const loan = await Loan.create(req.body);

		const updatedStock = book.stock - 1;
		await book.update({ stock: updatedStock });

		return res.status(200).json({
			data: loan,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
