import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage, returnError } from '../../../helpers';
import { Book, ModelBook, Models } from '../../../interface';

type ReqBody = Book;
interface ReqParam {
	id: number;
}

export async function update(
	req: Request<ReqParam, {}, ReqBody, {}>,
	res: Response<ModelBook | object>
) {
	const { Book } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;
		const book = await Book.findByPk(id);
		if (!book) return returnError(res, 'Invalid id');

		await book.update(req.body);

		res.status(200).json({
			data: book,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
