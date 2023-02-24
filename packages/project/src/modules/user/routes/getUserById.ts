import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { ModelUser, Models } from 'src/interface';

interface ReqParam {
	id: number;
}

export async function getUserById(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelUser | object>
) {
	const { User } = sequelize.models as unknown as Models;
	try {
		const { id } = req.params;

		const user = await User.findByPk(id);
		if (!user) return returnError(res, 'Invalid id');

		return res.status(200).json({
			data: user,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
