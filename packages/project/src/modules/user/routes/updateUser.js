import { sequelize } from '../../../global.js';
import { errorMessage } from '../../../helpers/index.js';

export async function updateUser(req, res) {
	try {
		const { User } = sequelize.models;
		const { id } = req.params;

		const user = await User.findByPk(id);
		if (!user) return res.status(404).send('No user found with this id');

		const updatedUser = await user.update(req.body);

		return res.status(200).json({
			status: 'success',
			data: updatedUser,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
