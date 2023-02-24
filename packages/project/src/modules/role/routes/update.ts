import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { Role, ModelRole, Models } from 'src/interface';

type ReqBody = Role;
interface ReqParam {
	id: number;
}

export async function update(
	req: Request<ReqParam, {}, ReqBody, {}>,
	res: Response<ModelRole | object>
) {
	const { Role } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;
		const role = await Role.findByPk(id);
		if (!role) return returnError(res, 'Invalid id');

		await role.update(req.body);

		return res.status(200).json({
			data: role,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
