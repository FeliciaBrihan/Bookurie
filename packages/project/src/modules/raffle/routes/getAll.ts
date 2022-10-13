import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { ModelRaffle, Models } from '../../../interface';

export async function getAll(
	req: Request,
	res: Response<ModelRaffle[] | object>
) {
	const { Raffle } = sequelize.models as unknown as Models;

	try {
		const raffles = await Raffle.findAll({ where: req.query });
		if (raffles.length === 0) return res.sendStatus(204);

		return res.status(200).json({
			results: raffles.length,
			data: raffles,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
