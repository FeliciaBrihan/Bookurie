import { Request, Response, NextFunction } from 'express';
import { ExtraRequest, Models } from 'src/interface';
import { sequelize } from 'src/global';

export function restrictTo(...roles: string[]) {
	return async function (
		req: Request & ExtraRequest,
		res: Response,
		next: NextFunction
	) {
		const { currentUserRoleId: roleId } = req;

		const { Role } = sequelize.models as unknown as Models;

		const role = await Role.findByPk(roleId);

		if (!roles.includes(role.name)) {
			return res.sendStatus(401);
		}
		next();
	};
}
