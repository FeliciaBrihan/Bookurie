import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { Permission, ModelPermission, Models } from 'src/interface';

type ReqBody = Permission;

export async function create(
	req: Request<{}, {}, ReqBody, {}>,
	res: Response<ModelPermission | object>
) {
	const { Role, Action, Permission } = sequelize.models as unknown as Models;

	try {
		const { RoleId, ActionId } = req.body;
		const role = await Role.findByPk(RoleId);
		const action = await Action.findByPk(ActionId);
		
		if (!role || !action) {
			return returnError(res, 'Invalid data');
		}

		const newPermission = await Permission.create({
			RoleId: RoleId,
			ActionId: ActionId,
		});

		return res.status(200).json({
			data: newPermission,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
