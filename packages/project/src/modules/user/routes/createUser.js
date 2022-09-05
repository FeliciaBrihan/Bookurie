import { getDatabaseModels, errorMessage } from '../../../helpers/index.js';

export async function createUser(req, res) {
	try {
		const { User } = await getDatabaseModels();
		const newUser = await User.create(req.body);

		return res.status(200).json({
			status: 'success',
			data: newUser,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
