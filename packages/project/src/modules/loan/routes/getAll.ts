import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers';
import { ModelLoan, Models } from '../../../interface';

export async function getAll(
	req: Request,
	res: Response<ModelLoan[] | object>
) {
	const { Loan } = sequelize.models as unknown as Models;

	try {
		const loans = await Loan.findAll();

		res.status(200).json({
			results: loans.length,
			data: loans,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
