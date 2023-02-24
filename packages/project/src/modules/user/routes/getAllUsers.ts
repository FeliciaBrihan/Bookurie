import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ModelUser, Models } from 'src/interface';

export async function getAllUsers(
	req: Request,
	res: Response<ModelUser[] | object>
) {
	const { User } = sequelize.models as unknown as Models;

	try {
		const users = await User.findAll();
		if (users.length === 0) return res.sendStatus(204);

		return res.status(200).json({
			results: users.length,
			data: users,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
