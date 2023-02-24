import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { User, ModelUser, Models } from 'src/interface';

type ReqBody = User;

interface ReqParam {
	id: number;
}

export async function updateUser(
	req: Request<ReqParam, {}, ReqBody, {}>,
	res: Response<ModelUser | object>
) {
	const { User } = sequelize.models as unknown as Models;
	try {
		const { id } = req.params;

		const user = await User.findByPk(id);
		if (!user) return returnError(res, 'Invalid id');

		await user.update(req.body);

		return res.status(200).json({
			data: user,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
