import { Request, Response } from 'express';
import md5 from 'md5';
import { errorMessage, returnError, generateJWT } from 'src/helpers';
import { sequelize } from 'src/global';
import { User, Models } from 'src/interface';
import { generateUserBudget } from 'src/modules/user/functions';

type ReqBody = User;

export async function userSignUp(
	req: Request<{}, {}, ReqBody, {}>,
	res: Response<{ accessToken: string } | object>
) {
	const { User } = sequelize.models as unknown as Models;
	try {
		const { firstName, lastName, username, email, password } = req.body;

		if (!(email && password && firstName && lastName && username)) {
			return returnError(res, 'All fields are required');
		}
		const user = await User.findOne({ where: { username: username } });
		if (user) return returnError(res, 'Username already exists');

		const budget = generateUserBudget(
			+process.env.MIN_BUDGET,
			+process.env.MAX_BUDGET
		);

		const newUser = await User.create({
			firstName,
			lastName,
			email: email.toLowerCase(),
			username,
			password: md5(password),
			roleId: 1,
			budget,
		});

		const accessToken = generateJWT(newUser);

		return res.status(200).json({
			accessToken: accessToken,
			data: newUser,
		});
	} catch (err) {
		const message = errorMessage(err);
		res.status(400).send(message);
	}
}
