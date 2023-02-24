import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { Address, ExtraRequest, ModelAddress, Models } from 'src/interface';

type ReqBody = Address;

export async function create(
	req: Request<{}, {}, ReqBody, {}> & ExtraRequest,
	res: Response<ModelAddress | object>
) {
	const { Address, User } = sequelize.models as unknown as Models;

	try {
		const { currentUser } = req;
		const address = await Address.create({
			...req.body,
			UserId: currentUser.id,
		});
		const user = await User.findByPk(currentUser.id);
		user.update({ addressId: address.id });

		return res.status(201).json({
			data: address,
		});
	} catch (error) {
		const message = errorMessage(error);
		return res.status(400).send(message);
	}
}
