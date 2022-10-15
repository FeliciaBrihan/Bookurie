import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers';
import { Action, ModelAction, Models } from '../../../interface';

type ReqBody = Action;

export async function create(
	req: Request<{}, {}, ReqBody, {}>,
	res: Response<ModelAction | object>
) {
	const { Action } = sequelize.models as unknown as Models;

	try {
		const newAction = await Action.create(req.body);

		return res.status(201).json({
			data: newAction,
		});
	} catch (error) {
		const message = errorMessage(error);
		return res.status(400).send(message);
	}
}
