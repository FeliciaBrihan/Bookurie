import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/errorMessage.js';

export async function setPermissions(req, res) {
	const { Permission } = sequelize.models;

	try {
		const { RoleId, ActionId } = req.body;
		if (!RoleId || !ActionId) {
			return res.status(400).send({ error: 'Incomplete data' });
		}
		const newPermission = await Permission.create({
			RoleId: RoleId,
			ActionId: ActionId,
		});

		if (!newPermission) {
			return res.status(400).send({ error: 'Invalid data' });
		}
		res.status(200).json({
			data: newPermission,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
