import { sequelize } from '../../../global.js';

export function checkAuthorization(module, requiredPermission) {
	return async function (req, res, next) {
		const { Permission, Resource, RolePermission } = sequelize.models;

		try {
			const roleId = req.currentUser.roleId;
			console.log(roleId);

			const permission = await Permission.findOne({
				where: { name: requiredPermission },
			});
			const permissionId = permission.id;
			console.log(permissionId);

			const resource = await Resource.findOne({ where: { name: module } });
			const resourceId = resource.id;
			console.log(resourceId);

			if (!roleId || !permissionId || !resourceId) {
				return res.status(400).send({ error: 'error' });
			}

			const rolePermission = await RolePermission.findOne({
				where: {
					RoleId: roleId,
					PermissionId: permissionId,
					ResourceId: resourceId,
				},
			});
			if (!rolePermission) {
				return res.sendStatus(401);
			}
			next();
		} catch (error) {
			console.log(error);
		}
	};
}
