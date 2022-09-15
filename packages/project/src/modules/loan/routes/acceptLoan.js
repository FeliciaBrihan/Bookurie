import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/errorMessage.js';

export async function acceptLoan(req, res) {
	const { Loan } = sequelize.models;
	try {
		const { id } = req.params;
		const loan = await Loan.findByPk(id);

		if (!loan) return res.status(400).send('Invalid id');

		await loan.update({ isAccepted: true });

		const date = new Date();
		const expirationDate = date.setDate(date.getDate() + 30);
		await loan.update({ expirationDate: expirationDate });

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
