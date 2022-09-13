import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/index.js';

export async function getAll(req, res) {
	const { Book } = sequelize.models;
	try {
		const books = await Book.findAll();
		if (books.length === 0) return res.sendStatus(204);

		return res.status(200).json({
			status: 'success',
			results: books.length,
			data: books,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
