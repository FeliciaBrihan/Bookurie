import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { Action, ModelAction, Models } from '../../../interface';

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
		if (!action) return res.status(400).send({ error: 'Invalid id' });
		await action.update(req.body);

		res.status(200).json({
			data: action,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
