import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/errorMessage';
import { User, ModelUser, Models } from '../../../interface';

interface ReqParam {
	userId: number;
}

interface ReqBody {
	roleId: number;
}

export async function changeUserRole(
	req: Request<ReqParam, {}, ReqBody, {}>,
	res: Response<ModelUser | object>
) {
	const { User } = sequelize.models as unknown as Models;
	try {
		const id = req.params.userId;
		const roleId = req.body.roleId;

		const user = await User.findByPk(id);
		await user?.update({ roleId: roleId });
		await user?.update({ budget: 0 });

		res.status(200).json({
			data: user,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
