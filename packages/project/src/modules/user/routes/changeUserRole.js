import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/errorMessage.js';

export async function changeUserRole(req, res) {
	const { User } = sequelize.models;
	try {
		const id = req.params.userId;
		const roleId = req.body.roleId;

		const user = await User.findByPk(id);
		await user.update({ roleId: roleId });

		res.status(200).json({
			data: user,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
