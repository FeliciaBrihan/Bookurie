import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ModelRole, Models } from '../../../interface';

export async function getAll(
	req: Request,
	res: Response<ModelRole[] | object>
) {
	const { Role } = sequelize.models as unknown as Models;

	try {
		const roles = await Role.findAll({ where: req.query });
		if (roles.length === 0) return res.sendStatus(204);

		return res.status(200).json({
			results: roles.length,
			data: roles,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
