import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers';
import { ModelSubscription, Models } from '../../../interface';

export async function getAll(
	req: Request,
	res: Response<ModelSubscription[] | object>
) {
	const { Subscription } = sequelize.models as unknown as Models;

	try {
		const subscriptions = await Subscription.findAll();
		if (subscriptions.length === 0) return res.sendStatus(204);

		return res.status(200).json({
			results: subscriptions.length,
			data: subscriptions,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
