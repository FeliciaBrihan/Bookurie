import { Request, Response, NextFunction } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers';
import { ExtraRequest, Models } from '../../../interface';

export function checkAuthorization(requiredAction: string) {
	return async function (
		req: Request & ExtraRequest,
		res: Response,
		next: NextFunction
	) {
		const { Action, Permission } = sequelize.models as unknown as Models;

		try {
			const { currentUserRoleId: roleId } = req;

			const action = await Action.findOne({
				where: { name: requiredAction },
			});
			const permission = await Permission.findOne({
				where: {
					RoleId: roleId,
					ActionId: action?.id,
				},
			});
			if (!permission) {
				return res.sendStatus(401);
			}
			next();
		} catch (error) {
			const message = errorMessage(error);
			res.status(400).send(message);
		}
	};
}
