import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ModelBook, Models } from 'src/interface';

export async function getAll(
	req: Request,
	res: Response<ModelBook[] | object>
) {
	const { Book } = sequelize.models as unknown as Models;

	try {
		const books = await Book.findAll({ where: req.query });

		if (books.length === 0) return res.sendStatus(204);

		return res.status(200).json({
			results: books.length,
			data: books,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
