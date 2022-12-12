import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { ModelRaffle, Models } from 'src/interface';

interface ReqParam {
	id: number;
}

export async function deleteRaffle(
	req: Request<ReqParam, {}, {}, {}>,
	res: Response<ModelRaffle | object>
) {
	const { Raffle } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;
		const raffle = await Raffle.findByPk(id);
		if (!raffle) return returnError(res, 'Invalid id');

		await raffle.destroy();

		return res.status(200).json({
			data: null,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
