import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/index.js';

export async function deleteBook(req, res) {
	const { Book } = sequelize.models;

	try {
		const { id } = req.params;

		const book = await Book.findByPk(id);
		if (!book) return res.status(400).send('Invalid id');

		await book.destroy();

		return res.status(200).json({
			status: 'success',
			data: null,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
