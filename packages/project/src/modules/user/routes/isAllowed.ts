import { Request, Response } from 'express';
import { Models, ModelUser } from 'src/interface';
import { errorMessage } from 'src/helpers';
import { sequelize } from 'src/global';

export async function isAllowed(
	req: Request<{}, {}, {}, {}> & { currentUser: ModelUser },
	res: Response
) {
	try {
		if (req?.currentUser) {
			const { Subscription } = sequelize.models as unknown as Models;
			const subscription = req.currentUser.subscriptionId
				? await Subscription.findByPk(req.currentUser.subscriptionId)
				: null;
			return res.send({
				loggedUser: req.currentUser,
				subscription: subscription,
			});
		}
	} catch (error) {
		const message = errorMessage(error);
		return res.status(400).send(message);
	}
}
