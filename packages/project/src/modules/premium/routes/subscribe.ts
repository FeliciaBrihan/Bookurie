import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ModelPremium, Models, ExtraRequest } from '../../../interface';

export async function subscribe(
	req: Request & ExtraRequest,
	res: Response<ModelPremium | object>
) {
	const { Premium, User } = sequelize.models as unknown as Models;

	try {
		const userId = req.currentUserId;

		const premium = await Premium.findByPk(1);
		const user = await User.findByPk(userId);

		if (user.budget < premium.monthlyFee)
			return res.status(400).send({ message: 'Budget under monthly fee' });

		if (user.hasPremiumSubscription)
			return res
				.status(400)
				.send({ message: 'You already have premium subscription' });

		const updatedBudget = user.budget - premium.monthlyFee;

		await user.update({
			subscriptionId: null,
			hasPremiumSubscription: true,
			budget: updatedBudget,
		});

		res.status(200).send({ message: 'Premium subscription' });
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
