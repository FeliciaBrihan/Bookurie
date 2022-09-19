import { sequelize } from '../../../global.js';

const { Role } = sequelize.models;

export function restrictTo(...roles) {
	return async function (req, res, next) {
		const role = await Role.findByPk(req.currentUser.roleId);
		const roleName = role.name;
		if (!roles.includes(roleName)) {
			return res.sendStatus(401);
		}
		next();
	};
}
