import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ModelPurchase, Models } from 'src/interface';

export async function getAll(
	req: Request,
	res: Response<ModelPurchase[] | object>
) {
	const { Purchase } = sequelize.models as unknown as Models;

	try {
		const purchases = await Purchase.findAll();
		if (purchases.length === 0) return res.sendStatus(204);

		return res.status(200).json({
			results: purchases.length,
			data: purchases,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
