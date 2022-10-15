import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers';
import { Book, ModelBook, Models } from '../../../interface';

type ReqBody = Book;

export async function create(
	req: Request<{}, {}, ReqBody, {}>,
	res: Response<ModelBook | object>
) {
	const { Book } = sequelize.models as unknown as Models;

	try {
		const newBook = await Book.create(req.body);

		return res.status(201).json({
			data: newBook,
		});
	} catch (error) {
		const message = errorMessage(error);
		return res.status(400).send(message);
	}
}
