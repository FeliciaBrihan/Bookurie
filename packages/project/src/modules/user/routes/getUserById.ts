import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ModelUser, Models } from '../../../interface';

interface ReqParam {
	id: number;
}

export async function getUserById(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelUser | object | string>
) {
	try {
		const { User } = sequelize.models as unknown as Models;
		const { id } = req.params;
		const user = await User.findByPk(id);

		if (!user) return res.status(404).send('No user found with this id');

		return res.status(200).json({
			data: user,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
