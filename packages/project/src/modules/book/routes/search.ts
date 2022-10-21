import { Op } from 'sequelize';
import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ModelBook, Models } from 'src/interface';

interface ReqParam {
	query: string;
}

export async function search(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelBook | object>
) {
	const { Book } = sequelize.models as unknown as Models;

	try {
		const { query } = req.params;
		const books = await Book.findAll({
			where: {
				[Op.or]: {
					title: { [Op.iLike]: '%' + query + '%' },
					author: { [Op.iLike]: '%' + query + '%' },
				},
			},
		});
		return res.status(200).json(books);
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
