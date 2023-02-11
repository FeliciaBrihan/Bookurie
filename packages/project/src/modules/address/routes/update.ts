import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { Address, ModelAddress, Models } from 'src/interface';

type ReqBody = Address;
interface ReqParam {
	id: number;
}

export async function update(
	req: Request<ReqParam, {}, ReqBody, {}>,
	res: Response<ModelAddress | object>
) {
	const { Address } = sequelize.models as unknown as Models;

	try {
		const { id } = req.params;
		const address = await Address.findByPk(id);
		if (!address) return returnError(res, 'Invalid id');

		await address.update(req.body);

		return res.status(200).json({
			data: address,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
