import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ModelAction, Models } from 'src/interface';

export async function getAll(
	req: Request,
	res: Response<ModelAction[] | object>
) {
	const { Action } = sequelize.models as unknown as Models;

	try {
		const actions = await Action.findAll();
		if (actions.length === 0) return res.sendStatus(204);

		return res.status(200).json({
			results: actions.length,
			data: actions,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
