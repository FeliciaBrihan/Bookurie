import { Request, Response, NextFunction } from 'express';
import { ExtraRequest, Models } from '../../../interface';
import { sequelize } from '../../../global';

export function restrictTo(...roles: string[]) {
	return async function (
		req: Request & ExtraRequest,
		res: Response,
		next: NextFunction
	) {
		const { Role } = sequelize.models as unknown as Models;

		const role = await Role.findByPk(req.currentUserRoleId);
		if (!roles.includes(role.name)) {
			return res.sendStatus(401);
		}
		next();
	};
}
