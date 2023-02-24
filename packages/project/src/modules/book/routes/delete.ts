import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { ModelBook, Models } from 'src/interface';

interface ReqParam {
	id: number;
}

export async function deleteBook(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelBook | object | string>
) {
	const { Book, Purchase, Loan } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;
		const book = await Book.findByPk(id);
		if (!book) return returnError(res, 'Invalid id');
		const bookPurchases = await Purchase.findAll({ where: { BookId: id } });
		const bookLoans = await Loan.findAll({ where: { BookId: id } });
		if (bookPurchases.length)
			return returnError(res, 'Book purchased! Cannot be deleted!');
		if (bookLoans.length)
			return returnError(res, 'Book borrowed! Cannot be deleted!');

		await book.destroy();

		return res.status(200).json({
			data: null,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
