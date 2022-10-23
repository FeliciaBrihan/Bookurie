import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { Loan, ModelLoan, Models } from 'src/interface';
import {
	calculateLoanDuration,
	calculateLoanExpirationDate,
	sendEmail,
} from 'src/modules/loan/functions';

type ReqBody = Loan;
interface ReqParam {
	id: number;
}

export async function acceptLoan(
	req: Request<ReqParam, {}, ReqBody, {}>,
	res: Response<ModelLoan | object>
) {
	const { Loan, User, Book } = sequelize.models as unknown as Models;
	try {
		const { id } = req.params;
		const loan = await Loan.findByPk(id);

		if (!loan) return returnError(res, 'Invalid id');
		if (loan.isAccepted) return returnError(res, 'Loan already accepted');

		const book = await Book.findByPk(loan.BookId);
		const user = await User.findByPk(loan.UserId);

		const loanDurationDays = calculateLoanDuration(
			+process.env.LOAN_DAYS_FOR_100PAGES,
			book.pages
		);
		const expirationDate = calculateLoanExpirationDate(loanDurationDays);

		await loan.update({ isAccepted: true, expirationDate: expirationDate });

		sendEmail(user.email, book.title, loanDurationDays);

		return res.status(200).json({
			message: 'Loan accepted',
			data: loan,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
