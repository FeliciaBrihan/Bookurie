import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { Subscription, ModelSubscription, Models } from '../../../interface';

type ReqBody = Subscription;
interface ReqParam {
	id: number;
}

export async function update(
	// req: Request<ReqParam, {}, ReqBody, {}>,
	req: Request,
	res: Response<ModelSubscription | object | string>
) {
	const { Subscription } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;

		const subscription = await Subscription.findByPk(id);
		if (!subscription) return res.status(400).send('Invalid id');
		await subscription.update(req.body);

		res.status(200).json({
			data: subscription,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
