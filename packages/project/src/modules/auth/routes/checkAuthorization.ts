import { Request, Response, NextFunction } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ExtraRequest, Models } from 'src/interface';
import { Op } from 'sequelize';

export function checkAuthorization(requiredAction: string) {
	return async function (
		req: Request & ExtraRequest,
		res: Response,
		next: NextFunction
	) {
		const { Action, Role } = sequelize.models as unknown as Models;

		try {
			const { roleId } = req.currentUser;

			const role = await Role.findByPk(roleId);
			if (!role) return res.sendStatus(401);

			const allowedActions = await Action.findAll({
				where: {
					id: {
						[Op.in]: role.allowedActions,
					},
				},
			});

			const hasPermission = allowedActions.some(
				(a) => a.name === requiredAction
			);
			if (!hasPermission) {
				return res.sendStatus(401);
			}

			next();
		} catch (error) {
			const message = errorMessage(error);
			res.status(400).send(message);
		}
	};
}
