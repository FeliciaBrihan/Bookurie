import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ExtraRequest, ModelLoan, Models } from 'src/interface';

export async function getLoansByUser(
	req: Request & ExtraRequest,
	res: Response<ModelLoan | object>
) {
	const { Loan } = sequelize.models as unknown as Models;

	try {
		const { currentUserId: userId } = req;
		const loans = await Loan.findAll({ where: { UserId: userId } });
		if (loans.length === 0) return res.sendStatus(204);

		return res.status(200).json({
			results: loans.length,
			data: loans,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
