import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage } from 'src/helpers';
import { Prize, ModelPrize, Models } from 'src/interface';

type ReqBody = Prize;

export async function update(
	req: Request<{}, {}, ReqBody, {}>,
	res: Response<ModelPrize | object>
) {
	const { Prize } = sequelize.models as unknown as Models;

	try {
		const prize = await Prize.findByPk(1);

		await prize.update(req.body);

		return res.status(200).json({
			data: prize,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
