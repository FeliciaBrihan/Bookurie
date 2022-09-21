import { sequelize } from '../../../global.js';

export async function changeUserRole(req, res) {
	const { User } = sequelize.models;

	const id = req.params.userId;
	const roleId = req.body.roleId;

	const user = await User.findByPk(id);
	await user.update({ roleId: roleId });

	res.status(200).json({
		data: user,
	});
}
