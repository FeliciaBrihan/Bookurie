import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { ModelAction, Models } from 'src/interface';

interface ReqParam {
	id: number;
}

export async function deleteAction(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelAction | object>
) {
	const { Action } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;
		const action = await Action.findByPk(id);
		if (!action) return returnError(res, 'Invalid id');

		await action.destroy();

		return res.status(200).json({
			data: null,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
