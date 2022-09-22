import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/errorMessage.js';

export function checkAuthorization(requiredPermission) {
	return async function (req, res, next) {
		const { Action, Permission } = sequelize.models;

		try {
			const roleId = req.currentUser.roleId;

			const action = await Action.findOne({
				where: { name: requiredPermission },
			});
			const actionId = action.id;

			if (!roleId || !actionId) {
				return res.status(401);
			}

			const permission = await Permission.findOne({
				where: {
					RoleId: roleId,
					ActionId: actionId,
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
