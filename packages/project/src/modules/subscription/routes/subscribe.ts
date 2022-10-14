import { Request, Response } from 'express';
import { getCurrentDate } from '../../../helpers/getCurrentDate';
import { sequelize } from '../../../global';
import { errorMessage, returnError } from '../../../helpers';
import { ModelSubscription, Models, ExtraRequest } from '../../../interface';
import { getSubscriptionExpirationDate } from '../functions';

export async function subscribe(
	req: Request & ExtraRequest,
	res: Response<ModelSubscription | object>
) {
	const { Subscription, User } = sequelize.models as unknown as Models;

	try {
		const { id: subscriptionId } = req.params;
		const userId = req.currentUserId;

		const subscription = await Subscription.findByPk(subscriptionId);
		const user = await User.findByPk(userId);

		if (!subscription) return returnError(res, 'Invalid id');
		if (user.roleId !== 1) return returnError(res, 'Staff cannot subscribe');
		if (user.budget < subscription.monthlyFee)
			return returnError(res, 'Budget under monthly fee');
		if (user.subscriptionId === +subscriptionId)
			return returnError(res, 'You already have this subscription');

		const updatedBudget = user.budget - subscription.monthlyFee;
		const subscriptionExpirationDate = getSubscriptionExpirationDate();
		await user.update({
			subscriptionId: +subscriptionId,
			subscriptionDate: getCurrentDate().date as unknown as Date,
			subscriptionExpirationDate: subscriptionExpirationDate,
			budget: updatedBudget,
		});

		res.status(200).send({ message: 'Subscribed!' });
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
