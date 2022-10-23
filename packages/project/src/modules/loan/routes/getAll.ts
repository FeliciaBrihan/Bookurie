import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ModelLoan, Models } from 'src/interface';

export async function getAll(
	req: Request,
	res: Response<ModelLoan[] | object>
) {
	const { Loan } = sequelize.models as unknown as Models;

	try {
		const loans = await Loan.findAll();
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
