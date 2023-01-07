import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ModelBook, Models } from 'src/interface';
import { Op } from 'sequelize';

export async function getAll(
	req: Request,
	res: Response<ModelBook[] | object>
) {
	const { Book } = sequelize.models as unknown as Models;

	try {
		const whereOptions = req.query.price
			? { ...req.query, price: { [Op.lt]: +req.query.price } }
			: { ...req.query };
		const books = await Book.findAll({ where: whereOptions });

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
