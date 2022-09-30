import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ModelUser, Models } from '../../../interface';

interface ReqParam {
	id: number;
}

export async function deleteUser(
	req: Request<ReqParam, {}, {}, {}>,

	res: Response<ModelUser | object>
) {
	try {
		const { User } = sequelize.models as unknown as Models;
		const { id } = req.params;
		const user = await User.findByPk(id);
		if (!user) return res.status(404).send({ error: 'Invalid id' });
		await User.destroy({ where: { id: id } });

		return res.status(200).json({
			status: 'success',
			data: null,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
