import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ModelUser, Models } from '../../../interface';

export async function getAllUsers(
	req: Request,
	res: Response<ModelUser[] | object>
) {
	try {
		const { User } = sequelize.models as unknown as Models;

		const users = await User.findAll();
		
		return res.status(200).json({
			results: users.length,
			data: users,
		});
	} catch (err) {
		const message = errorMessage(err);
		return res.status(400).send(message);
	}
}
