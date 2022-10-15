import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers';
import { Role, ModelRole, Models } from '../../../interface';

type ReqBody = Role;

export async function create(
	req: Request<{}, {}, ReqBody, {}>,
	res: Response<ModelRole | object>
) {
	const { Role } = sequelize.models as unknown as Models;

	try {
		const newRole = await Role.create(req.body);

		return res.status(201).json({
			data: newRole,
		});
	} catch (error) {
		const message = errorMessage(error);
		return res.status(400).send(message);
	}
}
