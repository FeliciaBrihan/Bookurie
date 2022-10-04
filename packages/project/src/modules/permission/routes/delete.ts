import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ModelPermission, Models } from '../../../interface';

interface ReqParam {
	id: number;
}

export async function deletePermission(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelPermission | object>
) {
	const { Permission } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;

		const permission = await Permission.findByPk(id);
		if (!permission) return res.status(400).send({ error: 'Invalid id' });

		await permission.destroy();

		return res.status(200).json({
			data: null,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
