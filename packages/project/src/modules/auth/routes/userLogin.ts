import { Request, Response } from 'express';
import md5 from 'md5';
import { errorMessage, generateJWT, returnError } from 'src/helpers';
import { sequelize } from 'src/global';
import { Models } from 'src/interface';

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
		if (!user) return returnError(res, 'Invalid user');

		const accessToken = generateJWT(user);
		res.cookie('jwt', accessToken, { httpOnly: true });

		return res.send({ accessToken });
	} catch (err) {
		const message = errorMessage(err);
		res.status(400).send(message);
	}
}
