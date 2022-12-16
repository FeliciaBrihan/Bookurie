import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { ModelLoan, Models } from 'src/interface';

interface ReqParam {
	id: number;
}

export async function deleteLoan(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelLoan | object>
) {
	const { Loan } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;
		const loan = await Loan.findByPk(id);
		if (!loan) return returnError(res, 'Invalid id');

		await loan.destroy();

		return res.status(200).json({
			data: null,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
