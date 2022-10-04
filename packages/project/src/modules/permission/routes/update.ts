import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { Permission, ModelPermission, Models } from '../../../interface';

type ReqBody = Permission;
interface ReqParam {
	id: number;
}

export async function update(
	req: Request<ReqParam, {}, ReqBody, {}>,
	res: Response<ModelPermission | object>
) {
	const { Permission } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;

		const permission = await Permission.findByPk(id);
		if (!permission) return res.status(400).send({ error: 'Invalid id' });
		await permission.update(req.body);

		res.status(200).json({
			data: permission,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
