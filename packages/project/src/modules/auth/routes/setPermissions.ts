import {Request, Response} from 'express'
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/errorMessage';
import { Permission, ModelPermission, Models } from '../../../interface';

type ReqBody = Permission

export async function setPermissions(req: Request<{}, {}, ReqBody, {}>, res: Response<ModelPermission | object | string>) {
	
	const { Permission } = sequelize.models as unknown as Models

	try {
		const { RoleId, ActionId } = req.body;
		if (!RoleId || !ActionId) {
			return res.status(400).send({ error: 'Incomplete data' });
		}
		const newPermission = await Permission.create({
			RoleId: RoleId,
			ActionId: ActionId,
		});

		if (!newPermission) {
			return res.status(400).send({ error: 'Invalid data' });
		}
		res.status(200).json({
			data: newPermission,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
