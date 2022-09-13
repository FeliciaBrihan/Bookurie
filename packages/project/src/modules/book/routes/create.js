import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/index.js';

export async function create(req, res) {
	const { Book } = sequelize.models;

	try {
		const newBook = await Book.create(req.body);

		return res.status(201).json({
			status: 'success',
			data: newBook,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
