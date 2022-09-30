import { Request, Response } from 'express';
import md5 from 'md5';
import JWT from 'jsonwebtoken';
import { errorMessage } from '../../../helpers/index';
import { sequelize } from '../../../global';
import { User, Models } from '../../../interface';

type ReqBody = User;

export async function userSignUp(
	req: Request<{}, {}, ReqBody, {}>,
	res: Response<{ accessToken: string } | object>
) {
	const { User } = sequelize.models as unknown as Models;
	try {
		const { firstName, lastName, username, email, password } = req.body;

		if (!(email && password && firstName && lastName && username)) {
			res.status(400).send({ message: 'All fields are required' });
		}

		const userExists = await User.findOne({ where: { email: email } });
		if (userExists) {
			return res
				.status(409)
				.send({ message: 'User already exists, please login' });
		}

		const user = await User.create({
			firstName,
			lastName,
			email: email.toLowerCase(),
			username,
			password: md5(password),
			roleId: 1,
		});

		const min = 100;
		const max = 1000;

		const budget = Math.floor(Math.random() * (max - min) + min);
		await user.update({ budget: budget });

		const accessToken = JWT.sign({ user }, process.env.JWT_ACCESS_KEY, {
			expiresIn: process.env.JWT_ACCESS_KEY_EXPIRE_TIME,
		});
		res.status(200).json({
			token: accessToken,
			data: user,
		});
	} catch (err) {
		const message = errorMessage(err);
		res.status(400).send(message);
	}
}
