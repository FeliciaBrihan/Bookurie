import { Request, Response } from 'express';
import { errorMessage } from 'src/helpers';
import { sequelize } from 'src/global';
import md5 from 'md5';
import { User, ModelUser, Models } from 'src/interface';

type ReqBody = User;

export async function createUser(
	req: Request<{}, {}, ReqBody, {}>,
	res: Response<ModelUser | object>
) {
	const { User } = sequelize.models as unknown as Models;

	try {
		const newUser = await User.create(req.body);

		await newUser.update({ password: md5(newUser.password) });

		return res.status(200).json({
			data: newUser,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
