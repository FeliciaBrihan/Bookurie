import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { ModelSubscription, Models } from 'src/interface';

interface ReqParam {
	id: number;
}

export async function getById(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelSubscription | object>
) {
	const { Subscription } = sequelize.models as unknown as Models;
	try {
		const { id } = req.params;

		const subscription = await Subscription.findByPk(id);
		if (!subscription) return returnError(res, 'Invalid id');

		return res.status(200).json({
			data: subscription,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
