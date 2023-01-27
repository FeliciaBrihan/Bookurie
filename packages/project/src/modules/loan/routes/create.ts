import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { ModelLoan, Models, ExtraRequest } from 'src/interface';
import { calculatePrice } from 'src/modules/loan/functions/calculatePrice';

interface ReqParam {
	bookId: number;
}
type ReqBody = ModelLoan;

export async function create(
	req: Request<ReqParam, {}, ReqBody, {}> & ExtraRequest,
	res: Response<ModelLoan | object>
) {
	const { Loan, Book } = sequelize.models as unknown as Models;
	try {
		const { currentUser: user } = req;
		const { bookId } = req.params;

		const book = await Book.findByPk(bookId);

		const alreadyLoaned = await Loan.findOne({
			where: { BookId: bookId, UserId: user.id },
		});

		if (!book) return returnError(res, 'Invalid id');
		if (book.typeFormat === 'online')
			return returnError(res, 'Online Book. Cannot Be Borrowed!');
		if (!book.stockOld) return returnError(res, 'Book Out Of Stock!');
		if (alreadyLoaned) return returnError(res, 'Book Already Borrowed!');

		if (!user.subscriptionId) {
			const bookFinalPrice = calculatePrice(
				book.price,
				+process.env.LOAN_DISCOUNT
			);
			if (user.budget >= bookFinalPrice)
				await user.update({ budget: user.budget - bookFinalPrice });
			else return returnError(res, 'Not enough money');
		}

		const loan = await Loan.create({
			BookId: bookId,
			UserId: user.id,
		});

		await book.update({ stockOld: book.stockOld - 1 });

		return res.status(200).json({
			data: loan,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
