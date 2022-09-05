import { getDatabaseModels, errorMessage } from '../../../helpers/index.js';

export async function getUserById(req, res) {
	try {
		const { User } = await getDatabaseModels();
		const { id } = req.params;
		const user = await User.findByPk(id);

		if (!user) return res.status(404).send('No user found with this id');

		return res.status(200).json({
			status: 'success',
			data: user,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
