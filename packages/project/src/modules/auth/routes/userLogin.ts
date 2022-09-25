import { Request, Response } from 'express';
import JWT from 'jsonwebtoken';
import md5 from 'md5';
import { errorMessage } from '../../../helpers/index';
import { sequelize } from '../../../global';
import { Models } from '../../../interface';

interface ReqBody {
	username: string;
	password: string;
}

export async function userLogin(
	req: Request<{}, {}, ReqBody, {}>,
	res: Response<{ accessToken: string } | object>
) {
	const { User } = sequelize.models as unknown as Models;

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
