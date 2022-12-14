import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { ModelPrize, Models } from 'src/interface';

export async function getAll(
	req: Request,
	res: Response<ModelPrize[] | object>
) {
	const { Prize } = sequelize.models as unknown as Models;

	try {
		const prizes = await Prize.findAll();
		if (prizes.length === 0) return res.sendStatus(204);

		return res.status(200).json({
			results: prizes.length,
			data: prizes,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
