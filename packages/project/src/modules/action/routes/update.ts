import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { Action, ModelAction, Models } from 'src/interface';

type ReqBody = Action;
interface ReqParam {
	id: number;
}

export async function update(
	req: Request<ReqParam, {}, ReqBody, {}>,
	res: Response<ModelAction | object>
) {
	const { Action } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;
		const action = await Action.findByPk(id);
		if (!action) return returnError(res, 'Invalid id');

		await action.update(req.body);

		return res.status(200).json({
			data: action,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
