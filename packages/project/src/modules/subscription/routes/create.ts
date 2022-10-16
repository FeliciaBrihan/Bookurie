import { Request, Response } from 'express';
import { Subscription, ModelSubscription, Models } from '../../../interface';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers';

type ReqBody = Subscription;

export async function create(
	req: Request<{}, {}, ReqBody, {}>,
	res: Response<ModelSubscription | object>
) {
	const { Subscription } = sequelize.models as unknown as Models;

	try {
		const data = req.body;

		const subscription = await Subscription.create(data);

		return res.status(201).json({
			data: subscription,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
