import { errorMessage } from '../../../helpers/index.js';
import { sequelize } from '../../../global.js';
import md5 from 'md5';

export async function createUser(req, res) {
	try {
		const { User } = sequelize.models;
		const newUser = await User.create(req.body);
		newUser.password = md5(newUser.password);

		return res.status(200).json({
			status: 'success',
			data: newUser,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
