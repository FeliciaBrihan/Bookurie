import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { ModelLoan, Models } from 'src/interface';

interface ReqParam {
	id: number;
}

export async function returnLoan(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelLoan | object>
) {
	const { Loan, Book } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;
		const loan = await Loan.findByPk(id);

		if (!loan) return returnError(res, 'Invalid id');
		if (!loan.isAccepted) return returnError(res, 'Loan not accepted');
		if (loan.isReturned) return returnError(res, 'Loan already returned');

		const book = await Book.findByPk(loan.BookId);
		await book.update({ stockOld: book.stockOld + 1 });
		await loan.update({ isReturned: true });

		return res.status(200).json({
			message: 'Return book registered',
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
