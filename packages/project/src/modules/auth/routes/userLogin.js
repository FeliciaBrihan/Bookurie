import { errorMessage } from '../../../helpers/index.js';
import md5 from 'md5';
import { sequelize } from '../../../global.js';
import JWT from 'jsonwebtoken';

export async function userLogin(req, res) {
	const { User } = sequelize.models;

	try {
		const { password, username } = req.body;

		const user = await User.findOne({
			where: { username: username, password: md5(password) },
		});
		if (user === null) return res.status(403).send({ error: 'Invalid user' });

		const accessToken = JWT.sign({ user }, process.env.JWT_ACCESS_KEY, {
			expiresIn: process.env.JWT_ACCESS_KEY_EXPIRE_TIME,
		});
		res.cookie('jwt', accessToken, { httpOnly: true });
		res.send({ accessToken });
	} catch (err) {
		const message = errorMessage(err);
		res.status(400).send(message);
	}
}
