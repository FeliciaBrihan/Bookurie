import { getDatabaseModels, errorMessage } from '../../../helpers/index.js';

export async function deleteUser(req, res) {
	try {
		const { User } = await getDatabaseModels();
		const { id } = req.params;
		const user = await User.findByPk(id);
		if (!user) return res.status(404).send('No user found with that id');
		await User.destroy({ where: { id: id } });

		return res.status(200).json({
			status: 'success',
			data: null,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
