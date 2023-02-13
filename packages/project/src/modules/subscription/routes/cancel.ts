import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { ModelSubscription, Models, ExtraRequest } from 'src/interface';
import { cancelSubscriptionRefund } from 'src/modules/subscription/functions';

export async function cancelSubscription(
	req: Request & ExtraRequest,
	res: Response<ModelSubscription | object>
) {
	const { Subscription } = sequelize.models as unknown as Models;
	try {
		const { currentUser: user } = req;

		const subscription = await Subscription.findByPk(user.subscriptionId);
		if (!subscription) return returnError(res, 'Invalid subscription');

		const refundAmount = cancelSubscriptionRefund(
			user.subscriptionExpirationDate,
			subscription.monthlyFee
		);

		await user.update({
			subscriptionId: null,
			budget: user.budget + refundAmount,
		});

		return res.status(200).json({
			data: subscription,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
