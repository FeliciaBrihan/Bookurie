import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/index.js';

export async function create(req, res) {
	const { Loan, Book } = sequelize.models;
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
