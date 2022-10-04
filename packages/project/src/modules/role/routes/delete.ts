import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ModelRole, Models } from '../../../interface';

interface ReqParam {
	id: number;
}

export async function deleteRole(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelRole | object>
) {
	const { Role } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;

		const role = await Role.findByPk(id);
		if (!role) return res.status(400).send({ error: 'Invalid id' });

		await role.destroy();

		return res.status(200).json({
			data: null,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
