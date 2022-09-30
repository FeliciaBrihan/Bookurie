import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ModelSubscription, Models, ExtraRequest } from '../../../interface';

export async function subscribe(
	req: Request & ExtraRequest,
	res: Response<ModelSubscription | object>
) {
	const { Subscription, User } = sequelize.models as unknown as Models;

	try {
		const subscriptionId = req.params.id;
		const userId = req.currentUserId;

		const subscription = await Subscription.findByPk(subscriptionId);
		const user = await User.findByPk(userId);

		if (!subscription) return res.status(400).send({ error: 'Invalid id' });
		if (user.roleId !== 1)
			return res.status(400).send({ message: 'Staff cannot subscribe' });

		if (user.budget < subscription.monthlyFee)
			return res.status(400).send({ message: 'Budget under monthly fee' });

		if (user.subscriptionId === +subscriptionId)
			return res
				.status(400)
				.send({ message: 'You already have this subscription' });

		const updatedBudget = user.budget - subscription.monthlyFee;

		await user.update({
			subscriptionId: +subscriptionId,
			subscriptionDate: new Date(),
			budget: updatedBudget,
		});

		res.status(200).send({ message: 'Subscribed!' });
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
