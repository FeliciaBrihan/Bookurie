import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ExtraRequest, ModelRaffle, Models } from 'src/interface';

export async function getRafflesByUser(
	req: Request & ExtraRequest,
	res: Response<ModelRaffle | object>
) {
	const { Raffle } = sequelize.models as unknown as Models;

	try {
		const { currentUserId: userId } = req;
		const rafflesWon = await Raffle.findAll({ where: { UserId: userId } });
		if (rafflesWon.length === 0) return res.sendStatus(204);

		return res.status(200).json({
			results: rafflesWon.length,
			data: rafflesWon,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
