import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ModelLoan, Models } from '../../../interface';

// interface ReqParam {
// 	id: number;
// }

export async function returnLoan(
	// req: Request<ReqParam, {}, {}, {}>,
	req: Request,
	res: Response<ModelLoan | object | string>
) {
	const { Loan, Book } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;
		const loan = await Loan.findByPk(id);

		if (!loan) return res.status(400).send('Invalid id');

		if (!loan.isAccepted)
			return res.status(400).send({ error: 'Loan not accepted' });

		if (loan.isReturned) return res.status(400).send('Loan already returned');

		const book = await Book.findByPk(loan.BookId);
		await book.update({ stock: book.stock + 1 });
		await loan.update({ isReturned: true });

		res.status(200).json({
			message: 'Return book registered',
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
