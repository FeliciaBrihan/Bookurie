import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ExtraRequest, ModelBook, Models } from 'src/interface';
import { getBookDiscountPrice } from 'src/helpers';

export async function getAll(
	req: Request & ExtraRequest,
	res: Response<ModelBook[] | object>
) {
	const { Book, Subscription } = sequelize.models as unknown as Models;

	try {
		const { currentUser: user } = req;
		const books = await Book.findAll({ where: req.query });

		if (!user) return res.sendStatus(204);

		if (books.length === 0) return res.sendStatus(204);

		const subscription = await Subscription.findByPk(user.subscriptionId);
		const newBooks = books.map((book) =>
			getBookDiscountPrice(book, subscription, user)
		);

		return res.status(200).json({
			results: newBooks.length,
			data: newBooks,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
