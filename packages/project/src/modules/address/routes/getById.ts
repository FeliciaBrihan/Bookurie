import { Request, Response } from 'express';
import { sequelize } from 'src/global';
import { errorMessage, returnError } from 'src/helpers';
import { ExtraRequest, ModelAddress, Models } from 'src/interface';

interface ReqParam {
	id: number;
}

export async function getById(
	req: Request<ReqParam, {}, {}, {}> & ExtraRequest,
	res: Response<ModelAddress | object>
) {
	const { Address } = sequelize.models as unknown as Models;
	try {
		const { currentUser: user } = req;

		const address = await Address.findByPk(user.addressId);
		if (!address) return returnError(res, 'Invalid id');

		return res.status(200).json({
			data: address,
		});
	} catch (error) {
		const message = errorMessage(error);
		res.status(400).send(message);
	}
}
