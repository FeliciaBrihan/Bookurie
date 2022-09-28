import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ModelPurchase, Models } from '../../../interface';

export async function getAll(
	req: Request,
	res: Response<ModelPurchase[] | object>
) {
	const { Purchase } = sequelize.models as unknown as Models;

	try {
		const purchases = await Purchase.findAll();

		res.status(200).json({
			results: purchases.length,
			data: purchases,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
