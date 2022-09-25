import { Request, Response } from 'express';
import { errorMessage } from '../../../helpers/index';
import { sequelize } from '../../../global';
import md5 from 'md5';
import { User, ModelUser, Models } from '../../../interface';

type ReqBody = User;

export async function createUser(
	req: Request<{}, {}, ReqBody, {}>,
	res: Response<ModelUser | object>
) {
	try {
		const { User } = sequelize.models as unknown as Models;
		const newUser = await User.create(req.body);
		newUser.password = md5(newUser.password);

		return res.status(200).json({
			data: newUser,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
