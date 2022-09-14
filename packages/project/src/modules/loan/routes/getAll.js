import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/index.js';

export async function getAll(req, res) {
	const { Loan } = sequelize.models;

	try {
		const loans = await Loan.findAll();

		res.status(200).json({
			status: 'success',
			results: loans.length,
			data: loans,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
