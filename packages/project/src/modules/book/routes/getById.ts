import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, getBookDiscountPrice, returnError } from 'src/helpers';
import { ExtraRequest, ModelBook, Models } from 'src/interface';
// import { getBooksWithDiscountPrice } from 'src/helpers';

interface ReqParam {
	id: number;
}

export async function getById(
	req: Request<ReqParam, {}, {}, {}> & ExtraRequest,
	res: Response<ModelBook | object>
) {
	const { Book, Subscription } = sequelize.models as unknown as Models;
	try {
		const { id } = req.params;
		const { currentUser: user } = req;

		const book = await Book.findByPk(id);
		if (!book) return returnError(res, 'Invalid id');

		const subscription = await Subscription.findByPk(user.subscriptionId);

		const newBook = getBookDiscountPrice(book, subscription, user);

		return res.status(200).json({
			data: newBook,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
