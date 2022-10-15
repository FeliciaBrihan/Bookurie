import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage, returnError } from '../../../helpers';
import { ModelBook, Models } from '../../../interface';

interface ReqParam {
	id: number;
}

export async function deleteBook(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelBook | object>
) {
	const { Book } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;
		const book = await Book.findByPk(id);
		if (!book) return returnError(res, 'Invalid id');

		await book.destroy();

		return res.status(200).json({
			data: null,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
