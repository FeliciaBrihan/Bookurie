import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/index.js';

export async function getAllUsers(req, res) {
	try {
		const { User } = sequelize.models;
		const users = await User.findAll();
		return res.status(200).json({
			status: 'success',
			results: users.length,
			data: users,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
