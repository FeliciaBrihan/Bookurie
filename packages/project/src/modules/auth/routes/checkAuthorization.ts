import { Request, Response, NextFunction } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ExtraRequest, Models } from 'src/interface';

export function checkAuthorization(requiredAction: string) {
	return async function (
		req: Request & ExtraRequest,
		res: Response,
		next: NextFunction
	) {
		const { Action, Permission } = sequelize.models as unknown as Models;

		try {
			const { roleId } = req.currentUser;

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
