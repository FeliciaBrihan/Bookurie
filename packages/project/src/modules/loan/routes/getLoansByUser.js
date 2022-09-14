import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/index.js';

export async function getLoansByUser(req, res) {
	const { Loan } = sequelize.models;

	try {
		const userId = req.currentUserId;
		const loans = await Loan.findAll({where: {UserId: userId}});

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
