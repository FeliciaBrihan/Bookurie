import { sequelize } from '../../../global.js';

export function restrictTo(...roles) {
	return async function (req, res, next) {
		const { Role } = sequelize.models;
		const role = await Role.findByPk(req.currentUser.roleId);
		const roleName = role.name;
		if (!roles.includes(roleName)) {
			return res.sendStatus(401);
		}
		next();
	};
}
