import { errorMessage } from '../../../helpers/index.js';
import { sequelize } from '../../../global.js';
import md5 from 'md5';
import JWT from 'jsonwebtoken';
export async function userSignUp(req, res) {
	const { User } = sequelize.models;
	try {
		const { firstName, lastName, username, email, password, role } = req.body;

		if (!(email && password && firstName && lastName && username)) {
			res.status(400).send('All fields are required');
		}

		const userExists = await User.findOne({ where: { email: email } });
		if (userExists) {
			return res.status(409).send('User already exists, please login');
		}

		const user = await User.create({
			firstName,
			lastName,
			email: email.toLowerCase(),
			username,
			password: md5(password),
			role,
		});

		const accessToken = JWT.sign({ user }, process.env.JWT_ACCESS_KEY, {
			expiresIn: process.env.JWT_ACCESS_KEY_EXPIRE_TIME,
		});
		res.send(accessToken);
	} catch (err) {
		const message = errorMessage(err);
		res.status(400).send(message);
	}
}
