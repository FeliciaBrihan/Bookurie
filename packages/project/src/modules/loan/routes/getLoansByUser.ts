import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ExtraRequest, ModelLoan, Models } from '../../../interface';

export async function getLoansByUser(
	req: Request & ExtraRequest,
	res: Response<ModelLoan | object>
) {
	const { Loan } = sequelize.models as unknown as Models;

	try {
		const userId = req.currentUserId;
		const loans = await Loan.findAll({ where: { UserId: userId } });

		res.status(200).json({
			results: loans.length,
			data: loans,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
