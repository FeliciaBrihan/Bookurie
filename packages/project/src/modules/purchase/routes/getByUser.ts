import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ExtraRequest, ModelPurchase, Models } from '../../../interface';

export async function getByUser(
	req: Request & ExtraRequest,
	res: Response<ModelPurchase | object>
) {
	const { Purchase } = sequelize.models as unknown as Models;

	try {
		const userId = req.currentUserId;
		const purchases = await Purchase.findAll({ where: { UserId: userId } });

		res.status(200).json({
			results: purchases.length,
			data: purchases,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
