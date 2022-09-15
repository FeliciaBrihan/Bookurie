import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/index.js';

export async function returnLoan(req, res) {
	const { Loan, Book } = sequelize.models;

	try {
		const { id } = req.params;
		const loan = await Loan.findByPk(id);

		if (!loan.isAccepted)
			return res
				.status(400)
				.send('This loan is not yet accepted, you cannot return it');

		if (loan.isReturned) return res.status(400).send('Loan already returned');

		const book = await Book.findByPk(loan.BookId);
		await book.update({ isAvailable: true });
		await loan.update({ isReturned: true });

		res.status(200).json({
			status: 'success',
			message: 'Return book registered',
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}