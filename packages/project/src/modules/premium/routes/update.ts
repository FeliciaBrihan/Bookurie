import { Request, Response } from 'express';
import { sequelize } from '../../../global';
import { errorMessage } from '../../../helpers/index';
import { Premium, ModelPremium, Models } from '../../../interface';

type ReqBody = Premium;
interface ReqParam {
	id: number;
}
export async function update(
	req: Request<ReqParam, {}, ReqBody, {}>,
	res: Response<ModelPremium | object>
) {
	const { Premium } = sequelize.models as unknown as Models;

	try {
		const premium = await Premium.findByPk(1);

		await premium.update(req.body);

		res.status(200).json({
			data: premium,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
