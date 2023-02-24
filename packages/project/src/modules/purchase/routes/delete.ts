import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { ModelPurchase, Models } from 'src/interface';

interface ReqParam {
	id: number;
}

export async function deletePurchase(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelPurchase | object>
) {
	const { Purchase } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;
		const purchase = await Purchase.findByPk(id);
		if (!purchase) return returnError(res, 'Invalid id');

		await purchase.destroy();

		return res.status(200).json({
			data: null,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
