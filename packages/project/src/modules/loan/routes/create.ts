import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ModelLoan, Models, ExtraRequest } from '../../../interface';

interface ReqParam {
	bookId: number;
}
type ReqBody = ModelLoan;

export async function create(
	// req: Request<ReqParam, {}, ReqBody, {}> & ExtraRequest,
	req: Request & ExtraRequest,
	res: Response<ModelLoan | object | string>
) {
	const { Loan, Book } = sequelize.models as unknown as Models;
	try {
		req.body.BookId = req.params.bookId;
		req.body.UserId = req.currentUserId;

		const book = await Book.findByPk(req.params.bookId);

		if (!book) return res.status(400).send('Invalid id');
		if (!book.isAvailable) return res.status(400).send('Book not available');

		const loan = await Loan.create(req.body);

		await book.update({ isAvailable: false });

		return res.status(200).json({
			status: 'success',
			data: loan,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
