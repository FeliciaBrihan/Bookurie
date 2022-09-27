import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ModelSubscription, Models } from '../../../interface';

interface ReqParam {
	id: number;
}

export async function deleteSubscription(
	// req: Request<ReqParam, {}, {}, {}>,
	req: Request,
	res: Response<ModelSubscription | object | string>
) {
	const { Subscription } = sequelize.models as unknown as Models;
	try {
		const { id } = req.params;

		const subscription = await Subscription.findByPk(id);

		if (!subscription) return res.status(400).send('Invalid id');

		await subscription.destroy();

		return res.status(200).json({
			data: null,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
