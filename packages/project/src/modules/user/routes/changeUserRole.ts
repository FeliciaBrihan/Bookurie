import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { ModelUser, Models } from 'src/interface';

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
	const { User, Role } = sequelize.models as unknown as Models;
	try {
		const { userId } = req.params;
		const { roleId } = req.body;

		const user = await User.findByPk(userId);
		const role = await Role.findByPk(roleId);

		if (!user) return returnError(res, 'Invalid user id');
		if (!role) return returnError(res, 'Invalid role id');

		await user.update({ roleId: roleId, budget: 0 });

		return res.status(200).json({
			data: user,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
