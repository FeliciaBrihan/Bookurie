import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ExtraRequest, ModelPurchase, Models } from 'src/interface';

export async function getByUser(
	req: Request & ExtraRequest,
	res: Response<ModelPurchase | object>
) {
	const { Purchase } = sequelize.models as unknown as Models;

	try {
		const { currentUserId: userId } = req;
		const purchases = await Purchase.findAll({ where: { UserId: userId } });
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
