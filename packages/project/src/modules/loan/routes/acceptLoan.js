import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/errorMessage.js';

export async function acceptLoan(req, res) {
	const { Loan } = sequelize.models;
	try {
		const { id } = req.params;
		const loan = await Loan.findByPk(id);
		await loan.update({ isAccepted: true });
		return res.status(200).json({
			status: 'success',
			message: 'Loan accepted',
			data: loan,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
